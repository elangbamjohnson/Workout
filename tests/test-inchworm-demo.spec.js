const { test, expect } = require('@playwright/test');

test.describe('Day 1 Inchworm Video Demo', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify Inchworm Video Demo in Day 1 Warm-up', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand warmup section if collapsed
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        // Find Inchworm row
        const inchwormRow = warmupCard.locator('.nested-row').filter({ hasText: 'Inchworm' });
        await expect(inchwormRow).toBeVisible();

        // Verify reps label and Watch Demo button are visible
        const repsLabel = inchwormRow.locator('.warmup-duration-label');
        await expect(repsLabel).toHaveText('5 reps');

        const demoBtn = inchwormRow.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        // Click play icon button
        await demoBtn.click();

        // Verify video modal is displayed
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Inchworm');

        // Verify modal format has 9:16 short aspect ratio
        const modalContainer = videoModal.locator('.video-container');
        await expect(modalContainer).toHaveClass(/format-short/);

        // Verify iframe source has video ID 7jeW4v_oaes
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toBeVisible();
        const iframeSrc = await iframe.getAttribute('src');
        expect(iframeSrc).toContain('7jeW4v_oaes');

        // Verify close button closes modal
        const closeBtn = videoModal.locator('.btn-close-modal');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(videoModal).toBeHidden();

        // Verify data structure in data.js
        const check = await page.evaluate(() => {
            const day1 = workoutData.days[0];
            const inchwormEx = day1.warmup.find(w => w.id === 'day1-wu8');
            return {
                id: inchwormEx.id,
                name: inchwormEx.name,
                videoId: inchwormEx.videoId,
                videoFormat: inchwormEx.videoFormat,
                reps: inchwormEx.reps
            };
        });

        expect(check.videoId).toBe('7jeW4v_oaes');
        expect(check.videoFormat).toBe('short');
        expect(check.reps).toBe('5 reps');
    });
});
