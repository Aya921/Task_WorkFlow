-- Defer setting profiles.current_workspace_id until the user leaves the
-- workspace onboarding step (Continue on the invite-code screen).
-- Updating the profile inside create_workspace was triggering realtime refresh
-- and unmounting WorkspaceCodeView before it could stay visible.

CREATE OR REPLACE FUNCTION public.create_workspace(p_name text, p_created_by uuid)
RETURNS TABLE(workspace_id uuid, workspace_name text, invite_code text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_workspace_id uuid;
  v_invite_code text;
  v_expires_at timestamptz;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_created_by THEN
    RAISE EXCEPTION 'Not authorized to create workspace for this user';
  END IF;

  INSERT INTO public.workspaces (name, created_by)
  VALUES (p_name, p_created_by)
  RETURNING id INTO v_workspace_id;

  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (v_workspace_id, p_created_by, 'owner');

  v_invite_code := public.generate_invite_code();
  v_expires_at := now() + interval '1 hour';

  INSERT INTO public.workspace_invites (
    workspace_id,
    invite_code,
    expires_at,
    created_by
  )
  VALUES (
    v_workspace_id,
    v_invite_code,
    v_expires_at,
    p_created_by
  );

  RETURN QUERY
  SELECT
    v_workspace_id,
    p_name,
    v_invite_code,
    v_expires_at;
END;
$$;

REVOKE ALL ON FUNCTION public.create_workspace(text, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_workspace(text, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_workspace(text, uuid) TO authenticated;
