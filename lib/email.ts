/**
 * lib/email.ts
 * Email helpers. Tries to load nodemailer at runtime. If not installed, falls back to console logging.
 *
 * Required env:
 *  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *  - NOTIFY_FROM (e.g., 'GPPS Admissions <admissions@example.com>')
 *  - NOTIFY_TO   (recipient for lead notifications)
 */
type MailInput = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

async function getTransport() {
  // Dynamic import to avoid hard dependency when installing packages is blocked
  try {
    // Defer module resolution to runtime to avoid bundling errors when nodemailer is not installed.
    // Using eval keeps the bundler from trying to resolve "nodemailer" at build time.
    const nodemailer = await (async () => {
      try {
        // @ts-ignore
        return await (0, eval)('import("nodemailer")');
      } catch {
        return null;
      }
    })();
    if (!nodemailer) {
      console.warn('nodemailer not available; email will be logged only.');
      return null;
    }
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      console.warn('Email disabled: missing SMTP env (SMTP_HOST/SMTP_USER/SMTP_PASS).');
      return null;
    }
    const transport = (nodemailer as any).createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    return transport;
  } catch (err) {
    console.warn('nodemailer not available; email will be logged only.');
    return null;
  }
}

export async function sendMail({ to, subject, text, html }: MailInput) {
  const from = process.env.NOTIFY_FROM || 'no-reply@example.com';
  const transport = await getTransport();
  if (!transport) {
    console.log('[EMAIL Fallback]', { from, to, subject, text: text?.slice(0, 500), html: html?.slice(0, 500) });
    return { ok: false, logged: true };
  }
  await transport.sendMail({ from, to, subject, text, html });
  return { ok: true };
}

export async function sendNewLeadEmail(type: 'contact' | 'apply', data: Record<string, any>) {
  const to = process.env.NOTIFY_TO;
  if (!to) {
    console.warn('NOTIFY_TO not set; skipping new-lead email.');
    return { ok: false, skipped: true };
  }
  const subject = `New ${type} submission from ${data.firstName ?? ''} ${data.lastName ?? ''}`.trim();
  const lines = Object.entries(data)
    .filter(([k]) => !['internalNotes', 'timeline'].includes(k))
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`);
  const text = lines.join('\n');
  return sendMail({ to, subject, text });
}

export async function sendReplyEmail(to: string, subject: string, body: string) {
  return sendMail({ to, subject, text: body });
}
