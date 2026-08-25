import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../assets');

async function optimizeImages() {
  console.log('[Image Optimizer] Starting heavy image compression & WebP conversion...\n');

  // 1. NASA Hubble Space Background (9.95 MB -> WebP)
  const nasaJpg = path.join(assetsDir, 'nasa-hubble-space-telescope-k20fpgVfoPE-unsplash.jpg');
  const nasaWebp = path.join(assetsDir, 'nasa-hubble-space-telescope.webp');
  if (fs.existsSync(nasaJpg)) {
    const beforeSize = (fs.statSync(nasaJpg).size / 1024 / 1024).toFixed(2);
    await sharp(nasaJpg)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(nasaWebp);
    const afterSize = (fs.statSync(nasaWebp).size / 1024).toFixed(1);
    console.log(`✓ Converted NASA Hubble: ${beforeSize} MB -> ${afterSize} KB (WebP)`);
  }

  // 2. Unikorn Logo Dark (1.06 MB -> WebP)
  const unikornDarkPng = path.join(assetsDir, 'unikorn-logo-dark.png');
  const unikornDarkWebp = path.join(assetsDir, 'unikorn-logo-dark.webp');
  if (fs.existsSync(unikornDarkPng)) {
    const beforeSize = (fs.statSync(unikornDarkPng).size / 1024).toFixed(1);
    await sharp(unikornDarkPng)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(unikornDarkWebp);
    const afterSize = (fs.statSync(unikornDarkWebp).size / 1024).toFixed(1);
    console.log(`✓ Converted Unikorn Dark Logo: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
  }

  // 3. Earth2 (630 KB -> WebP)
  const earthPng = path.join(assetsDir, 'earth2.png');
  const earthWebp = path.join(assetsDir, 'earth2.webp');
  if (fs.existsSync(earthPng)) {
    const beforeSize = (fs.statSync(earthPng).size / 1024).toFixed(1);
    await sharp(earthPng)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(earthWebp);
    const afterSize = (fs.statSync(earthWebp).size / 1024).toFixed(1);
    console.log(`✓ Converted Earth2: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
  }

  // 4. Head Gif (9.69 MB Animated GIF -> Animated WebP)
  const headGif = path.join(assetsDir, 'head.gif');
  const headWebp = path.join(assetsDir, 'head.webp');
  if (fs.existsSync(headGif)) {
    const beforeSize = (fs.statSync(headGif).size / 1024 / 1024).toFixed(2);
    try {
      await sharp(headGif, { animated: true })
        .webp({ quality: 75, effort: 4 })
        .toFile(headWebp);
      const afterSize = (fs.statSync(headWebp).size / 1024).toFixed(1);
      console.log(`✓ Converted Head GIF: ${beforeSize} MB -> ${afterSize} KB (Animated WebP)`);
    } catch (err) {
      console.warn('Animated WebP conversion note:', err.message);
    }
  }

  // 5. I2FLabs Logo Black (1.37 MB -> WebP)
  const i2fBlackPng = path.join(assetsDir, 'I2FLabs-logo-black.png');
  const i2fBlackWebp = path.join(assetsDir, 'I2FLabs-logo-black.webp');
  if (fs.existsSync(i2fBlackPng)) {
    const beforeSize = (fs.statSync(i2fBlackPng).size / 1024).toFixed(1);
    await sharp(i2fBlackPng)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(i2fBlackWebp);
    const afterSize = (fs.statSync(i2fBlackWebp).size / 1024).toFixed(1);
    console.log(`✓ Converted I2FLabs Logo Black: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
  }

  // 6. Aevum-ascii Logo (788 KB -> WebP)
  const asciiPng = path.join(assetsDir, 'logos/Aevum-ascii.png');
  const asciiWebp = path.join(assetsDir, 'logos/Aevum-ascii.webp');
  if (fs.existsSync(asciiPng)) {
    const beforeSize = (fs.statSync(asciiPng).size / 1024).toFixed(1);
    await sharp(asciiPng)
      .webp({ quality: 85 })
      .toFile(asciiWebp);
    const afterSize = (fs.statSync(asciiWebp).size / 1024).toFixed(1);
    console.log(`✓ Converted Aevum ASCII: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
  }

  // 7. Stickers (Luna_Lover, Vidus_Hipe, Zenith_Curios)
  const stickers = ['Luna_Lover.png', 'Vidus_Hipe.png', 'Zenith_Curios.png'];
  for (const file of stickers) {
    const stickerPath = path.join(assetsDir, 'stickers', file);
    const webpPath = stickerPath.replace('.png', '.webp');
    if (fs.existsSync(stickerPath)) {
      const beforeSize = (fs.statSync(stickerPath).size / 1024).toFixed(1);
      await sharp(stickerPath)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpPath);
      const afterSize = (fs.statSync(webpPath).size / 1024).toFixed(1);
      console.log(`✓ Converted Sticker ${file}: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
    }
  }

  console.log('\n✨ [Image Optimizer] Image optimization complete!\n');
}

optimizeImages().catch(console.error);
