const { test, expect } = require('@playwright/test');

test('Dismissing continuous sequence completely cancels future audio', async ({ page }) => {
  const allLogs = [];
  page.on('console', msg => {
    if (msg.text().includes('[AUDIO]')) {
      allLogs.push(msg.text().replace('[AUDIO] speakAlert called with: ', ''));
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

  await page.locator('.qs-card').filter({ hasText: 'HIIT Boxing' }).click();
  await page.locator('#btn-confirm-swap').click();

  const startFullBtn = page.locator('button', { hasText: 'Start Full Session' });
  await startFullBtn.click();

  // Fast forward 30 seconds to get into the warmup
  for (let i = 0; i < 30; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }

  const logsBeforeCancel = [...allLogs];
  expect(logsBeforeCancel.length).toBeGreaterThan(0);

  // Cancel the session using the Escape key, which timer.js listens for
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);

  const logsAtCancel = [...allLogs];

  // Now fast forward 25 minutes (1500 seconds)
  for (let i = 0; i < 1500; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(2);
  }

  // Verify no new logs were added after cancellation
  expect(allLogs.length).toEqual(logsAtCancel.length);
});
