import { Suspense } from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Activities from '@/components/sections/Activities';
import Gallery from '@/components/sections/Gallery';
import PracticalInfo from '@/components/sections/PracticalInfo';
import Registration from '@/components/sections/Registration';
import GuestList from '@/components/sections/GuestList';
import Unregister from '@/components/sections/Unregister';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import type { SanityImageSource } from '@sanity/image-url';

interface SiteSettingsMetadata {
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch<SiteSettingsMetadata | null>(siteSettingsQuery);
    const image = settings?.ogImage ?? settings?.heroImage;
    const title = settings?.ogTitle ?? 'Stokkerfestivalen | Ole Anders sin 30-årsdag';
    const description =
      settings?.ogDescription ??
      'Privat invitasjon til Ole Anders sin 30-årsdag på Sørumsvegen 50, 22. august 2026.';

    const images = image
      ? [{ url: urlFor(image).width(1200).height(630).fit('crop').auto('format').url(), width: 1200, height: 630 }]
      : [];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: 'https://festival.stokkers.no',
        locale: 'nb_NO',
        siteName: 'Stokkerfestivalen',
        images,
      },
    };
  } catch {
    return {};
  }
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Activities />
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
      <PracticalInfo />
      <Registration />
      <Suspense
        fallback={
          <div className="bg-paper-soft px-6 py-20">
            <div className="mx-auto max-w-6xl">
              <p className="text-text-muted">Laster gjesteliste...</p>
            </div>
          </div>
        }
      >
        <GuestList />
      </Suspense>
      <Suspense fallback={null}>
        <Unregister />
      </Suspense>
    </main>
  );
}
