const { test, expect } = require('@playwright/test');

test.describe('Day 1 All Warm-up Exercise Video Demos', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify all 8 Day 1 warm-up exercises have working video demo buttons and correct video IDs', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand warmup section if collapsed
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const expectedExercises = [
            { id: 'day1-wu1', name: 'Jump Rope', videoId: 'Gt9hlRMXDXc' },
            { id: 'day1-wu2', name: 'Jumping Jacks', videoId: 'bT2iY8IjEU0' },
            { id: 'day1-wu3', name: 'Mountain Climbers', videoId: '0LvR42Z599c' },
            { id: 'day1-wu4', name: 'Hip 90/90 Stretch', videoId: 'fDC2KC1XqY8' },
            { id: 'day1-wu5', name: 'Glute Bridges', videoId: 'GI5BtRDTuyc' },
            { id: 'day1-wu6', name: 'Arm Circles', videoId: 'lzR7tzI1JUI' },
            { id: 'day1-wu7', name: 'Bodyweight Squat', videoId: 'aFYwHyS3mrw' },
            { id: 'day1-wu8', name: 'Inchworm', videoId: '7jeW4v_oaes' }
        ];

        for (const ex of expectedExercises) {
            const row = warmupCard.locator(`.warmup-hybrid-row[data-item-id="${ex.id}"]`);
            await expect(row).toBeVisible();

            const demoBtn = row.locator('.btn-demo-icon');
            await expect(demoBtn).toBeVisible();

            // Click demo button
            await demoBtn.click();

            // Verify modal is open and has correct content
            const videoModal = page.locator('#videoModalOverlay');
            await expect(videoModal).toBeVisible();
            await expect(videoModal.locator('.video-modal-title')).toHaveText(ex.name);

            // Verify format is short
            await expect(videoModal.locator('.video-container')).toHaveClass(/format-short/);

            // Verify iframe has correct videoId
            const iframe = videoModal.locator('iframe');
            await expect(iframe).toBeVisible();
            const iframeSrc = await iframe.getAttribute('src');
            expect(iframeSrc).toContain(ex.videoId);

            // Close modal
            await videoModal.locator('.btn-close-modal').click();
            await expect(videoModal).toBeHidden();
        }
    });
});
