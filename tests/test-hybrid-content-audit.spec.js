const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing Content Audit Fixes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify all 7 content audit fixes in data and UI', async ({ page }) => {
        // Open Hybrid Boxing quick session
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        await expect(page.locator('.title-page')).toHaveText('Hybrid Boxing');

        // Fix 6 — Warm-up Hip Rotations cue
        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await warmupCard.locator('.item-header').click();
        await expect(warmupCard).toContainText('Hands on hips, draw big circles — loosen the hip joint fully');

        // Fix 1 — Conditioning Circuit: No inter-exercise rest, 45s rest after 3 exercises
        const circuitCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        await circuitCard.locator('.item-header').click();
        await expect(circuitCard).toContainText('No rest between exercises');
        await expect(circuitCard).toContainText('Kettlebell Swings — 15 reps');
        await expect(circuitCard).toContainText('Burpees — 10 reps');
        await expect(circuitCard).toContainText('Squat Jumps — 10 reps');

        // Fix 4 & Fix 7 — Bag Finisher round names & Round 2 combo instruction
        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' });
        await finisherCard.locator('.item-header').click();
        await expect(finisherCard).toContainText('Speed Endurance Round');
        await expect(finisherCard).toContainText('Fight Finish Round');
        await expect(finisherCard).toContainText('10 explosive rear crosses — maximum hip rotation, maximum power');

        // Fix 5 — Cool Down timing and duration
        const cooldownCard = page.locator('.item-card').filter({ hasText: 'Cool Down' });
        await cooldownCard.locator('.item-header').click();
        await expect(cooldownCard).toContainText('Slow shadowboxing 50% effort — 90s');
        await expect(cooldownCard).toContainText('Chest opener stretch — 60s');
        await expect(cooldownCard).toContainText('Wrist + shoulder stretch — 45s');
        await expect(cooldownCard).toContainText('~3 min 15s');

        // Fix 2 & 3 — Verify audio cues in data object
        const cuesCheck = await page.evaluate(() => {
            const hybrid = window.quickWorkouts.find(q => q.id === 'quick-hybrid');
            const r2Cues = hybrid.bagRounds.rounds[1].timedCues;
            const r3Cues = hybrid.bagRounds.rounds[2].timedCues;
            
            const r2Cue145 = r2Cues.find(c => c.time === 145);
            const r3Cue120 = r3Cues.find(c => c.time === 120);
            const r3Cue105 = r3Cues.find(c => c.time === 105);
            const r3Cue135 = r3Cues.find(c => c.time === 135);

            return {
                r2Cue145Text: r2Cue145 ? r2Cue145.text : null,
                r3Cue120Text: r3Cue120 ? r3Cue120.text : null,
                has105: !!r3Cue105,
                has135: !!r3Cue135
            };
        });

        expect(cuesCheck.r2Cue145Text).toBe("Thirty seconds — finish with everything!");
        expect(cuesCheck.r3Cue120Text).toBe("Keep throwing — don't stop!");
        expect(cuesCheck.has105).toBe(true);
        expect(cuesCheck.has135).toBe(true);
    });
});
