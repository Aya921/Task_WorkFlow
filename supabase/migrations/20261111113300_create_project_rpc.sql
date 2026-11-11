-- Atomically create a project and add the creator as project admin.
CREATE OR REPLACE FUNCTION public.create_project(
  p_workspace_id uuid,
  p_name text,
  p_description text DEFAULT NULL,
  p_color text DEFAULT NULL
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

REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_project(uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_project(uuid, text, text, text) TO authenticated;
