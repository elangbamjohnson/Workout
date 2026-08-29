const { test } = require('@playwright/test');

test.describe('Phase 4 Multi-Device Audit Screenshots', () => {
    test('Capture Home & Days across iPhone SE (375px), iPhone 14 (390px), Pixel 7 (412px)', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // 1. iPhone SE (375px) - Home Grid
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.screenshot({ path: `${artifactsDir}/phase4-home-iphone-se-375px.png` });

        // 2. iPhone SE (375px) - Day 1 with Warmup & Cooldown
        await page.locator('.day-card').first().click();
        const toggleBtn1 = page.locator('.content-header-row .btn-nav');
        if (await toggleBtn1.isVisible()) await toggleBtn1.click();
        await page.screenshot({ path: `${artifactsDir}/phase4-day1-iphone-se-375px.png` });

        // 3. iPhone 14 (390px) - Day 2 with Warmup & Cooldown
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.locator('.day-card').nth(1).click();
        const toggleBtn2 = page.locator('.content-header-row .btn-nav');
        if (await toggleBtn2.isVisible()) await toggleBtn2.click();
        await page.screenshot({ path: `${artifactsDir}/phase4-day2-iphone-14-390px.png` });

        // 4. Pixel 7 (412px) - Day 5 Conditioning
        await page.setViewportSize({ width: 412, height: 915 });
        await page.goto('/');
        await page.locator('.day-card').nth(4).click();
        const toggleBtn5 = page.locator('.content-header-row .btn-nav');
        if (await toggleBtn5.isVisible()) await toggleBtn5.click();
        await page.screenshot({ path: `${artifactsDir}/phase4-day5-pixel-7-412px.png` });
    });
});
