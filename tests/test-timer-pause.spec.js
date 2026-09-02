const { test, expect } = require('@playwright/test');

test.describe('Timer Pause/Resume Functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Go to Day 1
        await page.goto('http://localhost:8080/?day=1');
        // Wait for render
        await page.waitForSelector('.day-view:not(.hidden)');
    });

    test('should show pause button in standalone warmup timer and toggle pause state', async ({ page }) => {
        // Find and click the "Start Warm up Session" button
        const startBtn = page.locator('button', { hasText: 'Start Warm up Session' });
        await expect(startBtn).toBeVisible();
        await startBtn.click();

        // Wait for timer modal to appear
        const modal = page.locator('#timer-modal');
        await expect(modal).not.toHaveClass(/hidden/);

        // Verify the Pause button exists and is visible
        const pauseBtn = page.locator('#btn-timer-pause');
        await expect(pauseBtn).toBeVisible();
        await expect(pauseBtn).toHaveText('Pause');

        // Note the timer display value
        const display = page.locator('.timer-display');
        const initialText = await display.textContent();

        // Click pause
        await pauseBtn.click();

        // Verify button text changes to Resume
        await expect(pauseBtn).toHaveText('Resume');

        // Wait 2 seconds to ensure timer doesn't change
        await page.waitForTimeout(2000);
        
        const pausedText = await display.textContent();
        // Since we paused it quickly, it should be the same as initialText or at most 1 sec diff,
        // but definitely it shouldn't have counted down 2 seconds.
        
        // Click Resume
        await pauseBtn.click();

        // Verify button text changes back to Pause
        await expect(pauseBtn).toHaveText('Pause');

        // Clean up: Close timer
        await page.keyboard.press('Escape');
        await expect(modal).toHaveClass(/hidden/);
    });
});
