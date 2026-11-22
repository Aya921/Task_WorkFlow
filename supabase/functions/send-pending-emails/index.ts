// Sends the emails queued in public.email_notifications through Resend.
// Called every minute by pg_cron (see the schedule migration). It is not a public
// endpoint: the caller must send the Vault secret in the `x-cron-secret` header.

import { createClient } from "npm:@supabase/supabase-js@2";

type ClaimedEmail = {
  email_id: string;
  attempts: number;
  recipient_email: string | null;
  notification_type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
};

type SendResult =
  | { ok: true; providerId: string }
  | { ok: false; error: string; permanent: boolean };

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const APP_URL = (Deno.env.get("APP_URL") ?? "http://localhost:5173").replace(
  /\/+$/,
  "",
);
const EMAIL_FROM =
  Deno.env.get("EMAIL_FROM") ?? "TaskFlow <onboarding@resend.dev>";
// While Resend has no verified domain it only delivers to the account owner's
// address. When set, every email is redirected to this address (testing only).
const TEST_RECIPIENT = Deno.env.get("EMAIL_TEST_RECIPIENT") ?? "";

const BATCH_SIZE = 10;
const SEND_DELAY_MS = 600; // Resend allows ~2 requests per second.

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildEmail = (row: ClaimedEmail, originalRecipient: string) => {
  const link = `${APP_URL}/Notifications`;
  const redirected = TEST_RECIPIENT && TEST_RECIPIENT !== originalRecipient;
  const subject = `${redirected ? `[to: ${originalRecipient}] ` : ""}TaskFlow: ${row.title}`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:480px;background:#ffffff;border-radius:12px;padding:28px;" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;">TaskFlow</p>
                <h1 style="margin:0 0 12px;font-size:20px;line-height:1.3;">${escapeHtml(row.title)}</h1>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.5;color:#334155;">${escapeHtml(row.message)}</p>
                <p style="margin:0 0 20px;font-size:14px;color:#475569;">You have a new notification in TaskFlow.</p>
                <a href="${escapeHtml(link)}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;">Open notifications</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${row.title}\n\n${row.message}\n\nOpen notifications: ${link}`;

  return { subject, html, text };
};

const sendWithResend = async (row: ClaimedEmail): Promise<SendResult> => {
  const originalRecipient = row.recipient_email;
  if (!originalRecipient) {
    return { ok: false, error: "Recipient has no email address", permanent: true };
  }

  const to = TEST_RECIPIENT || originalRecipient;
  const { subject, html, text } = buildEmail(row, originalRecipient);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        // One key per attempt: a re-claimed stuck row is de-duplicated, while a
        // genuine retry after a failure is not answered with the cached failure.
        "Idempotency-Key": `${row.email_id}-${row.attempts}`,
      },
      body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, html, text }),
    });
  } catch (error) {
    return {
      ok: false,
      error: `Network error: ${error instanceof Error ? error.message : String(error)}`,
      permanent: false,
    };
  }

  const bodyText = await response.text();

  if (response.ok) {
    try {
      const parsed = JSON.parse(bodyText) as { id?: string };
      return { ok: true, providerId: parsed.id ?? "" };
    } catch {
      return { ok: true, providerId: "" };
    }
  }

  // 4xx (except 429 rate limit and 409 idempotency conflict) will not succeed on retry.
  const permanent =
    response.status >= 400 &&
    response.status < 500 &&
    response.status !== 429 &&
    response.status !== 409;

  return {
    ok: false,
    error: `Resend ${response.status}: ${bodyText}`,
    permanent,
  };
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const secret = req.headers.get("x-cron-secret") ?? "";
  const { data: isValid, error: secretError } = await supabase.rpc(
    "verify_email_cron_secret",
    { p_secret: secret },
  );

  if (secretError || isValid !== true) {
    return json({ error: "Unauthorized" }, 401);
  }

  // Nothing is claimed while the key is missing, so queued emails just wait.
  if (!RESEND_API_KEY) {
    return json({ error: "RESEND_API_KEY is not configured" }, 500);
  }

  const { data, error: claimError } = await supabase.rpc(
    "claim_pending_emails",
    { p_limit: BATCH_SIZE },
  );

  if (claimError) {
    return json({ error: claimError.message }, 500);
  }

  const rows = (data ?? []) as ClaimedEmail[];
  let sent = 0;
  let failed = 0;

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    if (index > 0) {
      await sleep(SEND_DELAY_MS);
    }

    let result: SendResult;
    try {
      result = await sendWithResend(row);
    } catch (error) {
      result = {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        permanent: false,
      };
    }

    if (result.ok) {
      const { error } = await supabase.rpc("mark_email_sent", {
        p_email_id: row.email_id,
        p_provider_message_id: result.providerId,
      });
      if (error) {
        console.error("mark_email_sent failed", row.email_id, error.message);
      }
      sent++;
    } else {
      const { error } = await supabase.rpc("mark_email_failed", {
        p_email_id: row.email_id,
        p_error: result.error,
        p_permanent: result.permanent,
      });
      if (error) {
        console.error("mark_email_failed failed", row.email_id, error.message);
      }
      console.error("email failed", row.email_id, result.error);
      failed++;
    }
  }

  return json({ claimed: rows.length, sent, failed });
});
