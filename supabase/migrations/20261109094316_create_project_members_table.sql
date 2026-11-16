-- Helper: can the current user access a project via its workspace membership?
-- SECURITY DEFINER avoids RLS recursion / empty reads on workspace_members.
CREATE OR REPLACE FUNCTION public.can_access_project(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.workspace_members wm
      ON wm.workspace_id = p.workspace_id
    WHERE p.id = p_project_id
      AND wm.user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.can_access_project(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_access_project(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_access_project(uuid) TO authenticated;

-- Helper: is the given user a member of the project's workspace?
CREATE OR REPLACE FUNCTION public.user_belongs_to_project_workspace(
  p_project_id uuid,
  p_user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.workspace_members wm
      ON wm.workspace_id = p.workspace_id
    WHERE p.id = p_project_id
      AND wm.user_id = p_user_id
  );
$$;

REVOKE ALL ON FUNCTION public.user_belongs_to_project_workspace(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.user_belongs_to_project_workspace(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.user_belongs_to_project_workspace(uuid, uuid) TO authenticated;

-- Enforce workspace membership even when RLS is bypassed.
CREATE OR REPLACE FUNCTION public.enforce_project_member_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.user_belongs_to_project_workspace(NEW.project_id, NEW.user_id) THEN
    RAISE EXCEPTION 'User must belong to the project workspace';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TABLE public.project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  joined_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT project_members_project_user_unique UNIQUE (project_id, user_id),
  CONSTRAINT project_members_role_check CHECK (role IN ('admin'))
);

CREATE INDEX project_members_project_id_idx ON public.project_members (project_id);
CREATE INDEX project_members_user_id_idx ON public.project_members (user_id);

CREATE TRIGGER project_members_enforce_workspace
  BEFORE INSERT OR UPDATE OF project_id, user_id
  ON public.project_members
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_project_member_workspace();

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view project members"
  ON public.project_members
  FOR SELECT
  TO authenticated
  USING (public.can_access_project(project_id));

CREATE POLICY "Workspace members can add project members"
  ON public.project_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.can_access_project(project_id)
    AND public.user_belongs_to_project_workspace(project_id, user_id)
  );

CREATE POLICY "Workspace members can update project members"
  ON public.project_members
  FOR UPDATE
  TO authenticated
  USING (public.can_access_project(project_id))
  WITH CHECK (
    public.can_access_project(project_id)
    AND public.user_belongs_to_project_workspace(project_id, user_id)
  );

CREATE POLICY "Workspace members can remove project members"
  ON public.project_members
  FOR DELETE
  TO authenticated
  USING (public.can_access_project(project_id));
