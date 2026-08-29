const { test } = require('@playwright/test');

test.describe('Hybrid Boxing: Bag Finisher Screenshots', () => {
    test('Capture expanded Bag Finisher and Timer states', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        await page.setViewportSize({ width: 1200, height: 900 });
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' }).first();
        await finisherCard.locator('.item-header').click();
        await page.screenshot({ path: `${artifactsDir}/hybrid-finisher-card-expanded.png` });

        // Open Round 1 Timer
        const r1 = finisherCard.locator('.nested-row').nth(0);
        await r1.locator('.btn-check').click();
        await page.waitForTimeout(500);

        // Fast forward to work phase
        await page.evaluate(() => {
            if (Timer.intervalId) clearInterval(Timer.intervalId);
            const r1Data = window.quickWorkouts.find(q => q.id === 'quick-hybrid').finisher.rounds[0];
            Timer.startRound(r1Data.workSeconds, r1Data.restSeconds, r1Data.name, r1Data.combo, 'bag', null, r1Data.timedCues, false, r1Data.restCue);
        });
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${artifactsDir}/hybrid-finisher-round1-work.png` });
    });
});
