import { NextResponse } from 'next/server';
import { unregisterSchema } from '@/lib/validation/registration';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';
import { registrationByEmailQuery } from '@/sanity/lib/queries';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = unregisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Ugyldig data' },
        { status: 400 },
      );
    }

    const { name, email: rawEmail } = result.data;
    const normalizedEmail = rawEmail.toLowerCase().trim();

    const existing = await client.fetch(registrationByEmailQuery, { email: normalizedEmail });
    if (!existing) {
      return NextResponse.json(
        { error: 'Fant ingen påmelding med dette navnet og denne e-postadressen.' },
        { status: 404 },
      );
    }

    if (existing.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
      return NextResponse.json(
        { error: 'Fant ingen påmelding med dette navnet og denne e-postadressen.' },
        { status: 404 },
      );
    }

    await writeClient.delete(existing._id);

    return NextResponse.json({ message: 'Du er avmeldt. Synd du ikke kan komme!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Noe gikk galt. Prøv igjen senere.' },
      { status: 500 },
    );
  }
}
