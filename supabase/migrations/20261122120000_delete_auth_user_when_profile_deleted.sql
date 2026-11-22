-- When a profile row is removed, also remove the matching auth.users account.
-- profiles.id already cascades FROM auth.users; this covers the reverse direction.

CREATE OR REPLACE FUNCTION public.delete_auth_user_on_profile_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  DELETE FROM auth.users
  WHERE id = OLD.id;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS profiles_delete_auth_user ON public.profiles;

CREATE TRIGGER profiles_delete_auth_user
  AFTER DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.delete_auth_user_on_profile_delete();
