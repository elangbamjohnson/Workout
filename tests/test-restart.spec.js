const { test, expect } = require('@playwright/test');

test('Timer sequence can be restarted after cancellation', async ({ page }) => {
  await page.clock.install();
  
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Navigate to HIIT Boxing
  await page.locator('.qs-card').filter({ hasText: 'HIIT Boxing' }).click();
  await page.locator('#btn-confirm-swap').click();
  
  const startFullBtn = page.locator('button', { hasText: 'Start Full Session' });
  
  // 1. Start it the first time
  await startFullBtn.click();
  
  // Verify modal is visible and shows the warmup
  const timerModal = page.locator('.timer-card');
  await expect(timerModal).toBeVisible();
  await expect(timerModal).toContainText('Jump Rope'); // First round of HIIT boxing
  
  // 2. Cancel the timer
  await page.locator('.btn-cancel').click();
  
  // Verify modal is gone
  await expect(timerModal).toBeHidden();
  
  // 3. Start it a SECOND time
  await startFullBtn.click();
  
  // Verify modal appears AGAIN and successfully starts playing
  await expect(timerModal).toBeVisible();
  await expect(timerModal).toContainText('Jump Rope'); // Should restart successfully
});
