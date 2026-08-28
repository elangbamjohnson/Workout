const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 2 Hybrid Warm-up Session Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 2 Warm-up renders with sequential 1..6 badges, video demos, cues, right checkboxes, and continuous timer', async ({ page }) => {
        // Navigate to Day 2
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        // Expand Warm-up card
        const wuCard = page.locator('.item-card[data-id="warmup-card"]');
        await wuCard.locator('.item-header').click();
        await expect(wuCard).toHaveClass(/expanded/);

        // Verify duration stat in header (~6:30)
        await expect(wuCard.locator('.stat-item')).toContainText('~6:30');

        // Verify 6 hybrid rows with sequential numbered badges 1..6
        const rows = wuCard.locator('.warmup-hybrid-row');
        await expect(rows).toHaveCount(6);

        const expectedDrills = [
            { name: 'Jump Rope', stat: '2 min', cue: 'Moderate pace', videoId: 'Gt9hlRMXDXc' },
            { name: 'Jumping Jacks', stat: '30s', cue: 'Full arm extension overhead', videoId: 'bT2iY8IjEU0' },
            { name: 'Mountain Climbers', stat: '30s', cue: 'Hips level', videoId: '0LvR42Z599c' },
            { name: 'Arm Circles & Shoulder Rolls', stat: '30s', cue: 'Loosen the shoulder joint', videoId: 'lzR7tzI1JUI' },
            { name: 'Hip Rotations', stat: '1 min', cue: 'Stand tall, rotate from the hip', videoId: 'PZFKu9583Ms' },
            { name: 'Shadowboxing', stat: '2 min', cue: '50% speed', videoId: null }
        ];

        for (let i = 0; i < 6; i++) {
            const row = rows.nth(i);
            const expected = expectedDrills[i];

            // Badge number
            await expect(row.locator('.warmup-hybrid-num')).toHaveText(String(i + 1));

            // Name
            await expect(row.locator('.warmup-hybrid-name')).toHaveText(expected.name);

            // Subtext stat & cue
            await expect(row.locator('.warmup-hybrid-stat')).toHaveText(expected.stat);
            if (expected.cue) {
                await expect(row.locator('.warmup-hybrid-cue')).toContainText(expected.cue);
            }

            // Checkbox on right
            const checkBtn = row.locator('.btn-check');
            await expect(checkBtn).toBeVisible();
            const numBox = await row.locator('.warmup-hybrid-num').boundingBox();
            const checkBtnBox = await checkBtn.boundingBox();
            expect(checkBtnBox.x).toBeGreaterThan(numBox.x);

            // Video demo icon if applicable
            if (expected.videoId) {
                const demoBtn = row.locator('.btn-demo-icon');
                await expect(demoBtn).toBeVisible();
            }
        }

        // Test video modal opening for Jump Rope
        const jumpRopeDemoBtn = rows.first().locator('.btn-demo-icon');
        await jumpRopeDemoBtn.click();
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /Gt9hlRMXDXc/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Check selected styling when an item is completed
        await rows.nth(1).locator('.btn-check').click(); // Clicking Jumping Jacks starts timer
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toHaveClass(/hidden/);

        // Direct check via Store to test selected styling
        await page.evaluate(() => {
            Store.logItem(2, 'day2-wu1', { completed: true });
            reRenderViewingDay();
        });

        await expect(rows.first()).toHaveClass(/checked/);

        // Verify theme accent color applied to checked row and number badge (Bag theme gold #d99a3d)
        const rowBorder = await rows.first().evaluate(el => window.getComputedStyle(el).borderColor);
        expect(rowBorder).toBe('rgb(217, 154, 61)');

        const numBg = await rows.first().locator('.warmup-hybrid-num').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(numBg).toBe('rgb(217, 154, 61)');

        // Verify bottom continuous CTA button
        const ctaBtn = wuCard.locator('.card-action-bar button, button.btn-large');
        await expect(ctaBtn).toContainText('Start Warm-up Session');

        // Capture screenshots
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day2-warmup-hybrid-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 2600 });
        await page.screenshot({ path: path.join(outDir, 'day2-warmup-hybrid-mobile.png'), fullPage: true });
    });
});
