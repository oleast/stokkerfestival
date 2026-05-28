import { client } from '@/sanity/lib/client';
import { galleryImagesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GalleryGrid from '@/components/sections/GalleryGrid';

interface SanityGalleryImage {
  _id: string;
  image: object;
  alt: string;
  order: number;
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
    <SectionWrapper id="galleri">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Galleri</h2>
      <p className="mt-4 text-lg text-text-muted">
        Et lite innblikk i hva som venter.
      </p>
      <div className="mt-10">
        <GalleryGrid images={galleryImages} />
      </div>
    </SectionWrapper>
  );
}
