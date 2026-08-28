const { test, expect } = require('@playwright/test');

test.describe('Top Right Header Navigation Day 1-5 Boundary Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Header arrows: Day 1 left is disabled, Day 5 right is disabled', async ({ page }) => {
        // Go to Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 1');

        const prevBtn = page.locator('.nav-arrow-btn[aria-label="Previous day"]');
        const nextBtn = page.locator('.nav-arrow-btn[aria-label="Next day"]');

        // Day 1: Prev disabled, Next enabled
        await expect(prevBtn).toBeDisabled();
        await expect(nextBtn).toBeEnabled();

        // Navigate 1 -> 2 -> 3 -> 4 -> 5
        await nextBtn.click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 2');
        await expect(prevBtn).toBeEnabled();
        await expect(nextBtn).toBeEnabled();

        await nextBtn.click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 3');
        await expect(prevBtn).toBeEnabled();
        await expect(nextBtn).toBeEnabled();

        await nextBtn.click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 4');
        await expect(prevBtn).toBeEnabled();
        await expect(nextBtn).toBeEnabled();

        await nextBtn.click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 5');

        // Day 5: Prev enabled, Next disabled
        await expect(prevBtn).toBeEnabled();
        await expect(nextBtn).toBeDisabled();

        // Clicking Next on Day 5 does not change page or navigate to Day 6
        await nextBtn.click({ force: true });
        await expect(page.locator('.nav-day-title')).toContainText('Day 5');

        // Clicking Prev on Day 5 goes back to Day 4
        await prevBtn.click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 4');
    });
});
