const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'assets', 'logos', 'AevumOS-transparent.png');
const dest = path.join(__dirname, '..', 'public', 'favicon.png');

try {
  // Ensure public directory exists
  const publicDir = path.dirname(dest);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy file
  fs.copyFileSync(source, dest);
  console.log('Successfully copied AevumOS-transparent.png to public/favicon.png!');
} catch (err) {
  console.error('Failed to copy file:', err);
  process.exit(1);
}
