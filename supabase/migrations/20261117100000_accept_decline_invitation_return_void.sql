-- accept_project_invitation now returns void (success = no error),
-- and decline_project_invitation is added with the same style.

DROP FUNCTION IF EXISTS public.accept_project_invitation(uuid, text);

CREATE OR REPLACE FUNCTION public.accept_project_invitation(
  p_invitation_id uuid,
  p_job_title text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation public.project_invitations%ROWTYPE;
  v_job_title text := NULLIF(TRIM(BOTH FROM COALESCE(p_job_title, '')), '');
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF v_job_title IS NULL THEN
    RAISE EXCEPTION 'Job title is required';
  END IF;

  -- Lock the invitation row so it can't be handled twice concurrently.
  SELECT *
  INTO v_invitation
  FROM public.project_invitations pi
  WHERE pi.id = p_invitation_id
  FOR UPDATE;

  IF NOT FOUND OR v_invitation.invitee_id <> auth.uid() THEN
    RAISE EXCEPTION 'Invitation not found';
  END IF;

  IF v_invitation.status <> 'pending' THEN
    RAISE EXCEPTION 'Invitation is no longer pending';
  END IF;

  IF v_invitation.expires_at IS NOT NULL AND v_invitation.expires_at < now() THEN
    RAISE EXCEPTION 'Invitation has expired';
  END IF;

  INSERT INTO public.project_members (project_id, user_id, job_title)
  VALUES (v_invitation.project_id, auth.uid(), v_job_title)
  ON CONFLICT ON CONSTRAINT project_members_project_user_unique
  DO UPDATE SET job_title = EXCLUDED.job_title;

  UPDATE public.project_invitations
  SET status = 'accepted',
      responded_at = now()
  WHERE id = v_invitation.id;

  UPDATE public.notifications n
  SET is_read = true
  WHERE n.user_id = auth.uid()
    AND n.type = 'project_invitation'
    AND n.is_read = false
    AND (n.data ->> 'invitation_id') = v_invitation.id::text;
END;
$$;

REVOKE ALL ON FUNCTION public.accept_project_invitation(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.accept_project_invitation(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.accept_project_invitation(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.decline_project_invitation(
  p_invitation_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation public.project_invitations%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT *
  INTO v_invitation
  FROM public.project_invitations pi
  WHERE pi.id = p_invitation_id
  FOR UPDATE;

  IF NOT FOUND OR v_invitation.invitee_id <> auth.uid() THEN
    RAISE EXCEPTION 'Invitation not found';
  END IF;

  IF v_invitation.status <> 'pending' THEN
    RAISE EXCEPTION 'Invitation is no longer pending';
  END IF;

  UPDATE public.project_invitations
  SET status = 'declined',
      responded_at = now()
  WHERE id = v_invitation.id;

  UPDATE public.notifications n
  SET is_read = true
  WHERE n.user_id = auth.uid()
    AND n.type = 'project_invitation'
    AND n.is_read = false
    AND (n.data ->> 'invitation_id') = v_invitation.id::text;
END;
$$;

REVOKE ALL ON FUNCTION public.decline_project_invitation(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decline_project_invitation(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.decline_project_invitation(uuid) TO authenticated;
