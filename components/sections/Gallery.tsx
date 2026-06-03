import { client } from '@/sanity/lib/client';
import { galleryImagesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GalleryGrid from '@/components/sections/GalleryGrid';

interface SanityGalleryImage {
  _id: string;
  image: object;
  alt: string;
  order?: number | null;
}

export default async function Gallery() {
  const images: SanityGalleryImage[] = await client.fetch(
    galleryImagesQuery,
    {},
    { next: { revalidate: 3600 } },
  );

  if (images.length === 0) return null;

  const galleryImages = images.map((img) => ({
    _id: img._id,
    alt: img.alt,
    thumbnailUrl: urlFor(img.image).width(800).auto('format').url(),
    fullUrl: urlFor(img.image).width(1600).auto('format').url(),
  }));

  return (
    <SectionWrapper id="galleri" width="xl" tone="paper">
      <div className="max-w-3xl">
        <p className="eyebrow">Bilder</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
          Litt av stemningen.
        </h2>
        <p className="mt-5 lead-text">
          Noen glimt fra stedet og sommeren rundt. Bildene er ikke ment som pynt, bare som
          en liten påminnelse om hvor vi skal være.
        </p>
      </div>
      <div className="mt-12">
        <GalleryGrid images={galleryImages} />
      </div>
    </SectionWrapper>
  );
}
