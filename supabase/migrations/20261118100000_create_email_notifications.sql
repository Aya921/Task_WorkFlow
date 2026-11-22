-- Email outbox for in-app notifications.
-- Flow: notifications INSERT -> trigger enqueues a pending row -> pg_cron calls the
-- send-pending-emails Edge Function every minute -> function claims due rows, sends
-- through Resend and records the result (with a retry schedule).

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE TABLE public.email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL
    REFERENCES public.notifications(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_error text,
  sent_at timestamptz,
  provider_message_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_notifications_notification_unique UNIQUE (notification_id),
  CONSTRAINT email_notifications_status_check
    CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  CONSTRAINT email_notifications_attempts_check CHECK (attempts >= 0),
  CONSTRAINT email_notifications_sent_state_check
    CHECK ((status = 'sent') = (sent_at IS NOT NULL))
);

CREATE INDEX email_notifications_due_idx
  ON public.email_notifications (next_attempt_at)
  WHERE status IN ('pending', 'sending');

CREATE OR REPLACE FUNCTION public.email_notifications_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER email_notifications_set_updated_at
  BEFORE UPDATE ON public.email_notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.email_notifications_set_updated_at();

-- Server-only table: no client access at all.
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.email_notifications FROM PUBLIC;
REVOKE ALL ON TABLE public.email_notifications FROM anon;
REVOKE ALL ON TABLE public.email_notifications FROM authenticated;
GRANT ALL ON TABLE public.email_notifications TO service_role;

-- Enqueue an email for every NEW notification (not on updates such as marking as read).
CREATE OR REPLACE FUNCTION public.enqueue_notification_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.email_notifications (notification_id)
  VALUES (NEW.id)
  ON CONFLICT ON CONSTRAINT email_notifications_notification_unique DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER notifications_enqueue_email
  AFTER INSERT ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.enqueue_notification_email();

-- Claim due rows (pending and due, or stuck in "sending" for over 5 minutes) and
-- return everything the Edge Function needs to build the email.
-- FOR UPDATE SKIP LOCKED prevents two runs from claiming the same row.
CREATE OR REPLACE FUNCTION public.claim_pending_emails(p_limit integer DEFAULT 10)
RETURNS TABLE (
  email_id uuid,
  attempts integer,
  recipient_email text,
  notification_type text,
  title text,
  message text,
  data jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY
  WITH due AS (
    SELECT en.id
    FROM public.email_notifications en
    WHERE (en.status = 'pending' AND en.next_attempt_at <= now())
       OR (en.status = 'sending' AND en.updated_at <= now() - interval '5 minutes')
    ORDER BY en.next_attempt_at
    LIMIT GREATEST(p_limit, 1)
    FOR UPDATE SKIP LOCKED
  ),
  claimed AS (
    UPDATE public.email_notifications en
    SET status = 'sending'
    FROM due
    WHERE en.id = due.id
    RETURNING en.id AS claimed_id, en.notification_id AS claimed_notification_id, en.attempts AS claimed_attempts
  )
  SELECT
    c.claimed_id,
    c.claimed_attempts,
    u.email::text,
    n.type::text,
    n.title,
    n.message,
    n.data
  FROM claimed c
  JOIN public.notifications n ON n.id = c.claimed_notification_id
  LEFT JOIN auth.users u ON u.id = n.user_id;
END;
$$;

-- Success: record the provider id and finish.
CREATE OR REPLACE FUNCTION public.mark_email_sent(
  p_email_id uuid,
  p_provider_message_id text
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.email_notifications
  SET status = 'sent',
      attempts = attempts + 1,
      sent_at = now(),
      last_error = NULL,
      provider_message_id = p_provider_message_id
  WHERE id = p_email_id
    AND status = 'sending';
$$;

-- Failure: schedule the next attempt (1m, 2m, 5m, 1h) or give up after the 5th attempt.
-- p_permanent = true gives up immediately (errors a retry can't fix).
CREATE OR REPLACE FUNCTION public.mark_email_failed(
  p_email_id uuid,
  p_error text,
  p_permanent boolean DEFAULT false
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.email_notifications
  SET attempts = attempts + 1,
      last_error = left(COALESCE(p_error, 'Unknown error'), 1000),
      status = CASE
        WHEN p_permanent OR attempts + 1 >= 5 THEN 'failed'
        ELSE 'pending'
      END,
      next_attempt_at = now() + CASE attempts + 1
        WHEN 1 THEN interval '1 minute'
        WHEN 2 THEN interval '2 minutes'
        WHEN 3 THEN interval '5 minutes'
        ELSE interval '1 hour'
      END
  WHERE id = p_email_id
    AND status = 'sending';
$$;

-- Shared secret between pg_cron and the Edge Function (stored in Vault).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM vault.secrets WHERE name = 'email_cron_secret'
  ) THEN
    PERFORM vault.create_secret(
      replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
      'email_cron_secret',
      'Shared secret used by pg_cron to call the send-pending-emails Edge Function'
    );
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_email_cron_secret(p_secret text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT ds.decrypted_secret = p_secret
      FROM vault.decrypted_secrets ds
      WHERE ds.name = 'email_cron_secret'
      LIMIT 1
    ),
    false
  );
$$;

-- Only the Edge Function (service_role) may call these.
REVOKE ALL ON FUNCTION public.claim_pending_emails(integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mark_email_sent(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mark_email_failed(uuid, text, boolean) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.verify_email_cron_secret(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enqueue_notification_email() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_pending_emails(integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_email_sent(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_email_failed(uuid, text, boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_email_cron_secret(text) TO service_role;
