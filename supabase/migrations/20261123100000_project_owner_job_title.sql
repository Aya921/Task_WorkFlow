-- Project creator gets job_title = 'project_owner' instead of the column default.

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

  INSERT INTO public.project_members (project_id, user_id, role, job_title)
  VALUES (v_project.id, auth.uid(), 'admin', 'project_owner');

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

-- Backfill existing project creators that received the column default.
UPDATE public.project_members pm
SET job_title = 'project_owner'
FROM public.projects p
WHERE p.id = pm.project_id
  AND pm.user_id = p.created_by;
