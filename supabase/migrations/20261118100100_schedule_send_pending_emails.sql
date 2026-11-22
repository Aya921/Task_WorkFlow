-- Every minute, call the send-pending-emails Edge Function.
-- The shared secret is read from Vault at run time (never stored in the job text).

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-pending-emails') THEN
    PERFORM cron.unschedule('send-pending-emails');
  END IF;
END;
$$;

SELECT cron.schedule(
  'send-pending-emails',
  '* * * * *',
  $job$
  SELECT net.http_post(
    url := 'https://ecwchgsmecnsaguwjgbz.supabase.co/functions/v1/send-pending-emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (
        SELECT decrypted_secret
        FROM vault.decrypted_secrets
        WHERE name = 'email_cron_secret'
      )
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $job$
);
