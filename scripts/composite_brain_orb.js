import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const width = 736;
const height = 414;

const svgText = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <style>
    .tech-label {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13.5px;
      font-weight: 500;
      letter-spacing: 0.03em;
      fill: #ffffff;
      text-anchor: middle;
      dominant-baseline: central;
      filter: url(#glow);
    }
  </style>
  
  <!-- Top: Autonomous Memory -->
  <text x="368" y="78" class="tech-label">autonomous memory</text>
  
  <!-- Left: Squad Orchestration -->
  <text x="204" y="148" class="tech-label">squad orchestration</text>
  
  <!-- Right: Deep Research -->
  <text x="542" y="148" class="tech-label">deep research</text>
</svg>
`);

const inputPath = path.join(__dirname, '..', 'assets', 'aevum_brain_orb_transparent.webp');
const outputPath = path.join(__dirname, '..', 'assets', 'aevum_brain_hub.webp');

sharp(inputPath)
  .composite([{ input: svgText, top: 0, left: 0 }])
  .webp({ quality: 95, alphaQuality: 100 })
  .toFile(outputPath)
  .then(info => console.log('Successfully generated aevum_brain_hub.webp:', info))
  .catch(err => console.error('Error generating image:', err));
