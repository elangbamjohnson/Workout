const { test } = require('@playwright/test');

test.describe('Hybrid Boxing: Circuit Screenshot', () => {
    test('Capture Conditioning Circuit Expanded & Rest Modal', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        
        await page.setViewportSize({ width: 1200, height: 900 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' }).first();
        await circCard.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/hybrid-circuit-card-expanded.png` });

        // Check 3 items to trigger rest modal
        const rows = circCard.locator('.nested-row');
        await rows.nth(0).locator('.btn-check').click();
        await rows.nth(1).locator('.btn-check').click();
        await rows.nth(2).locator('.btn-check').click();

        await page.waitForTimeout(500);
        await page.screenshot({ path: `${artifactsDir}/hybrid-circuit-rest-modal.png` });
    });
});
