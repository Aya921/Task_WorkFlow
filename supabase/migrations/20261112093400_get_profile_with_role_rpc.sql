CREATE OR REPLACE FUNCTION public.get_profile_with_role(p_user_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  onboarding_step text,
  onboarding_completed boolean,
  current_workspace_id uuid,
  current_workspace_role public.workspace_role,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'Not authorized to read this profile';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.email,
    p.onboarding_step,
    p.onboarding_completed,
    p.current_workspace_id,
    wm.role AS current_workspace_role,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  LEFT JOIN public.workspace_members wm
    ON wm.workspace_id = p.current_workspace_id
   AND wm.user_id = p.id
  WHERE p.id = p_user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.get_profile_with_role(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_profile_with_role(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_profile_with_role(uuid) TO authenticated;
