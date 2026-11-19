-- create_project: the client sends only an interval (hours); the database computes
-- the expiry time so client clocks never matter.
-- p_invitation_expires_in_hours is optional (NULL -> 168 hours = 7 days), 1..720 (30 days).
-- Replaces the previous timestamptz-based signature.

DROP FUNCTION IF EXISTS public.create_project(uuid, text, text, text, uuid[], timestamptz);

CREATE OR REPLACE FUNCTION public.create_project(
  p_workspace_id uuid,
  p_name text,
  p_description text DEFAULT NULL,
  p_color text DEFAULT NULL,
  p_member_ids uuid[] DEFAULT '{}',
  p_invitation_expires_in_hours integer DEFAULT NULL
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

REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_project(uuid, text, text, text, uuid[], integer) TO authenticated;
