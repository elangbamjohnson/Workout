const { test } = require('@playwright/test');

test('Capture Day 3 Warmup active timer and rest timer screenshots (Desktop & Mobile)', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Navigate to Day 3
    await page.locator('.day-card').nth(2).click();

    // Expand Dynamic Warm-Up
    const sec1Card = page.locator('.item-card[data-id="day3-sec1"]');
    await sec1Card.locator('.item-header').click();

    // Start timer
    await sec1Card.locator('button.btn-large').click();

    // Fast-forward countdown into work phase
    await page.waitForTimeout(6500);

    // Capture desktop work phase screenshot
    await page.screenshot({ path: '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-warmup-work-desktop.png' });

    // Transition to rest phase
    await page.locator('#timer-modal button.btn-large', { hasText: 'Finish Workout' }).click();
    await page.waitForTimeout(500);

    // Capture desktop rest phase screenshot
    await page.screenshot({ path: '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-warmup-rest-desktop.png' });

    // Close timer
    await page.locator('#timer-modal .btn-cancel').click();

    // Mobile (375x812)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.locator('.day-card').nth(2).click();

    const sec1CardMobile = page.locator('.item-card[data-id="day3-sec1"]');
    await sec1CardMobile.locator('.item-header').click();
    await sec1CardMobile.locator('button.btn-large').click();

    await page.waitForTimeout(6500);
    await page.screenshot({ path: '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-warmup-work-mobile.png' });

    await page.locator('#timer-modal button.btn-large', { hasText: 'Finish Workout' }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-warmup-rest-mobile.png' });
});
