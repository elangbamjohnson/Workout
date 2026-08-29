const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Bag Finisher (R4) New Plan & Audio Cue Sync', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Bag Finisher card layout, badges, intervals, and callout match the new plan', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' }).first();
        await expect(finisherCard.locator('.num-badge')).toHaveText('R4');
        await expect(finisherCard.locator('.item-stats')).toContainText('~7 min');
        await expect(finisherCard.locator('.item-stats')).toContainText('2 rounds');

        await finisherCard.locator('.item-header').click();

        // Purpose callout
        await expect(finisherCard.locator('.item-callout')).toContainText("Now we're deliberately asking you to box while fatigued.");
        await expect(finisherCard.locator('.item-callout')).toContainText("This is where the hybrid nature of the workout really comes together.");

        const rows = finisherCard.locator('.nested-row');
        await expect(rows).toHaveCount(2);

        // Round 1
        await expect(rows.nth(0).locator('.set-num')).toHaveText('1');
        await expect(rows.nth(0)).toContainText('Speed Endurance Round');
        await expect(rows.nth(0)).toContainText('0:00–0:30 Fast 1-2');
        await expect(rows.nth(0)).toContainText('0:30–1:00 Movement (light footwork + jab)');
        await expect(rows.nth(0)).toContainText('1:00–1:30 1-2-3-2 fast × 5 reps');
        await expect(rows.nth(0)).toContainText('1:30–2:00 Movement + 1-2');
        await expect(rows.nth(0)).toContainText('2:00–2:30 Freestyle (90% output)');
        await expect(rows.nth(0)).toContainText('2:30–3:00 Fast hands: 1-2 → 1-2-3 → 1-2');
        await expect(rows.nth(0).locator('.btn-check')).toBeVisible();

        // Round 2
        await expect(rows.nth(1).locator('.set-num')).toHaveText('2');
        await expect(rows.nth(1)).toContainText('Fight Finish Round');
        await expect(rows.nth(1)).toContainText('0:00–1:00 2-3-2 with power × 5 reps');
        await expect(rows.nth(1)).toContainText('1:00–2:00 1-2-5-2 with power × 5 reps → Freestyle');
        await expect(rows.nth(1)).toContainText('2:00–2:30 Body → Head combos (1-2 body → 3 head → 2)');
        await expect(rows.nth(1)).toContainText('2:30–3:00 🔥 Fight Finish: 10 Rear Crosses (10s) → Fast 1-2 (10s) → All-Out Output (10s)');
        await expect(rows.nth(1).locator('.btn-check')).toBeVisible();
    });

    test('2. Round 1 starts with 5s countdown, highlights active combos, speaks voice cues, and triggers 60s rest cue', async ({ page }) => {
        await page.evaluate(() => {
            window.__spoken = [];
            window.speakAlert = (text) => window.__spoken.push(text);
        });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' }).first();
        await finisherCard.locator('.item-header').click();

        // Tap Round 1 checkbox to launch timer
        await finisherCard.locator('.nested-row').nth(0).locator('.btn-check').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.label-small')).toHaveText('GET READY');

        // Fast forward countdown into Round 1 work phase
        await page.evaluate(() => {
            if (Timer.intervalId) clearInterval(Timer.intervalId);
            const r1 = window.quickWorkouts.find(q => q.id === 'quick-hybrid').finisher.rounds[0];
            Timer.startRound(r1.workSeconds, r1.restSeconds, r1.name, r1.combo, 'bag', null, r1.timedCues, false, r1.restCue);
        });

        await expect(timerModal.locator('.timer-header h2')).toHaveText('Speed Endurance Round');

        // Verify t=0 spoken cue
        let spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Round one — Speed Endurance! Fast Jab Cross'))).toBe(true);

        // Advance to t=30s (Movement)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 150 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Thirty seconds in. Movement'))).toBe(true);

        // Advance to t=60s (1-2-3-2 fast)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 120 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('One minute mark. Fast combo — Jab, Cross, Lead Hook, Cross'))).toBe(true);

        // Advance to t=150s (Final thirty seconds fast hands)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 30 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Final thirty seconds! Fast hands'))).toBe(true);

        // Complete work phase -> triggers 60s Rest period
        await page.evaluate(() => {
            Timer.endTime = Date.now() - 1000;
            Timer.tick();
        });

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Round one complete! Sixty seconds rest. Deep breathing, one final round.');
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Round one complete! Sixty seconds rest'))).toBe(true);
    });

    test('3. Round 2 speaks Fight Finish voice cues at 0s, 60s, 120s, 150s, 160s, 170s', async ({ page }) => {
        await page.evaluate(() => {
            window.__spoken = [];
            window.speakAlert = (text) => window.__spoken.push(text);
        });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' }).first();
        await finisherCard.locator('.item-header').click();

        // Launch Round 2
        await page.evaluate(() => {
            const r2Data = window.quickWorkouts.find(q => q.id === 'quick-hybrid').finisher.rounds[1];
            Timer.startRound(r2Data.workSeconds, r2Data.restSeconds, r2Data.name, r2Data.combo, 'bag', null, r2Data.timedCues, false, r2Data.restCue);
        });

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Fight Finish Round');

        // t=0s cue
        let spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Round two — Fight Finish! Hardest round.'))).toBe(true);

        // Advance to t=60s (1-2-5-2)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 120 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('One minute mark. Jab, Cross, Lead Uppercut, Cross'))).toBe(true);

        // Advance to t=120s (Level changes)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 60 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Two minute mark. Level changes'))).toBe(true);

        // Advance to t=150s (Fight Finish - 10 Rear Crosses)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 30 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Final thirty seconds — Fight Finish! Ten explosive rear crosses'))).toBe(true);

        // Advance to t=160s (Fast one-two)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 20 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Fast one-two! Speed speed speed!'))).toBe(true);

        // Advance to t=170s (All-out bag output)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 10 * 1000;
            Timer.tick();
        });
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Ten seconds — all-out bag output! Maintain crisp form to the bell!'))).toBe(true);
    });
});
