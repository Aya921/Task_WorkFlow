-- Helper: is the given user a member of the project via project_members?
CREATE OR REPLACE FUNCTION public.is_project_member(
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
    FROM public.project_members pm
    WHERE pm.project_id = p_project_id
      AND pm.user_id = p_user_id
  );
$$;

REVOKE ALL ON FUNCTION public.is_project_member(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_project_member(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_project_member(uuid, uuid) TO authenticated;

-- Enforce creator workspace membership and assignee project membership.
CREATE OR REPLACE FUNCTION public.enforce_task_assignment_rules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.user_belongs_to_project_workspace(NEW.project_id, NEW.created_by) THEN
    RAISE EXCEPTION 'Task creator must belong to the project workspace';
  END IF;

  IF NEW.assigned_to IS NOT NULL
     AND NOT public.is_project_member(NEW.project_id, NEW.assigned_to) THEN
    RAISE EXCEPTION 'Assignee must be a member of the project';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo',
  priority text NOT NULL DEFAULT 'medium',
  assigned_to uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  due_date timestamptz,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tasks_title_not_empty CHECK (char_length(TRIM(BOTH FROM title)) > 0),
  CONSTRAINT tasks_status_check CHECK (
    status IN ('todo', 'in_progress', 'in_review', 'done')
  ),
  CONSTRAINT tasks_priority_check CHECK (
    priority IN ('low', 'medium', 'high', 'urgent')
  )
);

CREATE INDEX tasks_project_id_idx ON public.tasks (project_id);
CREATE INDEX tasks_assigned_to_idx ON public.tasks (assigned_to);
CREATE INDEX tasks_status_idx ON public.tasks (status);
CREATE INDEX tasks_project_status_position_idx ON public.tasks (project_id, status, position);

CREATE TRIGGER tasks_set_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tasks_enforce_assignment_rules
  BEFORE INSERT OR UPDATE OF project_id, assigned_to, created_by
  ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_task_assignment_rules();

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view tasks"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (public.can_access_project(project_id));

CREATE POLICY "Workspace members can create tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND public.can_access_project(project_id)
    AND public.user_belongs_to_project_workspace(project_id, created_by)
    AND (
      assigned_to IS NULL
      OR public.is_project_member(project_id, assigned_to)
    )
  );

CREATE POLICY "Workspace members can update tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (public.can_access_project(project_id))
  WITH CHECK (
    public.can_access_project(project_id)
    AND public.user_belongs_to_project_workspace(project_id, created_by)
    AND (
      assigned_to IS NULL
      OR public.is_project_member(project_id, assigned_to)
    )
  );

CREATE POLICY "Workspace members can delete tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (public.can_access_project(project_id));
