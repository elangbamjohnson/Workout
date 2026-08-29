const { test } = require('@playwright/test');

test.describe('Phase 2 Screenshots', () => {
    test('Capture Day 5 conditioning pill and Day 2/5 warmup video demo buttons', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Desktop
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('/');
        await page.screenshot({ path: `${artifactsDir}/phase2-home-grid-desktop.png` });

        // Day 5 Header & Warmup
        await page.locator('.day-card').nth(4).click();
        const wuCard5 = page.locator('.item-card').first();
        await wuCard5.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/phase2-day5-header-and-warmup-desktop.png` });

        // Mobile
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.screenshot({ path: `${artifactsDir}/phase2-home-grid-mobile.png` });

        await page.locator('.day-card').nth(4).click();
        const wuCard5Mobile = page.locator('.item-card').first();
        await wuCard5Mobile.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/phase2-day5-header-and-warmup-mobile.png` });
    });
});
