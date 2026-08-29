const { test } = require('@playwright/test');

test.describe('Hybrid Boxing: Punch Power Primer Screenshots', () => {
    test('Capture Punch Power Primer collapsed & expanded in Desktop and Mobile', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // 1. Desktop - Hybrid Boxing Collapsed view
        await page.setViewportSize({ width: 1200, height: 900 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        await page.screenshot({ path: `${artifactsDir}/hybrid-primer-desktop-overview.png` });

        // 2. Desktop - Punch Power Primer expanded showing all 3 exercise cells
        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await primerCard.locator('.item-header').click();

        await page.screenshot({ path: `${artifactsDir}/hybrid-primer-all-3-cells.png` });

        // 2b. Desktop - Warm-up expanded showing standardized hybrid-row layout
        await primerCard.locator('.item-header').click(); // collapse primer
        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' }).first();
        await warmupCard.locator('.item-header').click();

        await page.screenshot({ path: `${artifactsDir}/hybrid-warmup-standardized.png` });

        // 3. Mobile - iPhone 14 (390px)
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        if (await swapBtn.isVisible()) await swapBtn.click();

        const primerCardMobile = page.locator('.item-card[data-id="hybrid-primer"]');
        await primerCardMobile.locator('.item-header').click();
        const ex1Mobile = primerCardMobile.locator('.nested-list > .nested-row').nth(0);
        await ex1Mobile.locator('[role="button"]').first().click();

        await page.screenshot({ path: `${artifactsDir}/hybrid-primer-mobile-390px.png` });
    });
});
