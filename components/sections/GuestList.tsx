import { client } from '@/sanity/lib/client';
import { guestListQuery } from '@/sanity/lib/queries';
import SectionWrapper from '@/components/ui/SectionWrapper';

interface GuestEntry {
  _id: string;
  name: string;
  numberOfPeople: number;
}

export default async function GuestList() {
  const guests: GuestEntry[] = await client.fetch(
    guestListQuery,
    {},
    { next: { revalidate: 60 } },
  );

  const totalPeople = guests.reduce((sum, guest) => sum + guest.numberOfPeople, 0);

  return (
    <SectionWrapper id="gjesteliste" width="lg" tone="warm" spacing="compact">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow">Gjesteliste</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">Hvem kommer?</h2>
        </div>

        {guests.length === 0 ? (
          <p className="border-t border-line pt-6 lead-text">
            Ingen påmeldte vises ennå. Gjestelisten fylles rolig etter hvert.
          </p>
        ) : (
          <div>
            <p className="lead-text">
              {totalPeople} {totalPeople === 1 ? 'person' : 'personer'} er påmeldt så langt.
            </p>
            <ul className="mt-8 grid border-t border-line sm:grid-cols-2">
              {guests.map((guest) => (
                <li key={guest._id} className="border-b border-line py-3 text-ink">
                  {guest.name.split(' ')[0]}
                  {guest.numberOfPeople > 1 && (
                    <span className="text-text-muted"> + {guest.numberOfPeople - 1}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
