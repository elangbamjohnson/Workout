const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Bag Work (R2) New Plan & Audio/UI Sync Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Bag Work Card Metadata, Badge (R2), and Intro Note', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const bagCard = page.locator('.item-card').filter({ hasText: 'Bag Work' }).first();
        await expect(bagCard.locator('.num-badge')).toHaveText('R2');
        
        await bagCard.locator('.item-header').click();
        await expect(bagCard.locator('.item-callout')).toContainText("Now you go to the heavy bag. Your body is warm and your nervous system is activated, but your shoulders shouldn't be fatigued.");

        // 3 rounds present with sequential numbers on left and checkboxes on right
        const rows = bagCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
            await expect(rows.nth(i).locator('.set-num')).toHaveText(String(i + 1));
            await expect(rows.nth(i).locator('.btn-check')).toBeVisible();
        }

        // Round 1
        await expect(rows.nth(0)).toContainText('Basic Power Combinations');
        await expect(rows.nth(0)).toContainText('0:00–1:00: 1-2 × 5 — Hip & heel rotation, return to guard, move');
        await expect(rows.nth(0)).toContainText('1:00–2:00: 1-2-3 × 5 — Transfer weight rear side to lead side');
        await expect(rows.nth(0)).toContainText('2:00–2:30: 1-2-3-2 × 5 — Rotate, recover, rotate again');
        await expect(rows.nth(0)).toContainText('2:30–3:00: Freestyle (80–85% power) — Combo → defense → exit');

        // Round 2
        await expect(rows.nth(1)).toContainText('Body + Head Combinations');
        await expect(rows.nth(1)).toContainText('0:00–1:00: 1-2 Body → 1-2 Head × 5');
        await expect(rows.nth(1)).toContainText('1:00–2:00: 1-2-3b × 5 — Jab-Cross-Lead Body Hook, then exit/pivot');
        await expect(rows.nth(1)).toContainText('2:00–2:30: 1-6-3-2 × 5 — Level change → rotation → recovery');
        await expect(rows.nth(1)).toContainText('2:30–3:00: Movement + Freestyle (80–90%) — Head & body shots, defense');

        // Round 3
        await expect(rows.nth(2)).toContainText('Power + Defense Combinations');
        await expect(rows.nth(2)).toContainText('0:00–1:00: 2-3-2 × 5 — Cross-Lead Hook-Cross, throw with power');
        await expect(rows.nth(2)).toContainText('1:00–2:00: 1-2-5-2 × 5 — Uppercut driven from legs, not just arm');
        await expect(rows.nth(2)).toContainText('2:00–2:30: 1-2-3-4 × 5 — 4-punch power combination');
        await expect(rows.nth(2)).toContainText('2:30–3:00: Controlled Power Freestyle (85–90%) — Slips, rolls, pivots, step-outs');
    });

    test('2. Round 1 Timer: UI combo display and audio cues synchronization', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            window.__spoken = [];
            window.speakAlert = (text) => window.__spoken.push(text);
        });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const bagCard = page.locator('.item-card').filter({ hasText: 'Bag Work' }).first();
        await bagCard.locator('.item-header').click();

        const round1 = bagCard.locator('.nested-row').nth(0);
        await round1.locator('.btn-check').click();

        const modal = page.locator('#timer-modal');
        await expect(modal).toBeVisible();

        // 5s Countdown
        await expect(modal.locator('.timer-cue')).toContainText('Basic Power Combinations');

        // Wait for countdown to finish (5s) and work phase to start
        await expect(modal.locator('.timer-header h2')).toHaveText('Basic Power Combinations', { timeout: 10000 });
        const comboContainer = modal.locator('.timer-cue-container');
        await expect(comboContainer).toBeVisible();

        const comboItems = comboContainer.locator('div');
        await expect(comboItems).toHaveCount(4);
        await expect(comboItems.nth(0)).toHaveText('1-2 (Jab-Cross) × 5 reps');
        await expect(comboItems.nth(1)).toHaveText('1-2-3 (Jab-Cross-Lead Hook) × 5 reps');
        await expect(comboItems.nth(2)).toHaveText('1-2-3-2 (Jab-Cross-Lead Hook-Cross) × 5 reps');
        await expect(comboItems.nth(3)).toHaveText('Freestyle (80–85% power + movement)');

        // First combo active highlight uses bag theme accent color
        const firstColor = await comboItems.nth(0).evaluate(el => window.getComputedStyle(el).color);
        expect(firstColor).toBe('rgb(217, 154, 61)');

        // Initial audio cue spoken
        const spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes("Round one! Basic power combinations. Jab, Cross — One Two!"))).toBe(true);

        await modal.locator('.btn-cancel').click();
        await expect(modal).toBeHidden();
    });

    test('3. Round 2 & 3 Timer data integrity & rest cues', async ({ page }) => {
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Check Round 2 and Round 3 data properties
        const roundData = await page.evaluate(() => {
            const hybrid = window.quickWorkouts.find(q => q.id === 'quick-hybrid');
            const r2 = hybrid.bagRounds.rounds[1];
            const r3 = hybrid.bagRounds.rounds[2];
            return {
                r2Work: r2.workSeconds,
                r2Rest: r2.restSeconds,
                r2RestCue: r2.restCue,
                r3Work: r3.workSeconds,
                r3Rest: r3.restSeconds,
                r3RestCue: r3.restCue,
                r2CuesCount: r2.timedCues.length,
                r3CuesCount: r3.timedCues.length
            };
        });

        expect(roundData.r2Work).toBe(180);
        expect(roundData.r2Rest).toBe(60);
        expect(roundData.r2RestCue).toContain('Rest. Sixty seconds. Breathe deep, shake it out');
        expect(roundData.r3Work).toBe(180);
        expect(roundData.r3Rest).toBe(60);
        expect(roundData.r3RestCue).toContain('Round three complete! Sixty seconds rest');
        expect(roundData.r2CuesCount).toBe(7);
        expect(roundData.r3CuesCount).toBe(7);
    });
});
