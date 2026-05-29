import Image from 'next/image';
import Countdown from '@/components/ui/Countdown';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url';

interface SiteSettings {
  heroImage: SanityImageSource;
  heroAlt: string;
  festivalDate: string | null;
  tagline: string | null;
  subtitle: string | null;
}

export default async function Hero() {
  const settings: SiteSettings | null = await client.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 3600 } },
  );

  if (!settings) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-primary px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Stokkerfestivalen
          </h1>
        </div>
      </section>
    );
  }

  const imageUrl = urlFor(settings.heroImage).width(1920).auto('format').url();
  const formattedDate = settings.festivalDate
    ? new Date(settings.festivalDate).toLocaleDateString('nb-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Image panel - shows first on mobile */}
      <div className="relative h-[50vh] w-full lg:h-auto lg:w-1/2">
        <Image
          src={imageUrl}
          alt={settings.heroAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Gradient overlay for mobile header contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Text panel */}
      <div className="flex w-full flex-col justify-center bg-primary px-8 py-16 lg:w-1/2 lg:px-16">
        <div className="mx-auto max-w-lg">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Stokkerfestivalen
          </h1>
          {settings.tagline && (
            <p className="mt-4 text-xl text-white/80 md:text-2xl">
              {settings.tagline}
            </p>
          )}
          <div className="mt-8 space-y-1">
            {formattedDate && <p className="text-lg font-medium text-white">{formattedDate}</p>}
            <p className="text-lg text-white/70">Sørumsvegen 50</p>
          </div>
          {settings.festivalDate && (
            <div className="mt-4">
              <Countdown festivalDate={settings.festivalDate} />
            </div>
          )}
          <a
            href="#pamelding"
            className="mt-10 inline-block rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-primary transition-colors hover:bg-background"
          >
            Meld deg på
          </a>
        </div>
      </div>
    </section>
  );
}
