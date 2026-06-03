import SectionWrapper from '@/components/ui/SectionWrapper';

export default function About() {
  return (
    <SectionWrapper id="om-festen" width="lg" spacing="loose" tone="paper">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow">Du er herved invitert til fest!</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Jeg har fylt 30, og det må tydeligvis feires?
          </h2>
        </div>
        <div className="border-t border-line pt-6 md:pt-8">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              Det er lenge siden jeg har feiret bursdag, derfor er det på tide å gjøre det ordentlig!
              Stokkerfestivalen blir en sommerfest for venner og familie.
            </p>
            <p>
              Andre har lovet seg selv at jeg skal arrangere pool-party i mange år, nå er tiden endelig inne.
              Jeg har bestilt sommevær, naturlig (u)oppvarmet basseng, tønnegriller, og partytelt!
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
