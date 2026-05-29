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
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
        {images.map((image) => (
          <button
            key={image._id}
            onClick={() => {
              posthog.capture('gallery_image_opened', { alt: image.alt });
              setLightboxImage(image);
            }}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <Image
              src={image.thumbnailUrl}
              alt={image.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
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
