interface SendEmailParams {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendEmail({ to, subject, htmlContent }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('[Email] BREVO_API_KEY ikke satt — hopper over sending');
    return false;
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Stokkerfestivalen', email: 'festival@stokkers.no' },
        to: [to],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Email] Brevo-feil:', response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Email] Sending feilet:', error);
    return false;
  }
}
