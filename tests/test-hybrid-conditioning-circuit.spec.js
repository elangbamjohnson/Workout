const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Conditioning Circuit (R3) Plan Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Card metadata, exercises, reps, and cues match the ~4:00 fatigue plan', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const circuitCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' }).first();
        await expect(circuitCard.locator('.num-badge')).toHaveText('R3');
        await expect(circuitCard.locator('.item-stats')).toContainText('~4 min');
        await expect(circuitCard.locator('.item-stats')).toContainText('2 rounds');
        await expect(circuitCard.locator('.item-stats')).toContainText('No rest between exercises');

        await circuitCard.locator('.item-header').click();

        // Callout text
        await expect(circuitCard.locator('.item-callout')).toContainText('Now we deliberately create fatigue.');
        await expect(circuitCard.locator('.item-callout')).toContainText('Move directly to the next exercise with no planned rest.');

        // 3 exercises present
        const rows = circuitCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);

        // Exercise 1: 18 kg KB Swings — 15 reps
        await expect(rows.nth(0).locator('.set-num')).toHaveText('1');
        await expect(rows.nth(0)).toContainText('18 kg KB Swings — 15 reps');
        await expect(rows.nth(0)).toContainText('Hips drive the bell — hinge, snap, float. Reinforce punch hip snap.');
        await expect(rows.nth(0).locator('.btn-demo-icon')).toBeVisible();

        // Exercise 2: Burpees — 8 reps with video demo
        await expect(rows.nth(1).locator('.set-num')).toHaveText('2');
        await expect(rows.nth(1)).toContainText('Burpees — 8 reps');
        await expect(rows.nth(1)).toContainText('Chest to floor, explode up with hands overhead');
        const burpeeDemo = rows.nth(1).locator('.btn-demo-icon');
        await expect(burpeeDemo).toBeVisible();

        // Open and verify Burpees video demo modal
        await burpeeDemo.click();
        const videoModal = page.locator('.video-modal-overlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /gYiE_2BtSTg/);
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Exercise 3: Squat Jumps — 8 reps
        await expect(rows.nth(2).locator('.set-num')).toHaveText('3');
        await expect(rows.nth(2)).toContainText('Squat Jumps — 8 reps');
        await expect(rows.nth(2)).toContainText('Explosive vertical jump from squat, soft landing into next rep');
        await expect(rows.nth(2).locator('.btn-demo-icon')).toBeVisible();
    });

    test('2. Checkbox triggers 45s rest timer and bespoke spoken voice cue after Round 1 & Round 2', async ({ page }) => {
        await page.evaluate(() => {
            window.__spoken = [];
            window.speakAlert = (text) => window.__spoken.push(text);
        });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const circuitCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' }).first();
        await circuitCard.locator('.item-header').click();

        const rows = circuitCard.locator('.nested-row');

        // Complete Round 1: Check Exercise 1, 2, 3
        await rows.nth(0).locator('.btn-check').click();
        await rows.nth(1).locator('.btn-check').click();
        await rows.nth(2).locator('.btn-check').click();

        // 45s Rest Timer modal appears
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Round one complete! Forty-five seconds rest. Walk it off, breathe through your nose, and prepare for round two.');

        // Spoken audio cue recorded
        const spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Round one complete! Forty-five seconds rest'))).toBe(true);

        // Complete rest timer to trigger onRestComplete
        await page.evaluate(() => {
            Timer.endTime = Date.now() - 1000;
            Timer.tick();
        });
        await expect(timerModal).toBeHidden();

        // Verify title indicates (Round 2 of 2)
        await expect(circuitCard.locator('.title-card')).toContainText('Round 2 of 2');

        // Complete Round 2: Check Exercise 1, 2, 3
        await rows.nth(0).locator('.btn-check').click();
        await rows.nth(1).locator('.btn-check').click();
        await rows.nth(2).locator('.btn-check').click();

        // Finish rest modal appears
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Complete');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Conditioning circuit complete! Forty-five seconds rest. Shake it out before the Bag Finisher.');

        const finalSpoken = await page.evaluate(() => window.__spoken);
        expect(finalSpoken.some(s => s.includes('Conditioning circuit complete! Forty-five seconds rest'))).toBe(true);
    });
});
