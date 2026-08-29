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

test('Screenshot Hybrid Boxing Round 1 Rest Modal', async ({ page }) => {
  await page.clock.install();

  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
  await page.locator('#btn-confirm-swap').click();

  const bagCard = page.locator('.item-card').filter({ hasText: 'Bag Work' });
  await bagCard.locator('.item-header').click();

  const round1 = bagCard.locator('.nested-row').filter({ hasText: 'Basic Power Combinations' });
  await round1.locator('.btn-check').click();

  const timerModal = page.locator('#timer-modal');
  await expect(timerModal).toBeVisible();

  // Fast forward through 5s countdown + 180s work + 5s into rest
  for (let i = 0; i < 190; i++) {
      await page.clock.fastForward('00:01');
      await page.waitForTimeout(5);
  }

  // Wait for the modal to settle
  await page.waitForTimeout(500);

  // Take a screenshot of the entire timer modal and save it to the artifacts directory
  await timerModal.screenshot({ path: '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/c036ac54-95ed-4221-9d52-924c7baed996/hybrid_rest_modal.png' });
});
