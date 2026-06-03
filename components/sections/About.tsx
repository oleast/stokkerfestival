import SectionWrapper from '@/components/ui/SectionWrapper';

export default function About() {
  return (
    <SectionWrapper id="om-festen" width="lg" spacing="loose" tone="paper">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow">Invitasjonen</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            En 30-årsdag uten for mye seremoni.
          </h2>
        </div>
        <div className="border-t border-line pt-6 md:pt-8">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              Stokkerfestivalen er først og fremst en samling av folk jeg liker, på et sted
              som betyr mye. Navnet får bli med som en liten overdrivelse, men kvelden er
              en ganske enkel 30-årsdag på Sørumsvegen 50.
            </p>
            <p>
              Det blir mat på grillen, noe kaldt i glasset, basseng om været spiller på lag,
              og god tid til å sitte lenge nok til at sommerdagen rekker å bli kveld.
            </p>
            <p>
              Ta med det du vil spise og drikke, badetøy om du vil bade, og klær som tåler
              både tun, gress og en litt sein hjemtur.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
