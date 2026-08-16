const { test, expect } = require('@playwright/test');

test.describe('Regular 5-Day Program Baseline', () => {
  test('Home screen renders week grid and all 7 day cards', async ({ page }) => {
    await page.goto('/');

    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // Check header (either the title or the logo image)
    await expect(page.locator('.header-title')).toContainText('Strike First');

    // Wait for day cards to render
    const dayCards = page.locator('.day-card');
    await expect(dayCards).toHaveCount(7);
    
    // Check Day 1 is visible
    await expect(dayCards.first()).toContainText('DAY 1');
    await expect(dayCards.nth(6)).toContainText('DAY 7');
  });

  test('Day 1 layout shows warm-up, exercises, and start timer controls', async ({ page }) => {
    await page.goto('/');

    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // Click Day 1
    await page.locator('.day-card').first().click();

    // Verify view has changed to details
    await expect(page.locator('#app-container')).toHaveClass(/is-day-view/);
    await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

    // Verify Header
    await expect(page.locator('.title-page')).toContainText('DAY 1');

    // Verify sections
    await expect(page.locator('text=Warm-up')).toBeVisible();
    await expect(page.locator('text=Heavy Bag')).toBeVisible();
    await expect(page.locator('text=Shadow Boxing')).toBeVisible();

    // Expand the first Heavy Bag round
    await page.locator('.btn-expand').first().click();
    
    // The Start Timer button should appear
    await expect(page.locator('.btn-play.type-bag').first()).toBeVisible();
  });

  test('Prev/next day navigation works and respects bounds', async ({ page }) => {
    await page.goto('/');

    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // Open Day 1
    await page.locator('.day-card').first().click();
    
    // Previous button should be disabled on Day 1
    const prevBtn = page.locator('#btn-prev-day');
    const nextBtn = page.locator('#btn-next-day');
    
    // We check if it has the disabled class
    await expect(prevBtn).toHaveClass(/disabled/);
    await expect(nextBtn).not.toHaveClass(/disabled/);

    // Go to Day 2
    await nextBtn.click();
    await expect(page.locator('.title-page')).toContainText('DAY 2');
    await expect(prevBtn).not.toHaveClass(/disabled/);

    // Close and open Day 7 directly
    // The close button is actually rendering renderHome() natively, but let's just click the header back arrow if it exists, or just call go back
    await page.locator('.header-back-btn').click();
    await page.locator('.day-card').nth(6).click();
    
    await expect(page.locator('.title-page')).toContainText('DAY 7');
    await expect(nextBtn).toHaveClass(/disabled/);
  });

  test('Completing a session logs correctly and updates progress dashboard', async ({ page }) => {
    await page.goto('/');

    // Initially streak should be empty or '0 Days'
    // Depending on what data is pre-populated in localStorage.
    // Let's clear localStorage first to have a clean state.
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // Open Day 1
    await page.locator('.day-card').first().click();

    // Expand warm-up
    await page.locator('.btn-expand').first().click();

    // Click the first checkmark to complete an item
    const firstCheckmark = page.locator('.btn-check').first();
    await firstCheckmark.click();

    // Ensure it gets the 'checked' class
    await expect(firstCheckmark).toHaveClass(/checked/);

    // Close details
    await page.locator('.header-back-btn').click();

    // Check dashboard (session count should be at least 1 now, or streak updated)
    // The UI renders progress stats. Let's check for 'Total Sessions'
    const totalSessions = page.locator('.stat-value').first();
    await expect(totalSessions).toContainText('1');
  });
});
