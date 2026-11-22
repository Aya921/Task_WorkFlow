-- A user may not delete a workspace if they would be left with none.
-- RLS alone would silently skip the row; a BEFORE DELETE trigger raises a clear error.

CREATE OR REPLACE FUNCTION public.enforce_user_keeps_one_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow system / service-role deletes (no JWT). Authenticated users are checked.
  IF auth.uid() IS NULL THEN
    RETURN OLD;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.workspace_members wm
    WHERE wm.user_id = auth.uid()
      AND wm.workspace_id <> OLD.id
  ) THEN
    RAISE EXCEPTION 'You must keep at least one workspace'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS workspaces_enforce_keeps_one ON public.workspaces;

CREATE TRIGGER workspaces_enforce_keeps_one
  BEFORE DELETE ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_user_keeps_one_workspace();

-- Mirror the rule in RLS so client deletes are filtered with the same intent.
DROP POLICY IF EXISTS "Users can delete their own workspace" ON public.workspaces;

CREATE POLICY "Users can delete their own workspace"
  ON public.workspaces
  FOR DELETE
  TO authenticated
  USING (
    created_by = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.workspace_members wm
      WHERE wm.user_id = auth.uid()
        AND wm.workspace_id <> workspaces.id
    )
  );
