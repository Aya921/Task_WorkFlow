-- Active workspace preference on the user profile (nullable at signup).
ALTER TABLE public.profiles
  ADD COLUMN current_workspace_id uuid NULL
  REFERENCES public.workspaces(id) ON DELETE SET NULL;

CREATE INDEX profiles_current_workspace_id_idx
  ON public.profiles (current_workspace_id);

-- Backfill from existing membership when possible.
UPDATE public.profiles p
SET current_workspace_id = wm.workspace_id
FROM public.workspace_members wm
WHERE wm.user_id = p.id
  AND p.current_workspace_id IS NULL;

-- Set current workspace when creating a workspace.
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

  UPDATE public.profiles
  SET current_workspace_id = v_workspace_id
  WHERE id = p_created_by;

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

-- Set current workspace when joining by invite.
CREATE OR REPLACE FUNCTION public.join_workspace_by_invite(p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_workspace_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT wi.workspace_id
  INTO v_workspace_id
  FROM public.workspace_invites wi
  WHERE wi.invite_code = p_code
  LIMIT 1;

  IF v_workspace_id IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (v_workspace_id, auth.uid(), 'member');

  UPDATE public.profiles
  SET
    onboarding_step = 'github',
    current_workspace_id = v_workspace_id
  WHERE id = auth.uid();

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.join_workspace_by_invite(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.join_workspace_by_invite(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.join_workspace_by_invite(text) TO authenticated;
