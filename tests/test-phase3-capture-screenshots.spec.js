const { test } = require('@playwright/test');

test.describe('Phase 3 Screenshots', () => {
    test('Capture Day 1 & Day 2 Cool Down cards with video demo buttons (Desktop & Mobile)', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Desktop Day 1
        await page.setViewportSize({ width: 1280, height: 1000 });
        await page.goto('/');
        await page.locator('.day-card').first().click();
        const cdCard1 = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard1.locator('.item-header').click();
        await cdCard1.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/phase3-day1-cooldown-desktop.png` });

        // Desktop Day 2
        await page.goto('/');
        await page.locator('.day-card').nth(1).click();
        const cdCard2 = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard2.locator('.item-header').click();
        await cdCard2.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/phase3-day2-cooldown-desktop.png` });

        // Mobile Day 1
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.locator('.day-card').first().click();
        const cdCard1M = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard1M.locator('.item-header').click();
        await cdCard1M.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/phase3-day1-cooldown-mobile.png` });

        // Mobile Day 2
        await page.goto('/');
        await page.locator('.day-card').nth(1).click();
        const cdCard2M = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard2M.locator('.item-header').click();
        await cdCard2M.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/phase3-day2-cooldown-mobile.png` });
    });
});
