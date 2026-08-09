const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function generateOGImage() {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // ── Background ──────────────────────────────────────────
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, W, H);

  // ── Orange icon square (left side) ──────────────────────
  const sqX = 80, sqY = 175, sqSize = 280, sqRadius = 48;
  ctx.fillStyle = '#E8643A';
  ctx.beginPath();
  ctx.moveTo(sqX + sqRadius, sqY);
  ctx.lineTo(sqX + sqSize - sqRadius, sqY);
  ctx.arcTo(sqX + sqSize, sqY, sqX + sqSize, sqY + sqRadius, sqRadius);
  ctx.lineTo(sqX + sqSize, sqY + sqSize - sqRadius);
  ctx.arcTo(sqX + sqSize, sqY + sqSize, sqX + sqSize - sqRadius, sqY + sqSize, sqRadius);
  ctx.lineTo(sqX + sqRadius, sqY + sqSize);
  ctx.arcTo(sqX, sqY + sqSize, sqX, sqY + sqSize - sqRadius, sqRadius);
  ctx.lineTo(sqX, sqY + sqRadius);
  ctx.arcTo(sqX, sqY, sqX + sqRadius, sqY, sqRadius);
  ctx.closePath();
  ctx.fill();

  // ── Boxer icon — white tinted correctly ─────────────────
  const img = await loadImage('./assets/boxer-icon.png');

  // Draw icon into an offscreen canvas to tint it white
  const offscreen = createCanvas(sqSize, sqSize);
  const off = offscreen.getContext('2d');

  // Fill white, then use destination-in to cut out icon shape
  off.fillStyle = '#ffffff';
  off.fillRect(0, 0, sqSize, sqSize);
  off.globalCompositeOperation = 'destination-in';
  const padding = 40;
  off.drawImage(img, padding, padding, sqSize - padding * 2, sqSize - padding * 2);

  // Composite white icon onto orange square
  ctx.drawImage(offscreen, sqX, sqY);

  // ── Text (right of icon) ─────────────────────────────────
  const textX = sqX + sqSize + 60;
  const textY = 210;

  // App name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px Arial, sans-serif';
  ctx.fillText('Strike First', textX, textY);

  // Tagline
  ctx.fillStyle = '#E8643A';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.fillText('Strike Hard. No Mercy.', textX, textY + 80);

  // Divider line
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(textX, textY + 108, 580, 2);

  // Feature bullets
  ctx.fillStyle = '#d1d5db';
  ctx.font = '36px Arial, sans-serif';
  const bullets = [
    '🥊  5-day boxing program',
    '⏱   Round & rest timers',
    '🎥  Video demo every exercise',
    '🔊  Audio coaching prompts',
    '📊  Progress tracking',
  ];
  bullets.forEach((line, i) => {
    ctx.fillText(line, textX, textY + 160 + i * 54);
  });

  // URL watermark bottom right
  ctx.fillStyle = '#4b5563';
  ctx.font = '28px Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('elangbamjohnson.github.io/Workout', W - 60, H - 40);

  // ── Save ─────────────────────────────────────────────────
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./assets/og-image.png', buffer);
  console.log('✅ og-image.png generated (1200×630)');
}

generateOGImage().catch(console.error);
