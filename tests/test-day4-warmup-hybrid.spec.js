const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 4 Hybrid Warm-up Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 4: Verify warmup layout, exercise numbering, video demos, cues, and continuous timer', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Expand warmup card
        const warmupCard = page.locator('.item-card').filter({ hasText: /Warm-up/ }).first();
        await warmupCard.locator('.item-header').click();
        await expect(warmupCard).toHaveClass(/expanded/);

        // Verify 8 hybrid warmup rows
        const rows = warmupCard.locator('.warmup-hybrid-row');
        await expect(rows).toHaveCount(8);

        const expectedExercises = [
            { num: '1', name: 'Jump Rope', stat: '3 min', cue: 'Easy pace — this is activation, not cardio' },
            { num: '2', name: 'Jumping Jacks', stat: '30s', cue: 'Full arm extension overhead on every rep' },
            { num: '3', name: 'Mountain Climbers', stat: '30s', cue: 'Hips level, drive each knee toward your chest' },
            { num: '4', name: 'Hip 90/90 Stretch', stat: '1 min', cue: 'Sit tall, press the front shin down, feel the hip open' },
            { num: '5', name: 'Glute Bridges', stat: '2 × 10', cue: 'Squeeze glutes hard at the top, hold 1 second' },
            { num: '6', name: 'Arm Circles', stat: '30s', cue: 'Full range — front and back, gradually increasing size' },
            { num: '7', name: 'Bodyweight Squat', stat: '10 reps slow', cue: 'Pause 2 seconds at the bottom, drive through heels' },
            { num: '8', name: 'Inchworm', stat: '5 reps', cue: 'Walk hands out to full plank, walk feet back in — slow' }
        ];

        for (let i = 0; i < 8; i++) {
            const row = rows.nth(i);
            const expected = expectedExercises[i];

            await expect(row.locator('.warmup-hybrid-num')).toHaveText(expected.num);
            await expect(row.locator('.warmup-hybrid-name')).toContainText(expected.name);
            await expect(row.locator('.warmup-hybrid-stat')).toContainText(expected.stat);
            await expect(row.locator('.warmup-hybrid-cue')).toContainText(expected.cue);
            await expect(row.locator('.btn-demo-icon')).toBeVisible();
            await expect(row.locator('.btn-check')).toBeVisible();
        }

        // Test video demo modal on Item 1 (Jump Rope)
        const demoBtn = rows.first().locator('.btn-demo-icon');
        await demoBtn.click();
        await page.waitForTimeout(300);

        const modal = page.locator('#videoModalOverlay');
        await expect(modal).toBeVisible();
        const iframe = modal.locator('iframe');
        await expect(iframe).toBeVisible();
        const src = await iframe.getAttribute('src');
        expect(src).toContain('Gt9hlRMXDXc');
        expect(src).toContain('autoplay=1');

        // Close modal
        await modal.locator('.btn-close-modal').click();
        await page.waitForTimeout(200);
        await expect(modal).not.toBeVisible();

        // Verify "Start Warm-up Session" button
        const startSessionBtn = warmupCard.locator('.btn-large').filter({ hasText: /Start Warm-up Session/i });
        await expect(startSessionBtn).toBeVisible();

        // Capture desktop and mobile screenshots
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day4-warmup-hybrid-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 1600 });
        await page.screenshot({ path: path.join(outDir, 'day4-warmup-hybrid-mobile.png'), fullPage: true });
    });

    test('Day 4: Start Warm-up Session launches continuous timer with dynamic exercise names and cues', async ({ page }) => {
        await page.clock.install();

        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        const warmupCard = page.locator('.item-card').filter({ hasText: /Warm-up/ }).first();
        await warmupCard.locator('.item-header').click();

        const startSessionBtn = warmupCard.locator('.btn-large').filter({ hasText: /Start Warm-up Session/i });
        await startSessionBtn.click();

        // Fast forward 5s countdown
        for (let i = 0; i < 6; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(5);
        }

        const modal = page.locator('#timer-modal');
        await expect(modal).not.toHaveClass(/hidden/);

        // Title should dynamically show "1. Jump Rope" with accent color and cue
        const headerTitle = modal.locator('.timer-header h2');
        await expect(headerTitle).toHaveText('1. Jump Rope');

        const cueEl = modal.locator('.timer-cue');
        await expect(cueEl).toHaveText('Easy pace — this is activation, not cardio');

        // Close timer
        await modal.locator('.btn-cancel').click();
        await page.waitForTimeout(100);
        await expect(modal).toHaveClass(/hidden/);
    });
});
