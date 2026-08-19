const { test, expect } = require('@playwright/test');

test.describe('Day 2 Bag Power Rounds & Combos Play Icon Pattern', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify Day 2 combos have play icons beside exercise names and open correct videos', async ({ page }) => {
        // Navigate to Day 2 (Bag Power)
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        const bagCards = page.locator('.item-card[data-id^="day2-ex"]');
        await expect(bagCards).toHaveCount(6);

        // Expand Round 1
        const round1Card = bagCards.first();
        if (!await round1Card.evaluate(el => el.classList.contains('expanded'))) {
            await round1Card.locator('.item-header').click();
        }
        await expect(round1Card).toHaveClass(/expanded/);

        // Round 1 combos:
        // day2-ex1-r1: 10x Power Jabs (videoId: mfvJPxQ0WGw)
        // day2-ex1-r2: 5x Jab-Cross (videoId: jcbBBhaz2d8)
        // day2-ex1-r3: 10x Jab with Lead Hip Drive (videoId: teBtAxi18GM)
        // day2-ex1-r4: Repeat 2x (no video)
        const r1Row = round1Card.locator('.nested-row').filter({ hasText: '10x Power Jabs' });
        const r1PlayIcon = r1Row.locator('.btn-demo-icon');
        await expect(r1PlayIcon).toBeVisible();

        // Click r1 demo icon
        await r1PlayIcon.click();
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-container')).toHaveClass(/format-short/);
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /mfvJPxQ0WGw/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Click r2 demo icon (Jab-Cross)
        const r2Row = round1Card.locator('.nested-row').filter({ hasText: '5x Jab-Cross' });
        const r2PlayIcon = r2Row.locator('.btn-demo-icon');
        await expect(r2PlayIcon).toBeVisible();
        await r2PlayIcon.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /jcbBBhaz2d8/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Click r3 demo icon (Jab with Lead Hip Drive)
        const r3Row = round1Card.locator('.nested-row').filter({ hasText: '10x Jab with Lead Hip Drive' });
        const r3PlayIcon = r3Row.locator('.btn-demo-icon');
        await expect(r3PlayIcon).toBeVisible();
        await r3PlayIcon.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /teBtAxi18GM/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // r4 row should NOT have a demo icon
        const r4Row = round1Card.locator('.nested-row').filter({ hasText: 'Repeat 2x' });
        await expect(r4Row.locator('.btn-demo-icon')).toHaveCount(0);

        // Verify no old bulky .btn-demo buttons exist
        await expect(page.locator('.btn-demo')).toHaveCount(0);
    });

    test('Verify Day 1 warm-up play icon pattern remains completely unaffected', async ({ page }) => {
        // Navigate to Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        // Verify Hip 90/90 Stretch has inline play icon
        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow.locator('.btn-demo-icon')).toBeVisible();

        // Click play icon
        await hipRow.locator('.btn-demo-icon').click();
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Hip 90/90 Stretch');
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });
});
