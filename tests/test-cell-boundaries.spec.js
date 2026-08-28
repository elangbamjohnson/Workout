const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Cell Boundary Distinction Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify cell boundaries on Day 4 and Day 5', async ({ page }) => {
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Check Day 4
        await page.locator('.day-card').nth(3).click();
        await page.locator('.content-header-row .btn-nav').click(); // Expand all

        const warmupRowDay4 = page.locator('.warmup-hybrid-row').first();
        const setRowDay4 = page.locator('.set-row').first();
        const nestedRowDay4 = page.locator('.nested-row').first();

        // Check border style is visible (not transparent)
        const warmupBorderD4 = await warmupRowDay4.evaluate(el => window.getComputedStyle(el).borderColor);
        const setBorderD4 = await setRowDay4.evaluate(el => window.getComputedStyle(el).borderColor);
        const nestedBorderD4 = await nestedRowDay4.evaluate(el => window.getComputedStyle(el).borderColor);

        expect(warmupBorderD4).toBe('rgba(255, 255, 255, 0.1)');
        expect(setBorderD4).toBe('rgba(255, 255, 255, 0.1)');
        expect(nestedBorderD4).toBe('rgba(255, 255, 255, 0.1)');

        await page.screenshot({ path: path.join(outDir, 'day4-distinct-cells-desktop.png'), fullPage: true });

        // Navigate back and Check Day 5
        await page.goto('/');
        await page.locator('.day-card').nth(4).click();
        await page.locator('.content-header-row .btn-nav').click(); // Expand all

        const warmupRowDay5 = page.locator('.warmup-hybrid-row').first();
        const nestedRowDay5 = page.locator('.nested-row').first();

        const warmupBorderD5 = await warmupRowDay5.evaluate(el => window.getComputedStyle(el).borderColor);
        const nestedBorderD5 = await nestedRowDay5.evaluate(el => window.getComputedStyle(el).borderColor);

        expect(warmupBorderD5).toBe('rgba(255, 255, 255, 0.1)');
        expect(nestedBorderD5).toBe('rgba(255, 255, 255, 0.1)');

        await page.screenshot({ path: path.join(outDir, 'day5-distinct-cells-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 4200 });
        await page.screenshot({ path: path.join(outDir, 'day5-distinct-cells-mobile.png'), fullPage: true });
    });
});
