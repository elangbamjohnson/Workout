const { test, expect } = require('@playwright/test');

test.describe('Day 1 Glute Bridges Video Demo', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify Glute Bridges Video Demo in Day 1 Warm-up', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand warmup section if collapsed
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        // Find Glute Bridges row
        const gluteRow = warmupCard.locator('.nested-row').filter({ hasText: 'Glute Bridges' });
        await expect(gluteRow).toBeVisible();

        // Verify reps label and Watch Demo button are visible
        const repsLabel = gluteRow.locator('.warmup-duration-label');
        await expect(repsLabel).toHaveText('2 × 10');

        const demoBtn = gluteRow.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        // Click play icon button
        await demoBtn.click();

        // Verify video modal is displayed
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Glute Bridges');

        // Verify modal format has 9:16 short aspect ratio
        const modalContainer = videoModal.locator('.video-container');
        await expect(modalContainer).toHaveClass(/format-short/);

        // Verify iframe source has video ID GI5BtRDTuyc
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toBeVisible();
        const iframeSrc = await iframe.getAttribute('src');
        expect(iframeSrc).toContain('GI5BtRDTuyc');

        // Verify close button closes modal
        const closeBtn = videoModal.locator('.btn-close-modal');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(videoModal).toBeHidden();

        // Verify data structure in data.js
        const check = await page.evaluate(() => {
            const day1 = workoutData.days[0];
            const gluteEx = day1.warmup.find(w => w.id === 'day1-wu5');
            return {
                id: gluteEx.id,
                name: gluteEx.name,
                videoId: gluteEx.videoId,
                videoFormat: gluteEx.videoFormat,
                reps: gluteEx.reps
            };
        });

        expect(check.videoId).toBe('GI5BtRDTuyc');
        expect(check.videoFormat).toBe('short');
        expect(check.reps).toBe('2 × 10');
    });
});
