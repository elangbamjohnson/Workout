const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    await page.clock.runFor(seconds * 1000);
    // Allow DOM to update
    await page.waitForTimeout(50);
}

test.describe('Day 5 Restructure — Round 6 (Power Endurance Test) TimedCues & Workflow', () => {

    test.beforeEach(async ({ page }) => {
        await page.clock.pauseAt(new Date('2024-01-01T00:00:00Z'));
        await page.goto('/');
        
        // Use a clean state
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();

        await page.evaluate(() => { document.getElementById('splash-screen').style.display = 'none'; });

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

    test('Round 6: UI card rendering, 6 phase cells, intensity, and coaching note', async ({ page }) => {
        const round6Card = page.locator('.item-card').filter({ hasText: 'Power Endurance Test' });
        await expect(round6Card).toBeVisible();
        await expect(round6Card).toContainText('90–100%');
        await expect(round6Card).toContainText('3 min');
        await expect(round6Card).toContainText('This is your power-under-fatigue test. Compare the quality of your final 45 seconds with your first 45 seconds.');

        await round6Card.locator('.item-header').click();

        // Check 6 combination rows
        const row1 = round6Card.locator('.nested-row').filter({ hasText: '45 sec — Power Block 1: 1–2 / 1–2–3' });
        await expect(row1).toBeVisible();

        const row2 = round6Card.locator('.nested-row').filter({ hasText: '15 sec — Active Recovery: Move + Breathe' });
        await expect(row2).toBeVisible();

        const row3 = round6Card.locator('.nested-row').filter({ hasText: '45 sec — Power Block 2: 1–2–3–2 / 1–2–Body Hook–2' });
        await expect(row3).toBeVisible();

        const row4 = round6Card.locator('.nested-row').filter({ hasText: '15 sec — Active Recovery: Move + Reset' });
        await expect(row4).toBeVisible();

        const row5 = round6Card.locator('.nested-row').filter({ hasText: '45 sec — Power Endurance: Hard + Clean' });
        await expect(row5).toBeVisible();
        
        const row6 = round6Card.locator('.nested-row').filter({ hasText: '15 sec — Final Surge: 1–2–3–2' });
        await expect(row6).toBeVisible();
    });

    test('Round 6: 6-phase timedCues progression, synchronized voice prompts, and auto-completion', async ({ page }) => {
        const round6Card = page.locator('.item-card').filter({ hasText: 'Power Endurance Test' });
        await round6Card.locator('.item-header').click();

        const startTimerBtn = round6Card.locator('button:has-text("Start Round Timer")');
        await expect(startTimerBtn).toBeVisible();
        await startTimerBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Advance past 5s countdown
        await advanceTimer(page, 6);

        await expect(timerModal.locator('.timer-header h2')).toHaveText('Power Endurance Test');

        // Phase 1: 0:00 - 0:45
        await expect(timerModal.locator('.timer-display')).toHaveText('3:00');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Power block. Forty-five seconds. Use hard, clean 1–2s and 1–2–3s. Ninety to ninety-five percent power. Stay relaxed.');
        
        // Wait for immediate speech to register
        await page.waitForTimeout(50);
        let cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Power block. Forty-five seconds. Use hard, clean 1–2s and 1–2–3s. Ninety to ninety-five percent power. Stay relaxed.');
        
        // Clear cues for next phase
        await page.evaluate(() => { window.spokenCues = []; });
        
        // Advance 45 seconds to Phase 2 (0:45)
        await advanceTimer(page, 45);
        await expect(timerModal.locator('.timer-display')).toHaveText('2:15');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Active recovery. Fifteen seconds. Keep moving, breathe, hands relaxed.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Active recovery. Fifteen seconds. Keep moving, breathe, hands relaxed.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 15 seconds to Phase 3 (1:00)
        await advanceTimer(page, 15);
        await expect(timerModal.locator('.timer-display')).toHaveText('2:00');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Power block. Forty-five seconds. Use 1–2–3–2 and 1–2, body hook, 2. Hard and clean.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Power block. Forty-five seconds. Use 1–2–3–2 and 1–2, body hook, 2. Hard and clean.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 45 seconds to Phase 4 (1:45)
        await advanceTimer(page, 45);
        await expect(timerModal.locator('.timer-display')).toHaveText('1:15');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Active recovery. Fifteen seconds. Move, breathe, reset.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Active recovery. Fifteen seconds. Move, breathe, reset.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 15 seconds to Phase 5 (2:00)
        await advanceTimer(page, 15);
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Final power block. Forty-five seconds. Maintain your hardest clean combinations. Do not sacrifice technique.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Final power block. Forty-five seconds. Maintain your hardest clean combinations. Do not sacrifice technique.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 45 seconds to Phase 6 (2:45)
        await advanceTimer(page, 45);
        await expect(timerModal.locator('.timer-display')).toHaveText('0:15');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Final fifteen. Maximum clean output. 1–2–3–2. Hard, fast and sharp.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Final fifteen. Maximum clean output. 1–2–3–2. Hard, fast and sharp.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 15 seconds to finish work phase (3:00)
        await advanceTimer(page, 15);
        
        // Assert we are now in the rest phase
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Outstanding work. Catch your breath. Day 5 is almost done.');

        // Skip the 60s rest
        await timerModal.locator('button:has-text("Skip Rest")').click();
        
        // Modal should close
        await expect(timerModal).toBeHidden();

        // Verify Auto-Completion (master round + all 6 sub-rounds)
        const isMasterCompleted = await page.evaluate(() => {
            const entry = Store.getItemLog(5, 'day5-ex6') || {};
            return entry.completed === true;
        });
        expect(isMasterCompleted).toBe(true);

        for (let i = 1; i <= 6; i++) {
            const isChildCompleted = await page.evaluate((idx) => {
                const entry = Store.getItemLog(5, `day5-ex6-r${idx}`) || {};
                return entry.completed === true;
            }, i);
            expect(isChildCompleted).toBe(true);
        }

        // Verify all child combinations are checked automatically in UI
        const checkmarks = round6Card.locator('.nested-row button.btn-check');
        const count = await checkmarks.count();
        expect(count).toBe(6);
        for (let i = 0; i < count; i++) {
            await expect(checkmarks.nth(i)).toHaveClass(/checked/);
        }
    });

});
