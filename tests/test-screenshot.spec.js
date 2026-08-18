const { test, expect } = require('@playwright/test');

test('Screenshot HIIT Boxing round 1 timer modal', async ({ page }) => {
  await page.clock.install();

  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.locator('.qs-card').filter({ hasText: 'HIIT Boxing' }).click();
  await page.locator('#btn-confirm-swap').click();
  await page.locator('button', { hasText: 'Start Full Session' }).click();

  // Fast forward into the first Tabata round (60s warmup + 60s arm circles + 5s countdown + 5s into round = 130s)
  for (let i = 0; i < 130; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }
  
  // Wait for the modal to settle
  await page.waitForTimeout(500);

  // Take a screenshot of the entire timer modal
  const modal = page.locator('#timer-modal');
  await modal.screenshot({ path: 'timer-modal-hiit-round-1.png' });

  // Assert that BOTH the combo container and the cue text exist
  const hasComboContainer = await modal.locator('.timer-cue-container').isVisible();
  const hasCueText = await modal.locator('.timer-cue').isVisible();
  const comboText = await modal.locator('.timer-cue-container').innerText();
  const cueText = await modal.locator('.timer-cue').innerText();

  console.log('Combo Visible?', hasComboContainer, 'Text:', comboText);
  console.log('Caption Visible?', hasCueText, 'Text:', cueText);

  expect(hasComboContainer).toBeTruthy();
  expect(hasCueText).toBeTruthy();
});
