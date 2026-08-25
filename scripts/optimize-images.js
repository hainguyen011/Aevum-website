import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../assets');
const publicLogosDir = path.resolve(__dirname, '../public/assets/logos');

async function processFile(srcPath, destPath, options = { width: 400, quality: 80 }) {
  if (!fs.existsSync(srcPath)) return;
  const inputBuffer = fs.readFileSync(srcPath);
  const beforeSize = (inputBuffer.length / 1024).toFixed(1);
  const sharpInstance = sharp(inputBuffer);
  if (options.width) {
    sharpInstance.resize({ width: options.width, withoutEnlargement: true });
  }
  const outputBuffer = await sharpInstance.webp({ quality: options.quality || 80, effort: 6 }).toBuffer();
  fs.writeFileSync(destPath, outputBuffer);
  const afterSize = (outputBuffer.length / 1024).toFixed(1);
  console.log(`✓ ${path.relative(assetsDir, srcPath)} -> ${path.relative(assetsDir, destPath)}: ${beforeSize} KB -> ${afterSize} KB (WebP)`);
}

async function optimizeImages() {
  console.log('[Image Optimizer] Starting comprehensive image compression & WebP conversion...\n');

  if (!fs.existsSync(publicLogosDir)) {
    fs.mkdirSync(publicLogosDir, { recursive: true });
  }

  // 1. Logos
  await processFile(
    path.join(assetsDir, 'logos/AevumOS-transparent.png'),
    path.join(assetsDir, 'logos/AevumOS-transparent.webp'),
    { width: 128, quality: 80 }
  );
  fs.copyFileSync(
    path.join(assetsDir, 'logos/AevumOS-transparent.webp'),
    path.join(publicLogosDir, 'AevumOS-transparent.webp')
  );

  await processFile(
    path.join(assetsDir, 'logos/Aevum-ascii.png'),
    path.join(assetsDir, 'logos/Aevum-ascii.webp'),
    { width: 440, quality: 80 }
  );
  fs.copyFileSync(
    path.join(assetsDir, 'logos/Aevum-ascii.webp'),
    path.join(publicLogosDir, 'Aevum-ascii.webp')
  );

  await processFile(
    path.join(assetsDir, 'I2FLabs-logo.png'),
    path.join(assetsDir, 'I2FLabs-logo.webp'),
    { width: 320, quality: 80 }
  );

  await processFile(
    path.join(assetsDir, 'I2FLabs-logo-black.png'),
    path.join(assetsDir, 'I2FLabs-logo-black.webp'),
    { width: 320, quality: 80 }
  );

  await processFile(
    path.join(assetsDir, 'unikorn-logo.png'),
    path.join(assetsDir, 'unikorn-logo.webp'),
    { width: 96, quality: 80 }
  );

  await processFile(
    path.join(assetsDir, 'unikorn-logo-dark.png'),
    path.join(assetsDir, 'unikorn-logo-dark.webp'),
    { width: 96, quality: 80 }
  );

  await processFile(
    path.join(assetsDir, 'earth2.png'),
    path.join(assetsDir, 'earth2.webp'),
    { width: 600, quality: 75 }
  );

  // 2. Stickers Subdirectories (An, Luna, Vidus, Zenith)
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
            await processFile(pngPath, webpPath, { width: 220, quality: 78 });
          }
        }
      }
    }
  }

  // 3. Agent Avatars
  const avatarDir = path.join(assetsDir, 'agent-avatar');
  if (fs.existsSync(avatarDir)) {
    const avatars = ['an_avatar.webp', 'luna_avatar.webp', 'vidus_avatar.webp', 'zenith_avatar.webp'];
    for (const av of avatars) {
      const avPath = path.join(avatarDir, av);
      if (fs.existsSync(avPath)) {
        await processFile(avPath, avPath, { width: 320, quality: 75 });
      }
    }
  }

  // 4. Head Animated Brain (Resize to 200px width & compress to drastically cut payload)
  const headGif = path.join(assetsDir, 'head.gif');
  const headWebp = path.join(assetsDir, 'head.webp');
  if (fs.existsSync(headGif)) {
    const beforeSize = (fs.statSync(headGif).size / 1024 / 1024).toFixed(2);
    try {
      const gifBuffer = fs.readFileSync(headGif);
      const webpBuffer = await sharp(gifBuffer, { animated: true })
        .resize({ width: 200, withoutEnlargement: true })
        .webp({ quality: 30, effort: 6 })
        .toBuffer();
      fs.writeFileSync(headWebp, webpBuffer);
      const afterSize = (webpBuffer.length / 1024).toFixed(1);
      console.log(`✓ Converted Head GIF: ${beforeSize} MB -> ${afterSize} KB (Animated WebP)`);
    } catch (err) {
      console.warn('Animated WebP conversion note:', err.message);
    }
  }

  // Clean up any tmp files if present
  const tmpFile = path.join(assetsDir, 'agent-avatar/tmp_an_avatar.webp');
  if (fs.existsSync(tmpFile)) {
    try { fs.unlinkSync(tmpFile); } catch (_) {}
  }

  console.log('\n✨ [Image Optimizer] Comprehensive optimization complete!\n');
}

optimizeImages().catch(console.error);
