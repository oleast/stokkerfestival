import { NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/validation/registration';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';
import { registrationByEmailQuery } from '@/sanity/lib/queries';
import { sendEmail } from '@/lib/email/brevo';
import { buildConfirmationEmail, buildAdminNotificationEmail } from '@/lib/email/templates';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(request: Request) {
  const distinctId = request.headers.get('X-POSTHOG-DISTINCT-ID');

  try {
    const body = await request.json();

    const result = registrationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Ugyldig data', details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, numberOfPeople, comment, showOnGuestList } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    const existing = await client.fetch(
      registrationByEmailQuery,
      { email: normalizedEmail },
      { cache: 'no-store' },
    );
    if (existing) {
      return NextResponse.json(
        { error: 'duplicate', message: 'Du er allerede påmeldt! Vi gleder oss til å se deg.' },
        { status: 409 },
      );
    }

    // Create registration in Sanity
    await writeClient.create({
      _type: 'registration',
      name,
      email: normalizedEmail,
      numberOfPeople,
      comment: comment || '',
      showOnGuestList,
      registeredAt: new Date().toISOString(),
    });

    // Track registration server-side
    const posthog = getPostHogClient();
    const trackingId = distinctId || normalizedEmail;
    posthog.capture({
      distinctId: trackingId,
      event: 'registration_succeeded',
      properties: {
        $set: { name, email: normalizedEmail },
        number_of_people: numberOfPeople,
        shows_on_guest_list: showOnGuestList,
        has_comment: !!comment,
      },
    });
    posthog.identify({
      distinctId: trackingId,
      properties: { name, email: normalizedEmail },
    });
    await posthog.shutdown();

    // Send emails (non-blocking — don't fail registration if emails fail)
    const adminEmail = process.env.ADMIN_EMAIL || 'olestokk@gmail.com';

    // Fire-and-forget: emails should not block the response
    void Promise.allSettled([
      sendEmail({
        to: { email: normalizedEmail, name },
        subject: 'Du er påmeldt Stokkerfestivalen! 🎉',
        htmlContent: buildConfirmationEmail({ name, numberOfPeople, email: normalizedEmail }),
      }),
      sendEmail({
        to: { email: adminEmail },
        subject: `Ny påmelding: ${name} (${numberOfPeople} pers)`,
        htmlContent: buildAdminNotificationEmail({
          name,
          email: normalizedEmail,
          numberOfPeople,
          comment: comment || '',
        }),
      }),
    ]);

    return NextResponse.json({ message: 'Påmelding registrert!' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Noe gikk galt. Prøv igjen senere.' }, { status: 500 });
  }
}
