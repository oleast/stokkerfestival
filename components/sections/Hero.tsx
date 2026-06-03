import Image from 'next/image';
import Countdown from '@/components/ui/Countdown';
import RegisterCTALink from '@/components/ui/RegisterCTALink';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url';

interface SiteSettings {
  heroImage?: SanityImageSource | null;
  heroAlt?: string | null;
  festivalDate?: string | null;
  tagline?: string | null;
  subtitle?: string | null;
}

const FALLBACK_DATE = '2026-08-22T16:00:00+02:00';

export default async function Hero() {
  const settings: SiteSettings | null = await client.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 3600 } },
  );

  const festivalDate = settings?.festivalDate ?? FALLBACK_DATE;
  const imageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(2200).height(1500).fit('crop').auto('format').url()
    : null;
  const formattedDate = new Date(festivalDate).toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const subtitle = settings?.subtitle ?? 'Ole Anders fyller 30';
  const tagline =
    settings?.tagline ??
    'En rolig sommerdag på gården, med mat, bad, spill og folk det er godt å se igjen.';

  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={settings?.heroAlt ?? 'Sommerstemning på Sørumsvegen 50'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-black/10" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-end px-6 pb-16 pt-32 md:px-8 md:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <h1 className="mt-5 text-6xl font-semibold leading-none text-white md:text-8xl lg:text-9xl">
            Stokkerfestival!
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
            {subtitle}. {tagline}
          </p>

          <div className="mt-10 grid gap-5 border-white/25 py-6 text-sm text-white/90 sm:grid-cols-3">
            <div>
              <p className="text-white">Dato</p>
              <p className="mt-1 font-medium capitalize">{formattedDate}</p>
            </div>
            <div>
              <p className="text-white">Sted</p>
              <p className="mt-1 font-medium">Sørumsvegen 50</p>
            </div>
            <div>
              <Countdown festivalDate={festivalDate} className="mt-1 text-white" />
            </div>
          </div>

          <RegisterCTALink className="mt-8 inline-flex rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white/30" />
        </div>
      </div>
    </section>
  );
}
