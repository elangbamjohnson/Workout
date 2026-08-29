const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Real Simulation Rest Timer Cues (Phase & Tick Logic)', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        await page.evaluate(async () => {
            localStorage.clear();
        });
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
        
        // Mock speech to avoid clutter
        await page.evaluate(() => {
            window.speakAlert = function() {};
        });
    });

    test('Hybrid Boxing - Round 1 rest modal correctly displays restCue and not timedCues', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const bagCard = page.locator('.item-card').filter({ hasText: 'Bag Work' });
        await bagCard.locator('.item-header').click();
        
        const round1 = bagCard.locator('.nested-row').filter({ hasText: 'Basic Power Combinations' });
        await round1.locator('.btn-check').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await advanceTimer(page, 10);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('WORK');

        await advanceTimer(page, 180);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');

        await advanceTimer(page, 18);

        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Rest. Sixty seconds. Shake your arms out, breathe through your nose, and prepare for Round two.');
        
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        await expect(restCue).not.toContainText('One Two Three');
    });

    test('Day 2 (Bag Power Day) - Round 1 rest modal', async ({ page }) => {
        await page.locator('.day-card').filter({ hasText: 'Day 2' }).click();
        
        const firstBagCard = page.locator('.item-card[data-id="day2-ex1"]');
        await firstBagCard.locator('.item-header').click();
        await firstBagCard.locator('button.btn-large:has-text("Start Round Timer")').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await advanceTimer(page, 10);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('WORK');

        await advanceTimer(page, 180);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');

        await advanceTimer(page, 20);

        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Shake out the lead arm. Breathe deep. Power crosses coming up.');
        
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        await expect(restCue).not.toContainText('Straight rights');
    });

    test('Day 5 (Conditioning Bag Day) - Round 1 rest modal', async ({ page }) => {
        await page.locator('.day-card').filter({ hasText: 'Day 5' }).click();
        
        const firstBagCard = page.locator('.item-card[data-id="day5-ex1"]');
        await firstBagCard.locator('.item-header').click();
        await firstBagCard.locator('button.btn-large:has-text("Start Round Timer")').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await advanceTimer(page, 10);
        await advanceTimer(page, 180);

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await advanceTimer(page, 5);

        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Shoulders should be warm now. Shake it out, prepare for power singles.');
    });

    test('Shadow Boxing Quick Session - Round 1 rest modal', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const bagCard = page.locator('.item-card').filter({ hasText: 'Shadow Boxing Rounds' });
        await bagCard.locator('.item-header').click();
        
        const round1 = bagCard.locator('.nested-row').filter({ hasText: 'Round 1 — Footwork + Basic Combos' });
        await round1.locator('.btn-check').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await advanceTimer(page, 10);
        await advanceTimer(page, 180);

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await advanceTimer(page, 5);

        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Stay loose. Keep walking around the room. Prepare for head movement and counters.');
    });
});
