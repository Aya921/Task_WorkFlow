-- Project invitations + notify invitees. create_project can also invite members.

CREATE TYPE public.project_invitation_status AS ENUM (
  'pending',
  'accepted',
  'declined',
  'expired',
  'cancelled'
);

CREATE TABLE public.project_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  inviter_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invitee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status public.project_invitation_status NOT NULL DEFAULT 'pending',
  job_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  responded_at timestamptz,
  expires_at timestamptz,
  CONSTRAINT project_invitations_not_self CHECK (inviter_id <> invitee_id),
  CONSTRAINT project_invitations_job_title_when_accepted CHECK (
    status <> 'accepted'
    OR (job_title IS NOT NULL AND char_length(TRIM(BOTH FROM job_title)) > 0)
  ),
  CONSTRAINT project_invitations_responded_at_check CHECK (
    (status = 'pending' AND responded_at IS NULL)
    OR (status IN ('accepted', 'declined') AND responded_at IS NOT NULL)
    OR (status IN ('expired', 'cancelled'))
  )
);

-- One active pending invite per invitee per project.
CREATE UNIQUE INDEX project_invitations_pending_unique_idx
  ON public.project_invitations (project_id, invitee_id)
  WHERE status = 'pending';

CREATE INDEX project_invitations_invitee_id_status_idx
  ON public.project_invitations (invitee_id, status, created_at DESC);

CREATE INDEX project_invitations_project_id_idx
  ON public.project_invitations (project_id);

-- Invitee must belong to the project's workspace.
CREATE OR REPLACE FUNCTION public.enforce_project_invitation_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.user_belongs_to_project_workspace(NEW.project_id, NEW.invitee_id) THEN
    RAISE EXCEPTION 'Invitee must belong to the project workspace';
  END IF;

  IF NOT public.user_belongs_to_project_workspace(NEW.project_id, NEW.inviter_id) THEN
    RAISE EXCEPTION 'Inviter must belong to the project workspace';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER project_invitations_enforce_workspace
  BEFORE INSERT OR UPDATE OF project_id, invitee_id, inviter_id
  ON public.project_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_project_invitation_workspace();

-- Trusted insert into notifications (clients cannot INSERT notifications).
CREATE OR REPLACE FUNCTION public.notify_on_project_invitation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_name text;
  v_workspace_id uuid;
  v_inviter_name text;
BEGIN
  SELECT p.name, p.workspace_id
  INTO v_project_name, v_workspace_id
  FROM public.projects p
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
      'inviter_id', NEW.inviter_id
    )
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER project_invitations_notify_invitee
  AFTER INSERT ON public.project_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_project_invitation();

ALTER TABLE public.project_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own project invitations"
  ON public.project_invitations
  FOR SELECT
  TO authenticated
  USING (
    invitee_id = auth.uid()
    OR inviter_id = auth.uid()
    OR public.can_access_project(project_id)
  );

CREATE POLICY "Users can update own received project invitations"
  ON public.project_invitations
  FOR UPDATE
  TO authenticated
  USING (invitee_id = auth.uid())
  WITH CHECK (invitee_id = auth.uid());

-- Inserts go through SECURITY DEFINER RPCs (e.g. create_project).
REVOKE ALL ON TABLE public.project_invitations FROM PUBLIC;
REVOKE ALL ON TABLE public.project_invitations FROM anon;
REVOKE ALL ON TABLE public.project_invitations FROM authenticated;

GRANT SELECT, UPDATE ON TABLE public.project_invitations TO authenticated;
GRANT ALL ON TABLE public.project_invitations TO service_role;

GRANT USAGE ON TYPE public.project_invitation_status TO authenticated;
GRANT USAGE ON TYPE public.project_invitation_status TO service_role;

-- Extend create_project to invite members via project_invitations.
DROP FUNCTION IF EXISTS public.create_project(uuid, text, text, text);

CREATE OR REPLACE FUNCTION public.create_project(
  p_workspace_id uuid,
  p_name text,
  p_description text DEFAULT NULL,
  p_color text DEFAULT NULL,
  p_member_ids uuid[] DEFAULT '{}'
)
RETURNS TABLE (
  id uuid,
  workspace_id uuid,
  name text,
  description text,
  color text,
  status text,
  created_by uuid,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project public.projects%ROWTYPE;
  v_member_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_member(p_workspace_id) THEN
    RAISE EXCEPTION 'Not a workspace member';
  END IF;

  IF p_name IS NULL OR char_length(TRIM(BOTH FROM p_name)) = 0 THEN
    RAISE EXCEPTION 'Project name is required';
  END IF;

  INSERT INTO public.projects (
    workspace_id,
    name,
    description,
    color,
    created_by
  )
  VALUES (
    p_workspace_id,
    TRIM(BOTH FROM p_name),
    NULLIF(TRIM(BOTH FROM COALESCE(p_description, '')), ''),
    NULLIF(TRIM(BOTH FROM COALESCE(p_color, '')), ''),
    auth.uid()
  )
  RETURNING * INTO v_project;

  INSERT INTO public.project_members (project_id, user_id, role)
  VALUES (v_project.id, auth.uid(), 'admin');

  IF p_member_ids IS NOT NULL THEN
    FOREACH v_member_id IN ARRAY p_member_ids
    LOOP
      IF v_member_id IS NULL OR v_member_id = auth.uid() THEN
        CONTINUE;
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM public.workspace_members wm
        WHERE wm.workspace_id = p_workspace_id
          AND wm.user_id = v_member_id
      ) THEN
        RAISE EXCEPTION 'Member % is not in the workspace', v_member_id;
      END IF;

      INSERT INTO public.project_invitations (
        project_id,
        inviter_id,
        invitee_id,
        status
      )
      VALUES (
        v_project.id,
        auth.uid(),
        v_member_id,
        'pending'
      );
    END LOOP;
  END IF;

  RETURN QUERY
  SELECT
    v_project.id,
    v_project.workspace_id,
    v_project.name,
    v_project.description,
    v_project.color,
    v_project.status,
    v_project.created_by,
    v_project.created_at,
    v_project.updated_at;
END;
$$;

REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_project(uuid, text, text, text, uuid[]) TO authenticated;
