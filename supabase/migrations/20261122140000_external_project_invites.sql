-- External project invites: invitees do not need workspace membership.
-- Access is via project_members only (shared project row, not workspace_members).

-- 1) Project access = workspace member OR project member
CREATE OR REPLACE FUNCTION public.can_access_project(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.is_project_member(p_project_id, auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.projects p
      JOIN public.workspace_members wm
        ON wm.workspace_id = p.workspace_id
      WHERE p.id = p_project_id
        AND wm.user_id = auth.uid()
    );
$$;

-- 2) Allow project_members rows for users outside the workspace
DROP TRIGGER IF EXISTS project_members_enforce_workspace ON public.project_members;
DROP FUNCTION IF EXISTS public.enforce_project_member_workspace();

-- 3) Invitations: inviter must be in workspace; invitee may be external
CREATE OR REPLACE FUNCTION public.enforce_project_invitation_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.user_belongs_to_project_workspace(NEW.project_id, NEW.inviter_id) THEN
    RAISE EXCEPTION 'Inviter must belong to the project workspace';
  END IF;

  RETURN NEW;
END;
$$;

-- 4) Projects SELECT: workspace members + direct project members
DROP POLICY IF EXISTS "Workspace members can view projects" ON public.projects;
CREATE POLICY "Members can view accessible projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (
    public.is_workspace_member(workspace_id)
    OR public.is_project_member(id, auth.uid())
  );

