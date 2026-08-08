const sharp = require('sharp');

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const iconSize = Math.round(size * 0.62);
    const padding = Math.floor((size - iconSize) / 2);

    // Create orange background canvas at EXACT size
    const background = {
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 232, g: 100, b: 58, alpha: 255 }
      }
    };

    // Resize boxer icon to fit inside with padding
    const boxerResized = await sharp('./assets/boxer-icon.png')
      .resize(iconSize, iconSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      // Make it white
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toBuffer();

    // Composite onto orange background at exact size
    await sharp(background)
      .composite([{
        input: boxerResized,
        top: padding,
        left: padding
      }])
      .resize(size, size)   // force exact output size
      .png()
      .toFile(`./assets/icon-${size}.png`);

    // Verify
    const meta = await sharp(`./assets/icon-${size}.png`).metadata();
    console.log(`icon-${size}.png → ${meta.width}×${meta.height}px ✅`);
  }
}

generateIcons().catch(console.error);
