'use client';

import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/ui/SectionWrapper';

const Map = dynamic(() => import('@/components/ui/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] w-full animate-pulse rounded-md border border-line bg-paper-deep md:h-[440px]" />
  ),
});

const infoItems = [
  {
    title: 'Adresse',
    text: 'Sørumsvegen 50, 2022 Gjerdrum',
  },
  {
    title: 'Dato',
    text: '22. august 2026. Tidspunkt kommer nærmere.',
  },
  {
    title: 'Ta med',
    text: 'Grillmat, drikke, badeklær og godt humør',
  },
  {
    title: 'Parkering',
    text: 'Langs veien og på tunet. Det pleier å ordne seg.',
  },
  {
    title: 'Overnatting',
    text: 'Begrenset plass. Ta kontakt om du trenger å sove over.',
  },
];

export default function PracticalInfo() {
  return (
    <SectionWrapper id="praktisk-info" width="lg" tone="paper">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Praktisk</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Det enkle først.
          </h2>
          <p className="mt-5 lead-text">
            Det er en uformell kveld på gården. Kom som du er, og ta med det du selv vil
            spise og drikke.
          </p>

          <div className="mt-10 border-t border-line">
          {infoItems.map((item) => (
            <div key={item.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr]">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="leading-relaxed text-text-muted">{item.text}</p>
            </div>
          ))}
          </div>
        </div>

        <div className="lg:pt-2">
          <Map />
        </div>
      </div>
    </SectionWrapper>
  );
}
