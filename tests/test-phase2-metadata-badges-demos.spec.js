const { test, expect } = require('@playwright/test');

test.describe('Phase 2: Metadata, Badges & Video Demo Coverage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await page.reload();
    });

    test('Day 5: Type badge renders "CONDITIONING" on home grid card and day header card', async ({ page }) => {
        // Home grid card
        const day5Card = page.locator('.day-card').nth(4);
        await expect(day5Card.locator('.title-card')).toHaveText('Conditioning Bag Day');
        await expect(day5Card.locator('.type-badge')).toContainText('Conditioning');

        // Navigate to Day 5
        await day5Card.click();
        await expect(page.locator('.title-page')).toHaveText('Conditioning Bag Day');
        await expect(page.locator('.day-header-card .type-badge')).toContainText('Conditioning');
    });

    test('Day 4: Session duration displays "~45 min with warm-up"', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');
        const durationStat = page.locator('.session-duration-stat .time-pill');
        await expect(durationStat).toHaveText('⏱ ~45 min with warm-up');
    });

    test('Day 2 Warmup Drill 6 (Shadowboxing): Has YouTube play button that opens video modal', async ({ page }) => {
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const shadowRow = wuCard.locator('.warmup-hybrid-row, .warmup-v2-row', { hasText: 'Shadowboxing' });
        await expect(shadowRow).toBeVisible();

        const playBtn = shadowRow.locator('button.btn-demo-icon');
        await expect(playBtn).toBeVisible();
        await playBtn.click();

        const videoModal = page.locator('.video-modal-overlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /dN75QUuRI9A/);

        // Close modal
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });

    test('Day 5 Warmup Drill 6 (Shadowboxing): Has YouTube play button that opens video modal', async ({ page }) => {
        await page.locator('.day-card').nth(4).click();
        await expect(page.locator('.title-page')).toHaveText('Conditioning Bag Day');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const shadowRow = wuCard.locator('.warmup-hybrid-row, .warmup-v2-row', { hasText: 'Shadowboxing' });
        await expect(shadowRow).toBeVisible();

        const playBtn = shadowRow.locator('button.btn-demo-icon');
        await expect(playBtn).toBeVisible();
        await playBtn.click();

        const videoModal = page.locator('.video-modal-overlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /dN75QUuRI9A/);

        // Close modal
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });
});
