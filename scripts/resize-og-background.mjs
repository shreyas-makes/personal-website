import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node scripts/resize-og-background.mjs <path-to-image>');
  process.exit(1);
}

const outputPath = path.resolve('public/images/og/serene-forest.jpg');

await mkdir(path.dirname(outputPath), { recursive: true });

await sharp(inputPath)
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(outputPath);

console.log(`Wrote ${outputPath}`);
