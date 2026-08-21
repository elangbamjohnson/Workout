const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Day 5 Stage 1 Restructure', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();

        // Navigate to Day 5
        const day5Card = page.locator('.day-card').filter({ hasText: 'Day 5' });
        await day5Card.click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);
        
        // Mock speech to capture calls
        await page.evaluate(() => {
            window.spokenCues = [];
            window.speakAlert = function(text) {
                window.spokenCues.push(text);
            };
        });
    });

    test('Warm-up updates: Neck rolls removed, Jump Rope/Shadowboxing durations', async ({ page }) => {
        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await warmupCard.locator('.item-header').click();

        const jumpRope = warmupCard.locator('.nested-row').filter({ hasText: 'Jump Rope' });
        await expect(jumpRope).toBeVisible();
        await expect(jumpRope).toContainText('1 min 30s');

        const shadowboxing = warmupCard.locator('.nested-row').filter({ hasText: 'Shadowboxing' });
        await expect(shadowboxing).toBeVisible();
        await expect(shadowboxing).toContainText('1 min 30s');

        // Neck Rolls should be removed
        const neckRolls = warmupCard.locator('.nested-row').filter({ hasText: 'Neck Rolls' });
        await expect(neckRolls).toHaveCount(0);
    });

    test('Round 1: Technical Combination Build phases sync correctly', async ({ page }) => {
        const round1 = page.locator('.item-card').filter({ hasText: 'Technical Combination Build' });
        await round1.locator('.item-header').click();
        await round1.locator('.btn-large', { hasText: 'Start Round Timer' }).click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // 0:00 (Start)
        // Wait for first tick
        await advanceTimer(page, 1);
        const cue1 = "1-2 — one minute. Focus on perfect mechanics, not power.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        
        let spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue1);

        // Advance to 1:00 (60s elapsed)
        await advanceTimer(page, 60);
        const cue2 = "1-2-3 — one minute, 70 to 75 percent. Add lateral movement or a pivot after the combination.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);

        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue2);

        // Advance to 2:00 (120s elapsed)
        await advanceTimer(page, 60);
        const cue3 = "1-2-3-2 — one minute, 75 to 80 percent. Add movement between combinations.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);

        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue3);
        
        // Advance to 2:55 (175s elapsed)
        await advanceTimer(page, 55);
        const cue4 = "Finish the round feeling warm and sharp, not fatigued.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue4);
        
        // Advance to REST (3:00)
        await advanceTimer(page, 6);
        
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        // Rest cue should be exactly as defined
        const restCue = "Shoulders should be warm now. Shake it out, prepare for power singles.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(restCue);
    });
});
