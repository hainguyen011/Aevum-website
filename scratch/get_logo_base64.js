import fs from 'fs';
import path from 'path';

const logoPath = path.resolve('assets/logos/AevumOS-transparent.png');
const logoBuffer = fs.readFileSync(logoPath);
const base64Logo = logoBuffer.toString('base64');

console.log('Base64 Length:', base64Logo.length);
fs.writeFileSync('scratch/logo_base64.txt', base64Logo, 'utf8');
console.log('Done!');
