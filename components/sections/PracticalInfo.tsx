'use client';

import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/ui/SectionWrapper';

const Map = dynamic(() => import('@/components/ui/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-xl bg-background-alt" />
  ),
});

const infoItems = [
  {
    icon: '📍',
    title: 'Adresse',
    text: 'Sørumsvegen 50, 2022 Gjerdrum',
  },
  {
    icon: '📅',
    title: 'Dato',
    text: '22. august 2026 — tidspunkt kommer',
  },
  {
    icon: '🎒',
    title: 'Ta med',
    text: 'Grillmat, drikke, badeklær og godt humør',
  },
  {
    icon: '🚗',
    title: 'Parkering',
    text: 'Langs veien og på tunet — det er plass nok',
  },
  {
    icon: '🛏️',
    title: 'Overnatting',
    text: 'Begrenset plass — ta kontakt om du trenger å sove over',
  },
];

export default function PracticalInfo() {
  return (
    <SectionWrapper id="praktisk-info">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Praktisk info</h2>
      <p className="mt-4 text-lg text-text-muted">
        Alt du trenger å vite (og litt til).
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Info list */}
        <div className="space-y-6">
          {infoItems.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="text-2xl" role="img" aria-label={item.title}>
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-text">{item.title}</h3>
                <p className="text-text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div>
          <Map />
        </div>
      </div>
    </SectionWrapper>
  );
}
