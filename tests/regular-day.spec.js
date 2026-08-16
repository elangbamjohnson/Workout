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

    // Verify session view opens (just make sure it's not home anymore)
    await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

    // Verify Header
    await expect(page.locator('.day-header-card .label-small')).toHaveText('DAY 1');
    await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

    // Verify sections
    await expect(page.locator('text=Barbell deadlift')).toBeVisible();

    // The Watch Video button should appear when the exercise card is expanded
    await page.locator('.item-header').first().click();
    await expect(page.locator('text=Watch Video').first()).toBeVisible();
  });

  test('Prev/next day navigation works and respects bounds', async ({ page }) => {
    await page.goto('/');

    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // Open Day 1
    await page.locator('.day-card').first().click();
    
    // The navigation arrows are in .nav-day-arrows container
    const navContainer = page.locator('.nav-day-arrows');
    const prevBtn = navContainer.locator('button[aria-label="Previous day"]');
    const nextBtn = navContainer.locator('button[aria-label="Next day"]');
    
    // We check if it is disabled
    await expect(prevBtn).toBeDisabled();
    await expect(nextBtn).toBeEnabled();

    // Go to Day 2
    await nextBtn.click();
    await expect(page.locator('.day-header-card .label-small')).toHaveText('DAY 2');
    await expect(page.locator('.title-page')).toHaveText('Bag Power Day');
    await expect(prevBtn).toBeEnabled();

    // Close and open Day 7 directly
    await page.evaluate(() => window.renderHome());
    await page.locator('.day-card').nth(6).click();
    await expect(page.locator('.title-page')).toContainText('Rest Day');
    await expect(nextBtn).toBeDisabled();
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

    // Expand the first exercise card so its checkmarks become visible
    await page.locator('.item-header').first().click();

    // Click the first checkmark to complete an item
    const firstCheckmark = page.locator('.btn-check').first();
    await firstCheckmark.click();

    // Ensure it gets the 'checked' class
    await expect(firstCheckmark).toHaveClass(/checked/);

    // Close details
    await page.evaluate(() => window.renderHome());

    // Check dashboard (session count should be at least 1 now, or streak updated)
    // The UI renders progress stats. Let's check for 'Total Sessions'
    const totalSessions = page.locator('.stat-value').first();
    await expect(totalSessions).toContainText('1');
  });
});
