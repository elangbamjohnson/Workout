// Uses 'canvas' npm package
// npm install canvas

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function generateOGImage() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 1200, 630);

  // Orange icon background square
  const iconX = 80, iconY = 215, iconSize = 200, radius = 32;
  ctx.fillStyle = '#E8643A';
  ctx.beginPath();
  ctx.roundRect(iconX, iconY, iconSize, iconSize, radius);
  ctx.fill();

  // Boxer icon (white)
  const img = await loadImage('./assets/boxer-icon.png');
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  // Draw white boxer icon
  const iSize = 130;
  const iX = iconX + (iconSize - iSize) / 2;
  const iY = iconY + (iconSize - iSize) / 2;
  ctx.drawImage(img, iX, iY, iSize, iSize);
  // Tint white using compositing
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'white';
  ctx.fillRect(iX, iY, iSize, iSize);
  ctx.restore();

  // App name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px -apple-system, Arial, sans-serif';
  ctx.fillText('Strike First', 320, 290);

  // Tagline
  ctx.fillStyle = '#E8643A';
  ctx.font = '36px -apple-system, Arial, sans-serif';
  ctx.fillText('Strike Hard. No Mercy.', 320, 350);

  // Description
  ctx.fillStyle = '#6b7280';
  ctx.font = '28px -apple-system, Arial, sans-serif';
  ctx.fillText('Free 5-day boxing power & conditioning program', 320, 410);

  // URL watermark
  ctx.fillStyle = '#374151';
  ctx.font = '22px -apple-system, Arial, sans-serif';
  ctx.fillText('elangbamjohnson.github.io/Workout', 320, 580);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./assets/og-image.png', buffer);
  console.log('Generated og-image.png (1200x630)');
}

generateOGImage();
