-- List workspace members for project creation invites.
-- SECURITY DEFINER: workspace_members has RLS with no select policies;
-- authorization is enforced explicitly via is_workspace_member().
CREATE OR REPLACE FUNCTION public.get_workspace_members(p_workspace_id uuid)
RETURNS TABLE (
  user_id uuid,
  full_name text,
  email text,
  role text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_member(p_workspace_id) THEN
    RAISE EXCEPTION 'Not a workspace member';
  END IF;

  RETURN QUERY
  SELECT
    wm.user_id,
    p.full_name,
    p.email,
    wm.role::text
  FROM public.workspace_members wm
  INNER JOIN public.profiles p ON p.id = wm.user_id
  WHERE wm.workspace_id = p_workspace_id
  ORDER BY lower(p.full_name) ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_workspace_members(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_workspace_members(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_workspace_members(uuid) TO authenticated;
