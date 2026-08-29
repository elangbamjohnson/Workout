const { test } = require('@playwright/test');

test.describe('Hybrid Boxing: Warm-up Screenshots', () => {
    test('Capture warmup card and timer states', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        await page.setViewportSize({ width: 1200, height: 900 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const wuCard = page.locator('.item-card').filter({ hasText: 'Warm-up' }).first();
        await wuCard.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/hybrid-warmup-card-expanded.png` });

        // Start Warm-up Session
        await wuCard.locator('button:has-text("Start Warm-up Session")').click();
        await page.waitForTimeout(6500);

        // Screenshot Drill 1: Jump Rope
        await page.screenshot({ path: `${artifactsDir}/hybrid-warmup-timer-drill1.png` });

        // Advance to Drill 2: Jumping Jacks (180s remaining of 300s)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 180 * 1000;
            Timer.tick();
        });
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${artifactsDir}/hybrid-warmup-timer-drill2.png` });

        // Advance to Rest Period
        await page.evaluate(() => {
            Timer.endTime = Date.now() - 1000;
            Timer.tick();
        });
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${artifactsDir}/hybrid-warmup-timer-rest.png` });
    });
});
