const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Day 5 Restructure — Round 3 (Body Power + Level Change)', () => {
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

    test('Round 3: UI card rendering, combination cells, and settings', async ({ page }) => {
        const round3Card = page.locator('.item-card').filter({ hasText: 'Body Power + Level Change' });
        await expect(round3Card).toBeVisible();
        await expect(round3Card).toContainText('80-85%');
        await expect(round3Card).toContainText('3 min');
        await expect(round3Card).toContainText('Level change, body shot, recover stance, exit. Do not remain stationary in front of the bag.');

        await round3Card.locator('.item-header').click();

        // Check combination rows
        const row1 = round3Card.locator('.nested-row').filter({ hasText: '3 body — 45 seconds, 80 to 85 percent' });
        await expect(row1).toBeVisible();
        await expect(row1).toContainText("Bend the knees and change level, don't just bend at the waist.");

        const row2 = round3Card.locator('.nested-row').filter({ hasText: '4 body — 45 seconds, 80 to 85 percent' });
        await expect(row2).toBeVisible();
        await expect(row2).toContainText('Focus on hip rotation and returning to boxing stance.');

        const row3 = round3Card.locator('.nested-row').filter({ hasText: '1, 4 body, exit — 45 seconds, 80 to 85 percent' });
        await expect(row3).toBeVisible();
        await expect(row3).toContainText('Exit with a pivot or lateral step after every combination.');

        const row4 = round3Card.locator('.nested-row').filter({ hasText: '3 body, 2, exit — 45 seconds, 80 to 85 percent' });
        await expect(row4).toBeVisible();
        await expect(row4).toContainText('Use the body shot to set up the cross.');
    });

    test('Round 3: timedCues phase transitions and voice synchronization', async ({ page }) => {
        const round3Card = page.locator('.item-card').filter({ hasText: 'Body Power + Level Change' });
        await round3Card.locator('.item-header').click();
        await round3Card.locator('.btn-large', { hasText: 'Start Round Timer' }).click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Phase 1 (0:00 - 0:45)
        await advanceTimer(page, 1);
        const cue1 = "3 body — 45 seconds, 80 to 85 percent. Bend the knees and change level, don't just bend at the waist.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        let spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue1);

        // Phase 2 (0:45 - 1:30) -> 45s elapsed
        await advanceTimer(page, 44);
        const cue2 = "4 body — 45 seconds, 80 to 85 percent. Focus on hip rotation and returning to boxing stance.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue2);

        // Phase 3 (1:30 - 2:15) -> 90s elapsed
        await advanceTimer(page, 45);
        const cue3 = "1, 4 body, exit — 45 seconds, 80 to 85 percent. Exit with a pivot or lateral step after every combination.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue3);

        // Phase 4 (2:15 - 3:00) -> 135s elapsed
        await advanceTimer(page, 45);
        const cue4 = "3 body, 2, exit — 45 seconds, 80 to 85 percent. Use the body shot to set up the cross.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue4);

        // Advance to REST (3:00 mark -> 45s more)
        await advanceTimer(page, 46);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        const restCue = "Recover. Next round is zero rest — Combination Power. Get ready.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(restCue);
    });
});
