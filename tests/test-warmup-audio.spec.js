const { test, expect } = require('@playwright/test');

test('Warmup Voice Prompt - Regular Day (Day 1)', async ({ page }) => {
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('[AUDIO]')) {
      logs.push(msg.text().replace('[AUDIO] speakAlert called with: ', ''));
    }
  });

  await page.clock.install();
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.evaluate(() => {
    const originalSpeak = window.speakAlert;
    window.speakAlert = function(text) {
      console.log(`[AUDIO] speakAlert called with: ${text}`);
      originalSpeak(text);
    };
  });

  // Open Day 1
  await page.locator('.day-card').filter({ hasText: 'Day 1' }).click();
  
  // Expand Warm-up card
  await page.locator('.item-card').filter({ hasText: 'Warm-up' }).first().locator('.item-header').click();
  
  // Click Jump Rope Play
  const warmupRow = page.locator('.nested-row').filter({ hasText: 'Jump Rope' }).first();
  await warmupRow.locator('.btn-play').click();

  // Fast forward the 5s countdown
  for (let i = 0; i < 6; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }

  const joinedLogs = logs.join('\n');
  expect(joinedLogs).toContain("Jump Rope started. Go! This will last three minutes. Easy pace — this is activation, not cardio");
});

test('Warmup Voice Prompt - Quick Session (Shadow Boxing)', async ({ page }) => {
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('[AUDIO]')) {
      logs.push(msg.text().replace('[AUDIO] speakAlert called with: ', ''));
    }
  });

  await page.clock.install();
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.evaluate(() => {
    const originalSpeak = window.speakAlert;
    window.speakAlert = function(text) {
      console.log(`[AUDIO] speakAlert called with: ${text}`);
      originalSpeak(text);
    };
  });

  // Open Shadow Boxing
  await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).click();
  await page.locator('#btn-confirm-swap').click();
  
  // Expand Warm-up card
  await page.locator('.item-card').filter({ hasText: 'Warm-up' }).first().locator('.item-header').click();
  
  const warmupRow = page.locator('.nested-row').filter({ hasText: 'Shoulder Circles' }).first();
  await warmupRow.locator('.btn-play').click();

  // Fast forward the 5s countdown
  for (let i = 0; i < 6; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }

  const joinedLogs = logs.join('\n');
  expect(joinedLogs).toContain("Shoulder Circles started. Go! This will last thirty seconds. Big circles, loosen the shoulder joint");
});
