const { test } = require('@playwright/test');

test.describe('Hybrid Boxing: Bag Work Screenshots', () => {
    test('Capture Bag Work Card & Timer modal with active combo highlight', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Desktop
        await page.setViewportSize({ width: 1200, height: 900 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // 1. Expanded Bag Work Card
        const bagCard = page.locator('.item-card').filter({ hasText: 'Bag Work' }).first();
        await bagCard.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/hybrid-bag-work-card-expanded.png` });

        // 2. Start Round 1 Timer & wait for work phase
        const round1 = bagCard.locator('.nested-row').nth(0);
        await round1.locator('.btn-check').click();

        // Wait 6s for countdown to finish and work phase to start
        await page.waitForTimeout(6000);
        await page.screenshot({ path: `${artifactsDir}/hybrid-bag-round1-timer-work.png` });
    });
});
