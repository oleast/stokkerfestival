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

  const totalPeople = guests.reduce((sum, g) => sum + g.numberOfPeople, 0);
  const firstNames = guests.map((g) => g.name.split(' ')[0]);

  return (
    <SectionWrapper id="gjesteliste" className="bg-background-alt">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Gjestelisten</h2>

      {guests.length === 0 ? (
        <p className="mt-6 text-lg text-text-muted">
          Ingen påmeldt ennå. Bli den første! 👆
        </p>
      ) : (
        <>
          <p className="mt-4 text-lg text-text-muted">
            {totalPeople} {totalPeople === 1 ? 'person' : 'personer'} påmeldt
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {firstNames.map((name, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-text"
              >
                {name}
              </span>
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
