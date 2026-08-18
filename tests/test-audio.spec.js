const { test, expect } = require('@playwright/test');

test('Audio queue diagnosis full sequence', async ({ page }) => {
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('[AUDIO]') || msg.text().includes('[TRACE]')) {
      logs.push(msg.text().replace('[AUDIO] speakAlert called with: ', ''));
      console.log(msg.text());
    }
  });

  // Install mock clock BEFORE navigation
  await page.clock.install();

  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Intercept speakAlert
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

  // Wait for the modal and first tick
  // Fast forward 26 minutes (1560 seconds) in 1-second chunks
  // Yield to event loop to allow Playwright to collect console logs and microtasks to settle
  for (let i = 0; i < 1560; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }

  // Verify that we got audio logs!
  console.log(`Captured ${logs.length} audio logs!`);
  
  // Verify specific logs exist
  const joinedLogs = logs.join('\\n');
  expect(joinedLogs).toContain("Alright, let's go. HIIT Boxing");
  expect(joinedLogs).toContain("Round one — POWER.");
  expect(joinedLogs).toContain("That's Tabata — DONE!");
  expect(joinedLogs).toContain("Circuit round one.");
  expect(joinedLogs).toContain("And that's HIIT Boxing — complete.");
});
