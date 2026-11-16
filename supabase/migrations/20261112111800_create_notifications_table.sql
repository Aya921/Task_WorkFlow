-- In-app notifications inbox foundation.
-- Creation is reserved for a future SECURITY DEFINER RPC (no INSERT policy now).

CREATE TYPE public.notification_type AS ENUM (
  'project_invitation',
  'task_assigned',
  'task_updated',
  'task_completed',
  'task_due_soon',
  'project_updated',
  'member_joined',
  'member_removed'
);

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type public.notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT notifications_title_not_empty CHECK (char_length(TRIM(BOTH FROM title)) > 0),
  CONSTRAINT notifications_message_not_empty CHECK (char_length(TRIM(BOTH FROM message)) > 0),
  CONSTRAINT notifications_read_state_check CHECK (
    (is_read = false AND read_at IS NULL)
    OR (is_read = true AND read_at IS NOT NULL)
  )
);

CREATE INDEX notifications_user_id_created_at_idx
  ON public.notifications (user_id, created_at DESC);

CREATE INDEX notifications_user_id_unread_idx
  ON public.notifications (user_id, created_at DESC)
  WHERE is_read = false;

-- Defense in depth: even with column grants, block content/ownership mutation.
CREATE OR REPLACE FUNCTION public.enforce_notification_read_only_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.id IS DISTINCT FROM OLD.id
     OR NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.type IS DISTINCT FROM OLD.type
     OR NEW.title IS DISTINCT FROM OLD.title
     OR NEW.message IS DISTINCT FROM OLD.message
     OR NEW.data IS DISTINCT FROM OLD.data
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Only is_read and read_at can be updated on notifications';
  END IF;

  IF NEW.is_read IS DISTINCT FROM OLD.is_read THEN
    IF NEW.is_read THEN
      NEW.read_at := now();
    ELSE
      NEW.read_at := NULL;
    END IF;
  ELSIF NEW.read_at IS DISTINCT FROM OLD.read_at THEN
    RAISE EXCEPTION 'read_at is managed automatically from is_read';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER notifications_enforce_read_only_update
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_notification_read_only_update();

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Tighten privileges vs Supabase defaults (full DML to authenticated/anon).
REVOKE ALL ON TABLE public.notifications FROM PUBLIC;
REVOKE ALL ON TABLE public.notifications FROM anon;
REVOKE ALL ON TABLE public.notifications FROM authenticated;

GRANT SELECT ON TABLE public.notifications TO authenticated;
GRANT UPDATE (is_read, read_at) ON TABLE public.notifications TO authenticated;

GRANT ALL ON TABLE public.notifications TO service_role;

GRANT USAGE ON TYPE public.notification_type TO authenticated;
GRANT USAGE ON TYPE public.notification_type TO service_role;
