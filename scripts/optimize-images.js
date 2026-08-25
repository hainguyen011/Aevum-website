import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../assets');

async function processFile(srcPath, destPath, options = { width: 400, quality: 85 }) {
  if (!fs.existsSync(srcPath)) return;
  const beforeSize = (fs.statSync(srcPath).size / 1024).toFixed(1);
  const sharpInstance = sharp(srcPath);
  if (options.width) {
    sharpInstance.resize({ width: options.width, withoutEnlargement: true });
  }
  await sharpInstance.webp({ quality: options.quality || 85, effort: 6 }).toFile(destPath);
  const afterSize = (fs.statSync(destPath).size / 1024).toFixed(1);
  console.log(`✓ ${path.relative(assetsDir, srcPath)} -> ${path.relative(assetsDir, destPath)}: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
}

async function optimizeImages() {
  console.log('[Image Optimizer] Starting comprehensive image compression & WebP conversion...\n');

  // 1. Logos
  await processFile(
    path.join(assetsDir, 'logos/AevumOS-transparent.png'),
    path.join(assetsDir, 'logos/AevumOS-transparent.webp'),
    { width: 512, quality: 90 }
  );

  await processFile(
    path.join(assetsDir, 'logos/Aevum-ascii.png'),
    path.join(assetsDir, 'logos/Aevum-ascii.webp'),
    { width: 800, quality: 85 }
  );

  await processFile(
    path.join(assetsDir, 'I2FLabs-logo.png'),
    path.join(assetsDir, 'I2FLabs-logo.webp'),
    { width: 600, quality: 85 }
  );

  await processFile(
    path.join(assetsDir, 'I2FLabs-logo-black.png'),
    path.join(assetsDir, 'I2FLabs-logo-black.webp'),
    { width: 600, quality: 85 }
  );

  await processFile(
    path.join(assetsDir, 'unikorn-logo.png'),
    path.join(assetsDir, 'unikorn-logo.webp'),
    { width: 400, quality: 85 }
  );

  await processFile(
    path.join(assetsDir, 'unikorn-logo-dark.png'),
    path.join(assetsDir, 'unikorn-logo-dark.webp'),
    { width: 400, quality: 85 }
  );

  await processFile(
    path.join(assetsDir, 'earth2.png'),
    path.join(assetsDir, 'earth2.webp'),
    { width: 1200, quality: 80 }
  );

  // 2. NASA Hubble Space Background
  const nasaJpg = path.join(assetsDir, 'nasa-hubble-space-telescope-k20fpgVfoPE-unsplash.jpg');
  const nasaWebp = path.join(assetsDir, 'nasa-hubble-space-telescope.webp');
  if (fs.existsSync(nasaJpg)) {
    await processFile(nasaJpg, nasaWebp, { width: 1920, quality: 80 });
  }

  // 3. Stickers Subdirectories (An, Luna, Vidus, Zenith)
  const stickersRoot = path.join(assetsDir, 'stickers');
  if (fs.existsSync(stickersRoot)) {
    const dirs = fs.readdirSync(stickersRoot);
    for (const d of dirs) {
      const dirPath = path.join(stickersRoot, d);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          if (file.endsWith('.png')) {
            const pngPath = path.join(dirPath, file);
            const webpPath = path.join(dirPath, file.replace(/\.png$/, '.webp'));
            await processFile(pngPath, webpPath, { width: 400, quality: 85 });
          }
        }
      }
    }
  }

  // 4. Head Gif (9.69 MB Animated GIF -> Highly Optimized Animated WebP)
  const headGif = path.join(assetsDir, 'head.gif');
  const headWebp = path.join(assetsDir, 'head.webp');
  if (fs.existsSync(headGif)) {
    const beforeSize = (fs.statSync(headGif).size / 1024 / 1024).toFixed(2);
    try {
      await sharp(headGif, { animated: true })
        .resize({ width: 320, withoutEnlargement: true })
        .webp({ quality: 50, effort: 5 })
        .toFile(headWebp);
      const afterSize = (fs.statSync(headWebp).size / 1024).toFixed(1);
      console.log(`✓ Converted Head GIF: ${beforeSize} MB -> ${afterSize} KB (Animated WebP)`);
    } catch (err) {
      console.warn('Animated WebP conversion note:', err.message);
    }
  }

  console.log('\n✨ [Image Optimizer] Comprehensive optimization complete!\n');
}

optimizeImages().catch(console.error);

