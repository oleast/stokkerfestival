import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    '❌ Mangler miljøvariabler: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const IMG_DIR = path.resolve(import.meta.dirname, '../img');
const EXTRACTED_DIR = path.join(IMG_DIR, '.extracted-temp');
const HERO_FILENAME = 'IMG_20200623_192830.jpg';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov'];

function isImage(filename: string): boolean {
  return IMAGE_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

function isVideo(filename: string): boolean {
  return VIDEO_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

function filenameToAlt(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

async function main() {
  console.log('⚠️  Dette scriptet oppretter nye dokumenter hver gang det kjøres. Duplikater vil oppstå ved gjentatt kjøring.\n');

  if (!fs.existsSync(IMG_DIR)) {
    console.error(`❌ Mappen ${IMG_DIR} finnes ikke`);
    process.exit(1);
  }

  // Extract zip file if it exists
  const zipFile = path.join(IMG_DIR, 'Photos (9).zip');
  if (fs.existsSync(zipFile)) {
    console.log('📦 Pakker ut "Photos (9).zip"...');
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
    execFileSync('unzip', ['-o', zipFile, '-d', EXTRACTED_DIR]);
  }

  // Collect all media files
  const allFiles: { filepath: string; filename: string }[] = [];

  // Files from img/ directory (excluding zip and temp dir)
  const imgEntries = fs.readdirSync(IMG_DIR);
  for (const entry of imgEntries) {
    if (entry === '.extracted-temp' || entry.endsWith('.zip')) continue;
    const filepath = path.join(IMG_DIR, entry);
    if (!fs.statSync(filepath).isFile()) continue;
    if (isImage(entry) || isVideo(entry)) {
      allFiles.push({ filepath, filename: entry });
    }
  }

  // Files from extracted zip
  if (fs.existsSync(EXTRACTED_DIR)) {
    const extractedEntries = fs.readdirSync(EXTRACTED_DIR);
    for (const entry of extractedEntries) {
      const filepath = path.join(EXTRACTED_DIR, entry);
      if (!fs.statSync(filepath).isFile()) continue;
      if (isImage(entry) || isVideo(entry)) {
        allFiles.push({ filepath, filename: entry });
      }
    }
  }

  // Sort alphabetically for consistent ordering
  allFiles.sort((a, b) => a.filename.localeCompare(b.filename));

  const images = allFiles.filter((f) => isImage(f.filename));
  const videos = allFiles.filter((f) => isVideo(f.filename));

  console.log(`\n📸 Fant ${images.length} bilder og 🎬 ${videos.length} videoer\n`);

  let order = 1;
  let heroAssetId: string | null = null;

  // Upload images
  for (const { filepath, filename } of images) {
    try {
      console.log(`[${order}/${allFiles.length}] Laster opp bilde: ${filename}`);
      const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
        filename,
      });

      await client.create({
        _type: 'galleryImage',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: filenameToAlt(filename),
        order,
      });

      if (filename === HERO_FILENAME) {
        heroAssetId = asset._id;
        console.log(`   ⭐ Satt som hero-bilde`);
      }

      order++;
    } catch (err) {
      console.error(`   ❌ Feil ved opplasting av ${filename}:`, err);
      order++;
    }
  }

  // Upload videos
  for (const { filepath, filename } of videos) {
    try {
      console.log(`[${order}/${allFiles.length}] Laster opp video: ${filename}`);
      const asset = await client.assets.upload('file', fs.createReadStream(filepath), {
        filename,
      });

      await client.create({
        _type: 'galleryVideo',
        file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
        alt: filenameToAlt(filename),
        order,
      });

      order++;
    } catch (err) {
      console.error(`   ❌ Feil ved opplasting av ${filename}:`, err);
      order++;
    }
  }

  // Create siteSettings
  if (heroAssetId) {
    console.log('\n⚙️  Oppretter siteSettings...');
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroAssetId } },
      heroAlt: 'Gården på Sørumsvegen 50 i kveldssol',
      festivalDate: '2026-08-22T16:00:00.000+02:00',
      tagline: 'Stokkerfestivalen',
      subtitle: '30 år. Halvveis til 60. Det krever en fest.',
      ogTitle: 'Stokkerfestivalen 2026',
      ogDescription:
        'Ole Anders fyller 30 år og det skal feires! Bli med på Stokkerfestivalen 22. august 2026.',
    });
    console.log('   ✅ siteSettings opprettet');
  } else {
    console.warn('⚠️  Hero-bilde ikke funnet — siteSettings ikke opprettet');
  }

  // Cleanup extracted temp dir
  if (fs.existsSync(EXTRACTED_DIR)) {
    fs.rmSync(EXTRACTED_DIR, { recursive: true });
    console.log('\n🧹 Ryddet opp midlertidig mappe');
  }

  console.log(`\n✅ Ferdig! Lastet opp ${images.length} bilder og ${videos.length} videoer.`);
}

main().catch((err) => {
  console.error('❌ Script feilet:', err);
  process.exit(1);
});
