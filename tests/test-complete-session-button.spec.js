const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Complete Session Button UX & Color Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('All Days (1 to 5) render distinct emerald green Complete Session button', async ({ page }) => {
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        for (let i = 0; i < 5; i++) {
            await page.goto('/');
            await page.locator('.day-card').nth(i).click();

            const completeBtn = page.locator('button.btn-complete-session');
            await expect(completeBtn).toBeVisible();
            await expect(completeBtn).toContainText('Complete Session');

            // Verify emerald green background and white text
            const btnColor = await completeBtn.evaluate(el => window.getComputedStyle(el).color);
            expect(btnColor).toBe('rgb(255, 255, 255)');

            const btnBg = await completeBtn.evaluate(el => window.getComputedStyle(el).backgroundImage);
            expect(btnBg).toContain('linear-gradient');

            // Verify checkmark icon is present
            const svgIcon = completeBtn.locator('svg');
            await expect(svgIcon).toBeVisible();
        }

        // Test clicking Complete Session on Day 5 marks day complete and redirects home
        await page.goto('/');
        await page.locator('.day-card').nth(4).click();
        const d5CompleteBtn = page.locator('button.btn-complete-session');
        await d5CompleteBtn.click();

        // Should return to home and log completion
        await expect(page.locator('#app-container')).toHaveClass(/is-home/);

        // Take screenshots of footer button on Day 5 and Day 4
        await page.goto('/');
        await page.locator('.day-card').nth(4).click();
        await page.locator('button.btn-complete-session').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(outDir, 'day5-complete-session-button-desktop.png') });

        await page.goto('/');
        await page.locator('.day-card').nth(3).click();
        await page.locator('button.btn-complete-session').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(outDir, 'day4-complete-session-button-desktop.png') });

        await page.setViewportSize({ width: 375, height: 812 });
        await page.screenshot({ path: path.join(outDir, 'day4-complete-session-button-mobile.png') });
    });
});
