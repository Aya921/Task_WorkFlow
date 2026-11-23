-- View the latest workspace invite code, and regenerate only when the owner asks.
-- Also reject expired codes in join_workspace_by_invite.

CREATE OR REPLACE FUNCTION public.get_workspace_invite(p_workspace_id uuid)
RETURNS TABLE (
  invite_code text,
  expires_at timestamptz,
  is_expired boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text;
  v_expires_at timestamptz;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_owner(p_workspace_id) THEN
    RAISE EXCEPTION 'Only workspace owners can view the invite code';
  END IF;

  SELECT wi.invite_code, wi.expires_at
  INTO v_code, v_expires_at
  FROM public.workspace_invites wi
  WHERE wi.workspace_id = p_workspace_id
  ORDER BY wi.created_at DESC
  LIMIT 1;

  IF v_code IS NULL THEN
    RETURN QUERY
    SELECT NULL::text, NULL::timestamptz, true;
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    v_code,
    v_expires_at,
    (v_expires_at IS NOT NULL AND v_expires_at < now());
END;
$$;

REVOKE ALL ON FUNCTION public.get_workspace_invite(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_workspace_invite(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_workspace_invite(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.regenerate_workspace_invite(p_workspace_id uuid)
RETURNS TABLE (
  invite_code text,
  expires_at timestamptz,
  is_expired boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text;
  v_expires_at timestamptz;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_owner(p_workspace_id) THEN
    RAISE EXCEPTION 'Only workspace owners can regenerate the invite code';
  END IF;

  v_code := public.generate_invite_code();
  v_expires_at := now() + interval '7 days';

  INSERT INTO public.workspace_invites (
    workspace_id,
    invite_code,
    expires_at,
    created_by
  )
  VALUES (
    p_workspace_id,
    v_code,
    v_expires_at,
    auth.uid()
  );

  RETURN QUERY
  SELECT v_code, v_expires_at, false;
END;
$$;

REVOKE ALL ON FUNCTION public.regenerate_workspace_invite(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.regenerate_workspace_invite(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.regenerate_workspace_invite(uuid) TO authenticated;

-- Expired invite codes must not join a workspace.
CREATE OR REPLACE FUNCTION public.join_workspace_by_invite(p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_workspace_id uuid;
  v_expires_at timestamptz;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT wi.workspace_id, wi.expires_at
  INTO v_workspace_id, v_expires_at
  FROM public.workspace_invites wi
  WHERE wi.invite_code = p_code
  ORDER BY wi.created_at DESC
  LIMIT 1;

  IF v_workspace_id IS NULL THEN
    RETURN false;
  END IF;

  IF v_expires_at IS NOT NULL AND v_expires_at < now() THEN
    RAISE EXCEPTION 'Invite code has expired';
  END IF;

  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (v_workspace_id, auth.uid(), 'member')
  ON CONFLICT DO NOTHING;

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
