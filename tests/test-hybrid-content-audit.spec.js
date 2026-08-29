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
        await expect(circuitCard).toContainText('18 kg KB Swings — 15 reps');
        await expect(circuitCard).toContainText('Burpees — 8 reps');
        await expect(circuitCard).toContainText('Squat Jumps — 8 reps');

        // Fix 4 & Fix 7 — Bag Finisher round names & Round 2 combo instruction
        const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' });
        await finisherCard.locator('.item-header').click();
        await expect(finisherCard).toContainText('Fight Finish');
        await expect(finisherCard).toContainText('10 Rear Crosses');

        // Fix 5 — Cool Down timing and duration
        const cooldownCard = page.locator('.item-card').filter({ hasText: 'Cool Down' });
        await cooldownCard.locator('.item-header').click();
        await expect(cooldownCard).toContainText('Slow shadowboxing — 1 min');
        await expect(cooldownCard).toContainText('Slow walking + controlled breathing — 45s');
        await expect(cooldownCard).toContainText('Chest + shoulder stretch — 45s');
        await expect(cooldownCard).toContainText('Lat/upper-back stretch — 45s');
        await expect(cooldownCard).toContainText('Wrist + forearm + hip mobility — 45s');
        await expect(cooldownCard).toContainText('~4 min');

        // Fix 2 & 3 — Verify audio cues in data object
        const cuesCheck = await page.evaluate(() => {
            const hybrid = window.quickWorkouts.find(q => q.id === 'quick-hybrid');
            const r1Cues = hybrid.bagRounds.rounds[0].timedCues;
            const r2Cues = hybrid.bagRounds.rounds[1].timedCues;
            const r3Cues = hybrid.bagRounds.rounds[2].timedCues;
            
            const r1Cue60 = r1Cues.find(c => c.time === 60);
            const r2Cue60 = r2Cues.find(c => c.time === 60);
            const r3Cue60 = r3Cues.find(c => c.time === 60);
            const r3Cue150 = r3Cues.find(c => c.time === 150);

            return {
                r1Cue60Text: r1Cue60 ? r1Cue60.text : null,
                r2Cue60Text: r2Cue60 ? r2Cue60.text : null,
                r3Cue60Text: r3Cue60 ? r3Cue60.text : null,
                has150: !!r3Cue150
            };
        });

        expect(cuesCheck.r1Cue60Text).toContain("One minute mark. Add the lead hook");
        expect(cuesCheck.r2Cue60Text).toContain("One minute mark. Jab, Cross, Lead Body Hook");
        expect(cuesCheck.r3Cue60Text).toContain("One minute in. Jab, Cross, Lead Uppercut, Cross");
        expect(cuesCheck.has150).toBe(true);
    });
});
