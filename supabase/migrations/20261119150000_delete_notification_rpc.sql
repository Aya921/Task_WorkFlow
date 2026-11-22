-- delete_notification: lets a user delete one of their own notifications.
-- Clients have no DELETE grant on notifications, so this SECURITY DEFINER RPC is the only way.
-- Deleting a project-invitation notification whose invitation is still pending
-- declines that invitation first, in the same transaction.

CREATE OR REPLACE FUNCTION public.delete_notification(
  p_notification_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_notification public.notifications%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT *
  INTO v_notification
  FROM public.notifications n
  WHERE n.id = p_notification_id
    AND n.user_id = auth.uid()
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Notification not found';
  END IF;

  IF v_notification.type::text = 'project_invitation'
     AND (v_notification.data ->> 'invitation_id') IS NOT NULL THEN
    UPDATE public.project_invitations pi
    SET status = 'declined',
        responded_at = now()
    WHERE pi.id::text = (v_notification.data ->> 'invitation_id')
      AND pi.invitee_id = auth.uid()
      AND pi.status = 'pending';
  END IF;

  DELETE FROM public.notifications n
  WHERE n.id = v_notification.id;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_notification(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_notification(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.delete_notification(uuid) TO authenticated;
