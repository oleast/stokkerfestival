import Image from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { galleryImagesQuery, siteSettingsQuery } from '@/sanity/lib/queries';

interface SanityGalleryImage {
  _id: string;
  image?: SanityImageSource | null;
  alt?: string | null;
  order?: number | null;
}

interface ActivityImageSetting {
  activityKey?: string | null;
  title?: string | null;
  image?: SanityGalleryImage | null;
}

interface ActivitySettings {
  activityImages?: ActivityImageSetting[] | null;
}

const featuredActivities = [
  {
    key: 'mat',
    label: 'Mat og grill',
    title: 'Grillen står klar når folk er sultne.',
    description: 'Ta med det du vil spise. Kull, varme og plass rundt bordet ordnes.',
    fallbackIndex: 0,
  },
  {
    key: 'basseng',
    label: 'Basseng og tun',
    title: 'Bad hvis været og motet er der.',
    description: 'Badetøy er lurt. Resten kan holde seg på land med noe kaldt i hånden.',
    fallbackIndex: 1,
  },
  {
    key: 'spill',
    label: 'Spill og lyd',
    title: 'Litt aktivitet, litt musikk, ingen programleder.',
    description: 'Tennis, kubb, kortspill og spilleliste i bakgrunnen for dem som vil.',
    fallbackIndex: 2,
  },
];

const quietActivities = [
  {
    title: 'Drikke',
    description: 'Ta med det du vil drikke. Det finnes kjøleplass, men merk gjerne det som er ditt.',
  },
  {
    title: 'Tennis',
    description: 'Banen er tilgjengelig for både ambisjoner og fullstendig lave skuldre.',
  },
  {
    title: 'Spill',
    description: 'Kubb, kort, volleyball eller noe noen tar med fordi de mener det er gøy.',
  },
  {
    title: 'Musikk',
    description: 'Spilleliste i bakgrunnen. Ønsker tas imot, kanskje også vurdert.',
  },
];

function pickImage(
  key: string,
  fallbackIndex: number,
  settings: ActivitySettings | null,
  galleryImages: SanityGalleryImage[],
) {
  const curated = settings?.activityImages?.find((item) => item.activityKey === key)?.image;
  if (curated?.image) return curated;
  return galleryImages[fallbackIndex] ?? null;
}

export default async function Activities() {
  const [settings, galleryImages] = await Promise.all([
    client.fetch<ActivitySettings | null>(siteSettingsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SanityGalleryImage[]>(galleryImagesQuery, {}, { next: { revalidate: 3600 } }),
  ]);

  return (
    <SectionWrapper id="aktiviteter" width="xl" spacing="loose" tone="warm">
      <div className="max-w-3xl">
        <p className="eyebrow">Muligheter</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
          Ikke et program. Mer en meny.
        </h2>
        <p className="mt-5 lead-text">
          Dagen får være løs i kantene. Dette er ting som finnes på gården og kan tas i bruk
          når det passer.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {featuredActivities.map((activity) => {
          const image = pickImage(activity.key, activity.fallbackIndex, settings, galleryImages);
          const imageUrl = image?.image
            ? urlFor(image.image).width(900).height(1100).fit('crop').auto('format').url()
            : null;

          return (
            <article key={activity.key} className="overflow-hidden rounded-md border border-line bg-paper shadow-soft">
              <div className="relative aspect-[4/3] bg-field-soft lg:aspect-[4/5]">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={image.alt ?? activity.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="p-5 md:p-6">
                <p className="text-sm font-medium text-primary">{activity.label}</p>
                <h3 className="mt-3 text-2xl font-medium leading-tight text-ink">{activity.title}</h3>
                <p className="mt-4 leading-relaxed text-text-muted">{activity.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 grid border-t border-line md:grid-cols-2">
        {quietActivities.map((activity) => (
          <div key={activity.title} className="border-b border-line py-6 md:odd:pr-8 md:even:pl-8">
            <h3 className="text-lg font-medium text-ink">{activity.title}</h3>
            <p className="mt-2 leading-relaxed text-text-muted">{activity.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
