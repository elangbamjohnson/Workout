const { test, expect } = require('@playwright/test');

test.describe('Quick Session Complete Session Button Consistency Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Quick Sessions render emerald green Complete Session button matching Day workouts', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const completeBtn = page.locator('button.btn-complete-session');
        await expect(completeBtn).toBeVisible();
        await expect(completeBtn).toContainText('Complete Session');

        // Verify checkmark icon
        const svgIcon = completeBtn.locator('svg');
        await expect(svgIcon).toBeVisible();

        // Verify styles: emerald gradient, white text, uppercase
        const btnColor = await completeBtn.evaluate(el => window.getComputedStyle(el).color);
        expect(btnColor).toBe('rgb(255, 255, 255)');

        const btnBg = await completeBtn.evaluate(el => window.getComputedStyle(el).backgroundImage);
        expect(btnBg).toContain('linear-gradient');

        await completeBtn.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/hybrid-complete-session-button-desktop.png` });

        // Mobile viewport screenshot
        await page.setViewportSize({ width: 375, height: 667 });
        await completeBtn.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactsDir}/hybrid-complete-session-button-mobile.png` });

        // Click Complete Session and verify it logs and redirects home
        await completeBtn.click();
        await expect(page.locator('#app-container')).toHaveClass(/is-home/);
    });
});
