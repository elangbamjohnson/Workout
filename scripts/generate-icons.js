const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const iconSize = Math.round(size * 0.62);
    const padding = Math.floor((size - iconSize) / 2);

    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Orange background
    ctx.fillStyle = '#E8643A';
    ctx.fillRect(0, 0, size, size);

    // Boxer icon (white)
    const img = await loadImage('./assets/boxer-icon.png');
    
    // Draw icon into an offscreen canvas to tint it white
    const offscreen = createCanvas(iconSize, iconSize);
    const off = offscreen.getContext('2d');

    // Fill white, then use destination-in to cut out icon shape
    off.fillStyle = '#ffffff';
    off.fillRect(0, 0, iconSize, iconSize);
    off.globalCompositeOperation = 'destination-in';
    off.drawImage(img, 0, 0, iconSize, iconSize);

    // Composite white icon onto orange square
    ctx.drawImage(offscreen, padding, padding);

    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./assets/icon-${size}.png`, buffer);
    fs.writeFileSync(`./assets/icon-${size}-maskable.png`, buffer);
    
    console.log(`icon-${size}.png & icon-${size}-maskable.png generated`);
  }
}

generateIcons().catch(console.error);
