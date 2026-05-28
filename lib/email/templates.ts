function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface ConfirmationData {
  name: string;
  numberOfPeople: number;
  email: string;
}

export function buildConfirmationEmail({ name, numberOfPeople, email }: ConfirmationData): string {
  const personText = numberOfPeople === 1 ? '1 person' : `${numberOfPeople} personer`;
  const avmeldUrl = `https://festival.stokkers.no?avmeld=${encodeURIComponent(email)}`;

  return `
<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; color: #1A1A1A; background: #FDFBF7;">
  <div style="background: #8B2500; color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🎉 Du er påmeldt!</h1>
  </div>
  <div style="background: white; padding: 32px; border: 1px solid #E5DDD3; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px;">Hei, ${escapeHtml(name)}!</p>
    <p style="font-size: 16px;">
      Du er nå registrert til <strong>Stokkerfestivalen</strong> med ${personText}. 
      Vi gleder oss til å se deg!
    </p>
    <hr style="border: none; border-top: 1px solid #E5DDD3; margin: 24px 0;">
    <p style="font-size: 14px; color: #4A4A4A;"><strong>📅 Dato:</strong> 22. august 2026</p>
    <p style="font-size: 14px; color: #4A4A4A;"><strong>📍 Sted:</strong> Sørumsvegen 50, 2022 Gjerdrum</p>
    <p style="font-size: 14px; color: #4A4A4A;"><strong>🎒 Ta med:</strong> Grillmat, drikke, badeklær og godt humør</p>
    <hr style="border: none; border-top: 1px solid #E5DDD3; margin: 24px 0;">
    <p style="font-size: 14px; color: #4A4A4A;">
      Mer info: <a href="https://festival.stokkers.no" style="color: #8B2500;">festival.stokkers.no</a>
    </p>
    <p style="font-size: 12px; color: #888; margin-top: 24px;">
      Meldt på ved en feil? <a href="${avmeldUrl}" style="color: #8B2500;">Meld av her</a>
    </p>
  </div>
</body>
</html>`;
}

interface AdminNotificationData {
  name: string;
  email: string;
  numberOfPeople: number;
  comment: string;
}

export function buildAdminNotificationEmail({ name, email, numberOfPeople, comment }: AdminNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 16px; color: #1A1A1A;">
  <h2 style="color: #8B2500;">Ny påmelding 🎉</h2>
  <table style="font-size: 14px; border-collapse: collapse;">
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Navn:</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">E-post:</td><td>${escapeHtml(email)}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Antall:</td><td>${numberOfPeople}</td></tr>
    ${comment ? `<tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Kommentar:</td><td>${escapeHtml(comment)}</td></tr>` : ''}
  </table>
</body>
</html>`;
}
