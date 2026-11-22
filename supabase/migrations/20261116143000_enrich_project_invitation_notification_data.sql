-- Store display names on project invitation notifications for modal UI.

CREATE OR REPLACE FUNCTION public.notify_on_project_invitation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_name text;
  v_workspace_id uuid;
  v_workspace_name text;
  v_inviter_name text;
BEGIN
  SELECT p.name, p.workspace_id, w.name
  INTO v_project_name, v_workspace_id, v_workspace_name
  FROM public.projects p
  JOIN public.workspaces w ON w.id = p.workspace_id
  WHERE p.id = NEW.project_id;

  SELECT pr.full_name
  INTO v_inviter_name
  FROM public.profiles pr
  WHERE pr.id = NEW.inviter_id;

  INSERT INTO public.notifications (
    user_id,
    type,
    title,
    message,
    data
  )
  VALUES (
    NEW.invitee_id,
    'project_invitation',
    'Project invitation',
    COALESCE(v_inviter_name, 'Someone')
      || ' invited you to join '
      || COALESCE(v_project_name, 'a project'),
    jsonb_build_object(
      'invitation_id', NEW.id,
      'project_id', NEW.project_id,
      'workspace_id', v_workspace_id,
      'inviter_id', NEW.inviter_id,
      'inviter_name', COALESCE(v_inviter_name, 'Someone'),
      'project_name', COALESCE(v_project_name, 'a project'),
      'workspace_name', COALESCE(v_workspace_name, 'Workspace')
    )
  );

  RETURN NEW;
END;
$$;

-- Backfill display fields for existing invitation notifications.
-- The read-only trigger blocks data updates, so disable it only for this backfill.
ALTER TABLE public.notifications DISABLE TRIGGER notifications_enforce_read_only_update;

UPDATE public.notifications AS n
SET data = COALESCE(n.data, '{}'::jsonb) || jsonb_build_object(
  'inviter_name', COALESCE(pr.full_name, 'Someone'),
  'project_name', COALESCE(p.name, 'a project'),
  'workspace_name', COALESCE(w.name, 'Workspace')
)
FROM public.project_invitations AS pi
JOIN public.projects AS p ON p.id = pi.project_id
JOIN public.workspaces AS w ON w.id = p.workspace_id
JOIN public.profiles AS pr ON pr.id = pi.inviter_id
WHERE n.type = 'project_invitation'
  AND (n.data ->> 'invitation_id') IS NOT NULL
  AND (n.data ->> 'invitation_id')::uuid = pi.id;

ALTER TABLE public.notifications ENABLE TRIGGER notifications_enforce_read_only_update;
