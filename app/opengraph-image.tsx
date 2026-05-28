import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stokkerfestivalen – 22. august 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          background: '#8B2500',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700 }}>🎉 Stokkerfestivalen</div>
        <div style={{ fontSize: 36, marginTop: 20, opacity: 0.9 }}>
          22. august 2026
        </div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.7 }}>
          30 år. Halvveis til 60. Det krever en fest.
        </div>
        <div style={{ fontSize: 22, marginTop: 40, opacity: 0.5 }}>
          Sørumsvegen 50 · Gjerdrum
        </div>
      </div>
    ),
    { ...size },
  );
}
