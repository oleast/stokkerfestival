import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { siteSettingsQuery } from '@/sanity/lib/queries';

export const runtime = 'edge';
export const alt = 'Stokkerfestivalen – 22. august 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;

export default async function OGImage() {
  const settings = await client.fetch(siteSettingsQuery);

  const imageSource = settings?.ogImage ?? settings?.heroImage ?? null;
  const imageUrl = imageSource
    ? urlFor(imageSource).width(1200).height(630).fit('crop').auto('format').url()
    : null;

  const title = settings?.ogTitle || 'Stokkerfestivalen';
  const description =
    settings?.ogDescription || '30 år. Halvveis til 60. Det krever en fest.';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          background: '#8B2500',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700 }}>🎉 {title}</div>
          <div style={{ fontSize: 32, marginTop: 20, opacity: 0.9 }}>
            22. august 2026
          </div>
          <div style={{ fontSize: 28, marginTop: 16, opacity: 0.85 }}>
            {description}
          </div>
          <div style={{ fontSize: 22, marginTop: 40, opacity: 0.6 }}>
            Sørumsvegen 50 · Gjerdrum
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
