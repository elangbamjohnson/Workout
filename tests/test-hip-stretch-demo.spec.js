const { test, expect } = require('@playwright/test');

test.describe('Day 1 Hip 90/90 Stretch Video Demo', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify Hip 90/90 Stretch Video Demo in Day 1 Warm-up', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Warm-up card is expanded by default (or click to ensure expanded)
        const warmupCard = page.locator('.item-card').first();
        await expect(warmupCard.locator('.title-card')).toHaveText('Warm-up');
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }
        await expect(warmupCard).toHaveClass(/expanded/);

        // Find Hip 90/90 Stretch row
        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow).toBeVisible();

        // Verify subtle play icon button is visible next to Hip 90/90 Stretch name
        const demoBtn = hipRow.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        // Click play icon button
        await demoBtn.click();

        // Video modal overlay should appear
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();

        // Verify title and 9:16 format
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Hip 90/90 Stretch');
        await expect(videoModal.locator('.video-container')).toHaveClass(/format-short/);

        // Verify iframe source contains video ID fDC2KC1XqY8
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toHaveAttribute('src', /fDC2KC1XqY8/);

        // Verify Close button works
        const closeBtn = videoModal.locator('.btn-close-modal');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(videoModal).toBeHidden();

        // Verify switchSides is true in data
        const switchSidesCheck = await page.evaluate(() => {
            const day1 = workoutData.days[0];
            const hipEx = day1.warmup.find(w => w.id === 'day1-wu4');
            return {
                switchSides: hipEx.switchSides,
                duration: hipEx.duration,
                videoId: hipEx.videoId,
                videoFormat: hipEx.videoFormat
            };
        });

        expect(switchSidesCheck.switchSides).toBe(true);
        expect(switchSidesCheck.duration).toBe(60);
        expect(switchSidesCheck.videoId).toBe('fDC2KC1XqY8');
        expect(switchSidesCheck.videoFormat).toBe('short');
    });
});
