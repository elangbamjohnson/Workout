const { test, expect } = require('@playwright/test');

test('Day 4 Power Circuit Check', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Open Day 4
    await page.click('a.day-card:has-text("Upper Body Power")');

    // Wait for view to load
    await expect(page.locator('.app-header')).toHaveText(/Upper Body Power/);

    // Check if Punch Power Circuit is visible
    const pcCard = page.locator('.item-card:has-text("Punch Power Circuit")');
    await expect(pcCard).toBeVisible();

    // Check if Cool Down is visible
    const cdCard = page.locator('.item-card:has-text("Cool Down")');
    await expect(cdCard).toBeVisible();
});
