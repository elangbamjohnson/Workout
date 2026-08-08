const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const bgColor = { r: 232, g: 100, b: 58, alpha: 1 };

async function generateIcons() {
  for (const size of sizes) {
    const iconSize = Math.round(size * 0.65);
    const padding = Math.round((size - iconSize) / 2);

    await sharp('./assets/boxer-icon.png')
      .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .flatten({ background: bgColor })
      .extend({
        top: padding, bottom: padding,
        left: padding, right: padding,
        background: bgColor
      })
      .toFile(`./assets/icon-${size}.png`);

    console.log(`Generated icon-${size}.png`);
  }
}

generateIcons();
