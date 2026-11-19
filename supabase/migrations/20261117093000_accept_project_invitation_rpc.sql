-- Accept a project invitation: add the invitee to project_members (with job title),
-- mark the invitation accepted, and mark its notification as read. All in one transaction.

CREATE OR REPLACE FUNCTION public.accept_project_invitation(
  p_invitation_id uuid,
  p_job_title text
)
RETURNS TABLE (
  member_id uuid,
  project_id uuid,
  user_id uuid,
  job_title text,
  joined_at timestamptz
)
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

  -- Lock the invitation row so it can't be accepted twice concurrently.
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

  INSERT INTO public.project_members AS pm (project_id, user_id, job_title)
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

  RETURN QUERY
  SELECT pm.id, pm.project_id, pm.user_id, pm.job_title, pm.joined_at
  FROM public.project_members pm
  WHERE pm.project_id = v_invitation.project_id
    AND pm.user_id = auth.uid();
END;
$$;

REVOKE ALL ON FUNCTION public.accept_project_invitation(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.accept_project_invitation(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.accept_project_invitation(uuid, text) TO authenticated;