-- 5) Dashboard: include projects the user is a direct member of (any workspace)
CREATE OR REPLACE FUNCTION public.get_workspace_dashboard(p_workspace_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_member(p_workspace_id) THEN
    RAISE EXCEPTION 'Not authorized to access this workspace';
  END IF;

  WITH workspace_projects AS (
    SELECT
      p.id,
      p.name,
      p.description,
      p.color,
      p.status,
      p.created_at
    FROM public.projects p
    WHERE (
      p.workspace_id = p_workspace_id
      AND public.is_workspace_member(p_workspace_id)
    )
    OR public.is_project_member(p.id, auth.uid())
  ),
  task_stats AS (
    SELECT
      t.project_id,
      count(*)::integer AS total_tasks,
      count(*) FILTER (WHERE t.status = 'done')::integer AS completed_tasks,
      count(*) FILTER (WHERE t.status = 'in_progress')::integer AS in_progress_tasks,
      count(*) FILTER (
        WHERE t.due_date IS NOT NULL
          AND t.due_date < now()
          AND t.status <> 'done'
      )::integer AS overdue_tasks,
      max(t.updated_at) AS last_task_updated_at
    FROM public.tasks t
    INNER JOIN workspace_projects wp ON wp.id = t.project_id
    GROUP BY t.project_id
  ),
  metrics AS (
    SELECT
      coalesce(sum(ts.total_tasks), 0)::integer AS total_tasks,
      coalesce(sum(ts.in_progress_tasks), 0)::integer AS in_progress,
      coalesce(sum(ts.completed_tasks), 0)::integer AS completed,
      coalesce(sum(ts.overdue_tasks), 0)::integer AS overdue
    FROM task_stats ts
  ),
  project_members_agg AS (
    SELECT
      pm.project_id,
      count(*)::integer AS members_count,
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', pr.id,
            'fullName', pr.full_name
          )
          ORDER BY pr.full_name, pr.id
        ),
        '[]'::jsonb
      ) AS members
    FROM public.project_members pm
    INNER JOIN workspace_projects wp ON wp.id = pm.project_id
    INNER JOIN public.profiles pr ON pr.id = pm.user_id
    GROUP BY pm.project_id
  ),
  projects_json AS (
    SELECT
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', wp.id,
            'name', wp.name,
            'description', wp.description,
            'color', wp.color,
            'status', wp.status,
            'progress', CASE
              WHEN coalesce(ts.total_tasks, 0) = 0 THEN 0
              ELSE round(
                (coalesce(ts.completed_tasks, 0)::numeric
                  / ts.total_tasks::numeric) * 100
              )::integer
            END,
            'totalTasks', coalesce(ts.total_tasks, 0),
            'completedTasks', coalesce(ts.completed_tasks, 0),
            'membersCount', coalesce(pma.members_count, 0),
            'members', coalesce(pma.members, '[]'::jsonb),
            'lastTaskUpdatedAt', ts.last_task_updated_at
          )
          ORDER BY wp.created_at DESC, wp.name, wp.id
        ),
        '[]'::jsonb
      ) AS projects
    FROM workspace_projects wp
    LEFT JOIN task_stats ts ON ts.project_id = wp.id
    LEFT JOIN project_members_agg pma ON pma.project_id = wp.id
  ),
  recent_tasks AS (
    SELECT
      coalesce(
        jsonb_agg(ranked.task_row ORDER BY ranked.ord),
        '[]'::jsonb
      ) AS recent
    FROM (
      SELECT
        jsonb_build_object(
          'id', t.id,
          'title', t.title,
          'status', t.status,
          'priority', t.priority,
          'dueDate', t.due_date,
          'updatedAt', t.updated_at,
          'projectId', t.project_id,
          'projectName', p.name,
          'assignedTo', t.assigned_to,
          'assignee', CASE
            WHEN pr.id IS NULL THEN NULL
            ELSE jsonb_build_object(
              'id', pr.id,
              'fullName', pr.full_name
            )
          END
        ) AS task_row,
        row_number() OVER (ORDER BY t.updated_at DESC, t.id DESC) AS ord
      FROM public.tasks t
      INNER JOIN workspace_projects wp ON wp.id = t.project_id
      INNER JOIN public.projects p ON p.id = t.project_id
      LEFT JOIN public.profiles pr ON pr.id = t.assigned_to
      ORDER BY t.updated_at DESC, t.id DESC
      LIMIT 5
    ) ranked
  ),
  workspace_members_json AS (
    SELECT
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'userId', wm.user_id,
            'fullName', pr.full_name,
            'email', pr.email,
            'role', wm.role::text
          )
          ORDER BY lower(pr.full_name), wm.user_id
        ),
        '[]'::jsonb
      ) AS members
    FROM public.workspace_members wm
    INNER JOIN public.profiles pr ON pr.id = wm.user_id
    WHERE wm.workspace_id = p_workspace_id
  )
  SELECT jsonb_build_object(
    'metrics', jsonb_build_object(
      'totalTasks', m.total_tasks,
      'inProgress', m.in_progress,
      'completed', m.completed,
      'overdue', m.overdue
    ),
    'projects', pj.projects,
    'recentTasks', rt.recent,
    'members', wmj.members
  )
  INTO v_result
  FROM metrics m
  CROSS JOIN projects_json pj
  CROSS JOIN recent_tasks rt
  CROSS JOIN workspace_members_json wmj;

  RETURN coalesce(
    v_result,
    jsonb_build_object(
      'metrics', jsonb_build_object(
        'totalTasks', 0,
        'inProgress', 0,
        'completed', 0,
        'overdue', 0
      ),
      'projects', '[]'::jsonb,
      'recentTasks', '[]'::jsonb,
      'members', '[]'::jsonb
    )
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_workspace_dashboard(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_workspace_dashboard(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_workspace_dashboard(uuid) TO authenticated;

-- 6) create_project: add p_invite_emails for external accounts
DROP FUNCTION IF EXISTS public.create_project(uuid, text, text, text, uuid[], integer);

CREATE OR REPLACE FUNCTION public.create_project(
  p_workspace_id uuid,
  p_name text,
  p_description text DEFAULT NULL,
  p_color text DEFAULT NULL,
  p_member_ids uuid[] DEFAULT '{}',
  p_invitation_expires_in_hours integer DEFAULT NULL,
  p_invite_emails text[] DEFAULT '{}'
)
RETURNS TABLE (
  id uuid,
  workspace_id uuid,
  name text,
  description text,
  color text,
  status text,
  created_by uuid,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project public.projects%ROWTYPE;
  v_member_id uuid;
  v_email text;
  v_invitee_id uuid;
  v_expires_at timestamptz;
  v_hours integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_owner(p_workspace_id) THEN
    RAISE EXCEPTION 'Only workspace owners can create projects';
  END IF;

  IF p_name IS NULL OR char_length(TRIM(BOTH FROM p_name)) = 0 THEN
    RAISE EXCEPTION 'Project name is required';
  END IF;

  v_hours := COALESCE(p_invitation_expires_in_hours, 168);

  IF v_hours < 1 OR v_hours > 720 THEN
    RAISE EXCEPTION 'Invitation expiry must be between 1 and 720 hours';
  END IF;

  v_expires_at := now() + make_interval(hours => v_hours);

  INSERT INTO public.projects (
    workspace_id,
    name,
    description,
    color,
    created_by
  )
  VALUES (
    p_workspace_id,
    TRIM(BOTH FROM p_name),
    NULLIF(TRIM(BOTH FROM COALESCE(p_description, '')), ''),
    NULLIF(TRIM(BOTH FROM COALESCE(p_color, '')), ''),
    auth.uid()
  )
  RETURNING * INTO v_project;

  INSERT INTO public.project_members (project_id, user_id, role)
  VALUES (v_project.id, auth.uid(), 'admin');

  IF p_member_ids IS NOT NULL THEN
    FOREACH v_member_id IN ARRAY p_member_ids
    LOOP
      IF v_member_id IS NULL OR v_member_id = auth.uid() THEN
        CONTINUE;
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM public.workspace_members wm
        WHERE wm.workspace_id = p_workspace_id
          AND wm.user_id = v_member_id
      ) THEN
        RAISE EXCEPTION 'Member % is not in the workspace', v_member_id;
      END IF;

      INSERT INTO public.project_invitations (
        project_id,
        inviter_id,
        invitee_id,
        status,
        expires_at
      )
      VALUES (
        v_project.id,
        auth.uid(),
        v_member_id,
        'pending',
        v_expires_at
      );
    END LOOP;
  END IF;

  IF p_invite_emails IS NOT NULL THEN
    FOREACH v_email IN ARRAY p_invite_emails
    LOOP
      v_email := lower(TRIM(BOTH FROM COALESCE(v_email, '')));
      IF v_email = '' THEN
        CONTINUE;
      END IF;

      SELECT pr.id
      INTO v_invitee_id
      FROM public.profiles pr
      WHERE lower(pr.email) = v_email
      LIMIT 1;

      IF v_invitee_id IS NULL THEN
        RAISE EXCEPTION 'No account found for email %', v_email;
      END IF;

      IF v_invitee_id = auth.uid() THEN
        CONTINUE;
      END IF;

      -- Skip if already covered by workspace member invite list
      IF p_member_ids IS NOT NULL AND v_invitee_id = ANY (p_member_ids) THEN
        CONTINUE;
      END IF;

      IF EXISTS (
        SELECT 1
        FROM public.project_members pm
        WHERE pm.project_id = v_project.id
          AND pm.user_id = v_invitee_id
      ) THEN
        CONTINUE;
      END IF;

      INSERT INTO public.project_invitations (
        project_id,
        inviter_id,
        invitee_id,
        status,
        expires_at
      )
      VALUES (
        v_project.id,
        auth.uid(),
        v_invitee_id,
        'pending',
        v_expires_at
      );
    END LOOP;
  END IF;

  RETURN QUERY
  SELECT
    v_project.id,
    v_project.workspace_id,
    v_project.name,
    v_project.description,
    v_project.color,
    v_project.status,
    v_project.created_by,
    v_project.created_at,
    v_project.updated_at;
END;
$$;

REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer, text[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer, text[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer, text[]) TO authenticated;

-- 7) Invite an existing account to a project by email (project-only membership)
CREATE OR REPLACE FUNCTION public.invite_to_project_by_email(
  p_project_id uuid,
  p_email text,
  p_invitation_expires_in_hours integer DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_workspace_id uuid;
  v_invitee_id uuid;
  v_email text;
  v_hours integer;
  v_expires_at timestamptz;
  v_invitation_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT p.workspace_id
  INTO v_workspace_id
  FROM public.projects p
  WHERE p.id = p_project_id;

  IF v_workspace_id IS NULL THEN
    RAISE EXCEPTION 'Project not found';
  END IF;

  IF NOT public.is_workspace_owner(v_workspace_id) THEN
    RAISE EXCEPTION 'Only workspace owners can invite to projects';
  END IF;

  v_email := lower(TRIM(BOTH FROM COALESCE(p_email, '')));
  IF v_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;

  SELECT pr.id
  INTO v_invitee_id
  FROM public.profiles pr
  WHERE lower(pr.email) = v_email
  LIMIT 1;

  IF v_invitee_id IS NULL THEN
    RAISE EXCEPTION 'No account found for this email';
  END IF;

  IF v_invitee_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot invite yourself';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.project_members pm
    WHERE pm.project_id = p_project_id
      AND pm.user_id = v_invitee_id
  ) THEN
    RAISE EXCEPTION 'User is already a project member';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.project_invitations pi
    WHERE pi.project_id = p_project_id
      AND pi.invitee_id = v_invitee_id
      AND pi.status = 'pending'
      AND (pi.expires_at IS NULL OR pi.expires_at > now())
  ) THEN
    RAISE EXCEPTION 'A pending invitation already exists for this email';
  END IF;

  v_hours := COALESCE(p_invitation_expires_in_hours, 168);
  IF v_hours < 1 OR v_hours > 720 THEN
    RAISE EXCEPTION 'Invitation expiry must be between 1 and 720 hours';
  END IF;

  v_expires_at := now() + make_interval(hours => v_hours);

  INSERT INTO public.project_invitations (
    project_id,
    inviter_id,
    invitee_id,
    status,
    expires_at
  )
  VALUES (
    p_project_id,
    auth.uid(),
    v_invitee_id,
    'pending',
    v_expires_at
  )
  RETURNING id INTO v_invitation_id;

  RETURN v_invitation_id;
END;
$$;

REVOKE ALL ON FUNCTION public.invite_to_project_by_email(uuid, text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.invite_to_project_by_email(uuid, text, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.invite_to_project_by_email(uuid, text, integer) TO authenticated;
