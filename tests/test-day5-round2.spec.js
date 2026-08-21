const { test, expect } = require('@playwright/test');

// Standardized helper for Day 5 tests to handle the global 5s countdown
async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Day 5 Restructure — Round 2 (Power Singles) TimedCues & Workflow', () => {

    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('http://127.0.0.1:8080');
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
            window.speechSynthesis.speak = function(utterance) {
                if (utterance && utterance.text) {
                    window.spokenCues.push(utterance.text);
                }
            };
        });
    });




    test('Round 2: UI card rendering and 6 phase cells', async ({ page }) => {
        const round2Card = page.locator('.item-card').filter({ hasText: 'Power Singles' });
        await expect(round2Card).toBeVisible();
        await round2Card.locator('.item-header').click();

        // Verify the 6 checklist phases are rendered
        await expect(round2Card).toContainText("Power jabs");
        await expect(round2Card).toContainText("Active reset");
        await expect(round2Card).toContainText("Power crosses");
        await expect(round2Card).toContainText("Prepare for hooks");
        await expect(round2Card).toContainText("Power hooks");
        await expect(round2Card).toContainText("Final reset");
    });

    test('Round 2: 6-phase timedCues progression and audio synchronization', async ({ page }) => {
        const round2Card = page.locator('.item-card').filter({ hasText: 'Power Singles' });
        await expect(round2Card).toBeVisible();
        await round2Card.locator('.item-header').click();

        const startTimerBtn = round2Card.locator('button:has-text("Start Round Timer")');
        await expect(startTimerBtn).toBeVisible();
        await startTimerBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        
        // Wait for 5s countdown + 1s overhead to resolve
        await advanceTimer(page, 6);
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Power Singles');

        // Phase 1 (0:00 - 0:45) -> 0s elapsed

        const cue1 = "Power jabs. Forty-five seconds. Ten quality singles. Punch, fully reset, breathe, and go again. Ninety to ninety-five percent power.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        
        await page.waitForTimeout(50);
        let spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue1);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 2 (0:45 - 1:00) -> 45s elapsed
        await advanceTimer(page, 45);
        const cue2 = "Active reset. Fifteen seconds. Move, breathe, and relax the shoulders.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue2);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 3 (1:00 - 1:45) -> 60s elapsed
        await advanceTimer(page, 15);
        const cue3 = "Power crosses. Forty-five seconds. Ten quality singles. Rotate, reset, breathe, and go again. Ninety to ninety-five percent power.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue3);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 4 (1:45 - 2:00) -> 105s elapsed
        await advanceTimer(page, 45);
        const cue4 = "Active reset. Fifteen seconds. Shake out the arms, breathe, and prepare for hooks.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue4);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 5 (2:00 - 2:45) -> 120s elapsed
        await advanceTimer(page, 15);
        const cue5 = "Power hooks. Forty-five seconds. Five lead and five rear hooks. One punch at a time. Full reset after every punch.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue5);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue5);
        await page.evaluate(() => { window.spokenCues = []; });

        // Phase 6 (2:45 - 3:00) -> 165s elapsed
        await advanceTimer(page, 45);
        const cue6 = "Final reset. Fifteen seconds. Shake out the shoulders, breathe deep, and prepare for body work.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue6);
        spokenCues = await page.evaluate(() => window.spokenCues);
        expect(spokenCues).toContain(cue6);
        await page.evaluate(() => { window.spokenCues = []; });

        // Round Completion (3:00) -> 180s elapsed
        await advanceTimer(page, 16);

        // Verify transition to REST modal
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        
        // Verify Rest Cue for Round 2 is exactly what was specified
        await expect(timerModal.locator('.timer-cue')).toHaveText('Breathe deep. Shake out the shoulders. Body work coming up next.');

        // Close the timer modal
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();



    });
});
