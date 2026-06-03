'use client';

import { useState } from 'react';
import Image from 'next/image';
import posthog from 'posthog-js';
import Lightbox from '@/components/ui/Lightbox';

interface GalleryImage {
  _id: string;
  alt: string;
  thumbnailUrl: string;
  fullUrl: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[210px] md:gap-4">
        {images.map((image, index) => (
          <button
            key={image._id}
            onClick={() => {
              posthog.capture('gallery_image_opened', { alt: image.alt });
              setLightboxImage(image);
            }}
            className={`relative overflow-hidden rounded-md bg-paper-deep transition duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/25 ${
              index === 0
                ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto'
                : index === 3
                  ? 'col-span-2 aspect-[4/3] md:col-span-1 md:aspect-auto'
                  : 'aspect-[3/4] md:aspect-auto'
            }`}
          >
            <Image
              src={image.thumbnailUrl}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {lightboxImage && (
        <Lightbox
          src={lightboxImage.fullUrl}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
