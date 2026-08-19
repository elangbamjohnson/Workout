const { test, expect } = require('@playwright/test');

test.describe('Day 2 Bag Power Coaching Refinements Audit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Verify all four Day 2 coaching refinements in UI and data model', async ({ page }) => {
        // Navigate to Day 2
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        // Check in data model
        const auditData = await page.evaluate(() => {
            const day2 = workoutData.days.find(d => d.id === 2);
            const ex3 = day2.exercises.find(e => e.id === 'day2-ex3');
            const ex5 = day2.exercises.find(e => e.id === 'day2-ex5');
            const ex6 = day2.exercises.find(e => e.id === 'day2-ex6');

            return {
                ex3Rounds: ex3.rounds,
                ex5R2: ex5.rounds.find(r => r.id === 'day2-ex5-r2'),
                ex6R3: ex6.rounds.find(r => r.id === 'day2-ex6-r3')
            };
        });

        // 1. Round 3 missing 3rd element & defensive cue
        const r3 = auditData.ex3Rounds.find(r => r.id === 'day2-ex3-r3');
        expect(r3.combo).toContain('keep your elbow high, exaggerate the lead foot pivot');
        expect(r3.videoId).toBe('mF2HmMVH_DQ');

        const r4 = auditData.ex3Rounds.find(r => r.id === 'day2-ex3-r4');
        expect(r4.combo).toBe('4x Lead Hook Double — body then head, snap the hip on each');

        const r5 = auditData.ex3Rounds.find(r => r.id === 'day2-ex3-r5');
        expect(r5.combo).toBe('Repeat 2x through the sequence');

        // Verify video IDs intact in Round 3
        expect(auditData.ex3Rounds.find(r => r.id === 'day2-ex3-r1').videoId).toBe('-R383f95Lpc');
        expect(auditData.ex3Rounds.find(r => r.id === 'day2-ex3-r2').videoId).toBe('l3e3qeLwC6Q');

        // 2. Round 5 sub-exercise 2 combo order
        expect(auditData.ex5R2.combo).toBe('5x 4-Punch Power Combo: Jab - Cross - Lead Hook - Rear Overhand');
        expect(auditData.ex5R2.videoId).toBe('jfrdknkhtJQ');

        // 3. Round 6 30-sec combination segment specification
        expect(auditData.ex6R3.combo).toBe('30 sec: Repeat 1-2-3-2 (Jab-Cross-Lead Hook-Cross) continuously — focus on pace over power this segment');

        // Expand Round 3 card in UI
        const r3Card = page.locator('.item-card').filter({ hasText: 'Lead Hook Power' });
        await r3Card.locator('.item-header').click();
        await expect(r3Card.locator('.nested-row').filter({ hasText: 'keep your elbow high' })).toBeVisible();
        await expect(r3Card.locator('.nested-row').filter({ hasText: '4x Lead Hook Double' })).toBeVisible();

        // Expand Round 5 card in UI
        const r5Card = page.locator('.item-card').filter({ hasText: 'Power Combinations' });
        await r5Card.locator('.item-header').click();
        await expect(r5Card.locator('.nested-row').filter({ hasText: 'Jab - Cross - Lead Hook - Rear Overhand' })).toBeVisible();

        // Expand Round 6 card in UI
        const r6Card = page.locator('.item-card').filter({ hasText: 'Power Endurance Finisher' });
        await r6Card.locator('.item-header').click();
        await expect(r6Card.locator('.nested-row').filter({ hasText: 'Repeat 1-2-3-2 (Jab-Cross-Lead Hook-Cross)' })).toBeVisible();
    });
});
