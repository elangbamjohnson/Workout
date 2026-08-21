const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Day 5 Restructure — Round 5 (Pressure Round) TimedCues & Workflow', () => {

    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        
        // Use a clean state
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();

        await expect(page.locator('#splash-screen')).toBeHidden();

        // Mock speech to capture calls
        await page.evaluate(() => {
            window.spokenCues = [];
            window.speakAlert = function(text) {
                window.spokenCues.push(text);
            };
            window.Audio = class {
                play() { return Promise.resolve(); }
                pause() {}
                load() {}
            };
        });

        // Navigate to Day 5 (Conditioning Bag Day)
        const day5Card = page.locator('.day-card').filter({ hasText: 'Day 5' });
        await day5Card.click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);
    });

    test('Round 5: UI card rendering, 5 combination cells, intensity, and coaching note', async ({ page }) => {
        const round5Card = page.locator('.item-card').filter({ hasText: 'Pressure Round' });
        await expect(round5Card).toBeVisible();
        await expect(round5Card).toContainText('80-95%');
        await expect(round5Card).toContainText('3 min');
        await expect(round5Card).toContainText('If technique breaks down significantly, temporarily reduce punching intensity');

        await round5Card.locator('.item-header').click();

        // Check 5 combination rows
        const row1 = round5Card.locator('.nested-row').filter({ hasText: 'Move + Attack — 1–2 every 8–10 sec' });
        await expect(row1).toBeVisible();

        const row2 = round5Card.locator('.nested-row').filter({ hasText: 'Increase Combinations — 1–2–3 / 1–2–3–2' });
        await expect(row2).toBeVisible();

        const row3 = round5Card.locator('.nested-row').filter({ hasText: 'Head → Body → Angle — 1–2 → Lead Body Hook → Pivot OR 1–2–3 → Rear Body Hook → Exit' });
        await expect(row3).toBeVisible();

        const row4 = round5Card.locator('.nested-row').filter({ hasText: 'Pressure Surge — 1–2–3–2 / 1–2–Body Hook–2' });
        await expect(row4).toBeVisible();

        const row5 = round5Card.locator('.nested-row').filter({ hasText: 'FINAL 15 — 1–2–3–2 / 1–2–Body Hook–2' });
        await expect(row5).toBeVisible();
    });

    test('Round 5: 5-phase timedCues progression, synchronized voice prompts, and auto-completion', async ({ page }) => {
        const round5Card = page.locator('.item-card').filter({ hasText: 'Pressure Round' });
        await round5Card.locator('.item-header').click();

        const startTimerBtn = round5Card.locator('button:has-text("Start Round Timer")');
        await expect(startTimerBtn).toBeVisible();
        await startTimerBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Pressure Round');

        // Phase 1 (0:00 - 0:45) -> 0s elapsed
        await advanceTimer(page, 1);
        const cue1 = "Move and attack. Throw a 1–2 every eight to ten seconds. Stay relaxed and establish your rhythm.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        let spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue1);

        // Phase 2 (0:45 - 1:30) -> 45s elapsed
        await advanceTimer(page, 44);
        const cue2 = "Increase your combinations. Use 1–2–3 or 1–2–3–2. Attack, exit, reset.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue2);

        // Phase 3 (1:30 - 2:15) -> 90s elapsed
        await advanceTimer(page, 45);
        const cue3 = "Change targets and angles. Throw 1–2, lead body hook, then pivot out. Or 1–2–3, rear body hook, and exit.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue3);

        // Phase 4 (2:15 - 2:45) -> 135s elapsed
        await advanceTimer(page, 45);
        const cue4 = "Pressure surge. Use 1–2–3–2 and 1–2, body hook, 2. Increase your output. Stay sharp.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue4);

        // Phase 5 (2:45 - 3:00) -> 165s elapsed
        await advanceTimer(page, 30);
        const cue5 = "Final fifteen. Give me 1–2–3–2 and 1–2, body hook, 2. Hard and clean. Keep moving.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue5);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue5);

        // Advance to Rest (3:00 / 180s total)
        await advanceTimer(page, 16);
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        const restCue = "One minute to recover. Final round is your power endurance test.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(restCue);

        // Skip Rest
        await timerModal.locator('.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toBeHidden();

        // Verify Auto-Completion (master round + all 5 sub-rounds)
        const isMasterCompleted = await page.evaluate(() => {
            const entry = Store.getItemLog(5, 'day5-ex5') || {};
            return entry.completed === true;
        });
        expect(isMasterCompleted).toBe(true);

        for (let i = 1; i <= 5; i++) {
            const isChildCompleted = await page.evaluate((idx) => {
                const entry = Store.getItemLog(5, `day5-ex5-r${idx}`) || {};
                return entry.completed === true;
            }, i);
            expect(isChildCompleted).toBe(true);
        }

        // Check UI for checkmark
        const mainCheckbox = round5Card.locator('.btn-check').first();
        await expect(mainCheckbox).toHaveClass(/checked/);
    });

});
