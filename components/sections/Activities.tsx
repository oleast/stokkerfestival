import SectionWrapper from '@/components/ui/SectionWrapper';

const activities = [
  {
    emoji: '🔥',
    title: 'Grilling',
    description: 'Ta med det du vil kaste på grillen. Vi sørger for kull og god stemning.',
  },
  {
    emoji: '🍻',
    title: 'Drikke',
    description: 'BYOB — ta med det du vil drikke. Kjøleskap er tilgjengelig.',
  },
  {
    emoji: '🏊',
    title: 'Basseng',
    description: 'Badebukse/bikini er påkrevd. Temperaturen er valgfri.',
  },
  {
    emoji: '🎾',
    title: 'Tennis',
    description: 'Banen er klar. Nivået er helt valgfritt.',
  },
  {
    emoji: '🦆',
    title: 'Ender',
    description: 'Gårdens egne. Se, ikke spis.',
  },
  {
    emoji: '🎲',
    title: 'Spill',
    description: 'Kubb, volleyball, kortspill — you name it.',
  },
  {
    emoji: '🥾',
    title: 'Utflukt',
    description: 'For de som trenger å fortjene ølen sin.',
  },
  {
    emoji: '🎵',
    title: 'Musikk',
    description: 'Spilleliste i bakgrunnen. Ønsker mottas med skepsis.',
  },
];

export default function Activities() {
  return (
    <SectionWrapper id="aktiviteter" className="bg-background-alt">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Hva skjer?</h2>
      <p className="mt-4 text-lg text-text-muted">
        Ingen stram tidsplan, men det mangler ikke på muligheter.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md"
          >
            <span className="text-3xl" role="img" aria-label={activity.title}>
              {activity.emoji}
            </span>
            <h3 className="mt-3 font-semibold text-text">{activity.title}</h3>
            <p className="mt-1 text-sm text-text-muted">{activity.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
