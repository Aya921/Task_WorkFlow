-- 1) Projects: only workspace owners can create/update/delete.
-- 2) Tasks: only project members can view/create/update/delete.

CREATE OR REPLACE FUNCTION public.is_workspace_owner(p_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members wm
    WHERE wm.workspace_id = p_workspace_id
      AND wm.user_id = auth.uid()
      AND wm.role = 'owner'::public.workspace_role
  );
$$;

REVOKE ALL ON FUNCTION public.is_workspace_owner(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_workspace_owner(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_workspace_owner(uuid) TO authenticated;

-- Projects policies: keep member SELECT, owner-only mutations.
DROP POLICY IF EXISTS "Workspace members can create projects" ON public.projects;
DROP POLICY IF EXISTS "Workspace members can update projects" ON public.projects;
DROP POLICY IF EXISTS "Workspace members can delete projects" ON public.projects;

CREATE POLICY "Workspace owners can create projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND public.is_workspace_owner(workspace_id)
  );

CREATE POLICY "Workspace owners can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (public.is_workspace_owner(workspace_id))
  WITH CHECK (public.is_workspace_owner(workspace_id));

CREATE POLICY "Workspace owners can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (public.is_workspace_owner(workspace_id));

-- create_project RPC must enforce owner too (SECURITY DEFINER bypasses RLS).
CREATE OR REPLACE FUNCTION public.create_project(
  p_workspace_id uuid,
  p_name text,
  p_description text DEFAULT NULL,
  p_color text DEFAULT NULL,
  p_member_ids uuid[] DEFAULT '{}'
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
        status
      )
      VALUES (
        v_project.id,
        auth.uid(),
        v_member_id,
        'pending'
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

REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) TO authenticated;

-- Tasks: require project membership (not just workspace membership).
DROP POLICY IF EXISTS "Workspace members can view tasks" ON public.tasks;
DROP POLICY IF EXISTS "Workspace members can create tasks" ON public.tasks;
DROP POLICY IF EXISTS "Workspace members can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Workspace members can delete tasks" ON public.tasks;

CREATE POLICY "Project members can view tasks"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (public.is_project_member(project_id, auth.uid()));

CREATE POLICY "Project members can create tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND public.is_project_member(project_id, auth.uid())
    AND (
      assigned_to IS NULL
      OR public.is_project_member(project_id, assigned_to)
    )
  );

CREATE POLICY "Project members can update tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (public.is_project_member(project_id, auth.uid()))
  WITH CHECK (
    public.is_project_member(project_id, auth.uid())
    AND (
      assigned_to IS NULL
      OR public.is_project_member(project_id, assigned_to)
    )
  );

CREATE POLICY "Project members can delete tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (public.is_project_member(project_id, auth.uid()));
