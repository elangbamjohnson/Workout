const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    await page.clock.runFor(seconds * 1000);
    // Allow DOM to update
    await page.waitForTimeout(50);
}

test.describe('Day 5 Restructure — Round 4 (Combination Power) Standard Rendering', () => {

    test.beforeEach(async ({ page }) => {
        await page.clock.pauseAt(new Date('2024-01-01T00:00:00Z'));
        page.on('console', msg => console.log('BROWSER:', msg.text()));
        await page.goto('/');
        
        // Use a clean state
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();

        await page.evaluate(() => { document.getElementById('splash-screen').style.display = 'none'; });

        // Intercept global audio to prevent real playback and capture speech events
        await page.evaluate(() => {
            window.spokenCues = [];
            window.speakAlert = (text) => {
                window.spokenCues.push(text);
            };
            window.Audio = class {
                play() { return Promise.resolve(); }
                pause() {}
                load() {}
            };
        });

        // Navigate to Day 5 (Advanced Technical Sparring)
        const day5Card = page.locator('.day-card').filter({ hasText: 'Day 5' });
        await day5Card.click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);
    });

    test('UI Verification & Timer Cues: Phase transitions match Round 1/3 architecture', async ({ page }) => {
        // Find Round 4 card (Combination Power)
        const round4Card = page.locator('.item-card').filter({ hasText: 'Combination Power' });
        await expect(round4Card).toBeVisible();
        await round4Card.locator('.item-header').click();

        // Standard global Start Round Timer button should be present
        const startTimerBtn = round4Card.locator('button:has-text("Start Round Timer")');
        await expect(startTimerBtn).toBeVisible();
        
        // Start Timer
        await startTimerBtn.click();
        
        // Verify timer modal layout
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await advanceTimer(page, 6);

        await expect(timerModal.locator('.timer-header h2')).toHaveText('Combination Power');

        // Wait a beat to let it process
        await advanceTimer(page, 1);

        // Sub-title checks: (Round 1/3 have combos, Day 5 uses custom layout)
        
        const cue1 = "1-2-3 — move laterally, reset, re-enter after each combination.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        let spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue1);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 2 (1:00 - 1:45) -> 60s elapsed
        await advanceTimer(page, 60);
        const cue2 = "1-2-3-2 — focus on maintaining speed through the final cross.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue2);

        // Phase 3 (1:45 - 2:30) -> 105s elapsed
        await advanceTimer(page, 45);
        const cue3 = "1, 2, 3 body, 2 — level change, hip rotation, explosive body shot, immediate return to stance, strong cross.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue3);

        // Phase 4 (2:30 - 3:00) -> 150s elapsed
        await advanceTimer(page, 45);
        const cue4 = "Final free combination work, 90% intensity. Every combination should be powerful, but never sacrifice balance or technique. Move after every attack.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue4);

        // Advance to Rest Phase (3:00 mark -> 30s more)
        await advanceTimer(page, 31);
        
        // Verify Rest Mode
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Walk around the bag. Shake out the shoulders. Take controlled breaths. Do not sit down.');
        
        // Skip Rest
        await timerModal.locator('.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toBeHidden();

        // Verify Auto-Completion (all child checkboxes checked)
        // Check standard log completion
        const isCompleted = await page.evaluate(() => {
            const entry = Store.getItemLog(5, 'day5-ex4') || {};
            return entry.completed === true;
        });
        expect(isCompleted).toBe(true);
        
        // Check UI for completion
        const mainCheckbox = round4Card.locator('.btn-check').first();
        await expect(mainCheckbox).toHaveClass(/checked/);
    });

});
