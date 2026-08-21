const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    for (let i = 0; i < seconds; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(5);
    }
}

test.describe('Day 5 Restructure — Round 7 (Cool-Down Shadowboxing) TimedCues & Workflow', () => {

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

    test('Round 7: UI card rendering, 3 phase cells, intensity, and coaching note', async ({ page }) => {
        const round7Card = page.locator('.item-card').filter({ hasText: 'Cool-Down Shadowboxing' });
        await expect(round7Card).toBeVisible();
        await expect(round7Card).toContainText('40% → 30–35% → ~20% → easy');
        await expect(round7Card).toContainText('2 min');
        await expect(round7Card).toContainText('Do not end on the bag. Use light shadowboxing to progressively lower intensity');

        await round7Card.locator('.item-header').click();

        // Check 3 combination rows
        const row1 = round7Card.locator('.nested-row').filter({ hasText: 'Light shadowboxing — 1–2 • Hook • Move' });
        await expect(row1).toBeVisible();

        const row2 = round7Card.locator('.nested-row').filter({ hasText: 'Slow down — Breathe + Move • 30–35%' });
        await expect(row2).toBeVisible();

        const row3 = round7Card.locator('.nested-row').filter({ hasText: 'Recovery — Move + Shake Out • 20% → Easy' });
        await expect(row3).toBeVisible();
    });

    test('Round 7: 3-phase timedCues progression, synchronized voice prompts, and auto-completion', async ({ page }) => {
        const round7Card = page.locator('.item-card').filter({ hasText: 'Cool-Down Shadowboxing' });
        await round7Card.locator('.item-header').click();

        const startTimerBtn = round7Card.locator('button:has-text("Start Round Timer")');
        await expect(startTimerBtn).toBeVisible();
        await startTimerBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Cool-Down Shadowboxing');

        // Phase 1: 0:00 - 0:40
        await expect(timerModal.locator('.timer-display')).toHaveText('2:00');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Light shadowboxing. Forty percent. Use easy 1–2s and hooks. Keep moving and breathe.');
        
        // Wait for immediate speech to register
        await page.waitForTimeout(50);
        let cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Light shadowboxing. Forty percent. Use easy 1–2s and hooks. Keep moving and breathe.');
        
        // Clear cues for next phase
        await page.evaluate(() => { window.spokenCues = []; });
        
        // Advance 40 seconds to Phase 2 (0:40)
        await advanceTimer(page, 40);
        await expect(timerModal.locator('.timer-display')).toHaveText('1:20');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Slow it down. Thirty to thirty-five percent. Breathe deeply and keep your movement relaxed.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Slow it down. Thirty to thirty-five percent. Breathe deeply and keep your movement relaxed.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 40 seconds to Phase 3 (1:20)
        await advanceTimer(page, 40);
        await expect(timerModal.locator('.timer-display')).toHaveText('0:40');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Recovery pace. Let your hands and shoulders relax. Slow your movement and take deep breaths.');
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Recovery pace. Let your hands and shoulders relax. Slow your movement and take deep breaths.');
        await page.evaluate(() => { window.spokenCues = []; });

        // Advance 40 seconds to finish work phase (2:00)
        await advanceTimer(page, 40);
        
        // Because restSeconds === 0, it should announce completion immediately and close
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Cooldown complete. Take a breath and recover.');
        
        // Modal should close immediately since there is no rest timer
        await expect(timerModal).toBeHidden();

        // Verify Auto-Completion (master round + all 3 sub-rounds)
        const isMasterCompleted = await page.evaluate(() => {
            const entry = Store.getItemLog(5, 'day5-ex7') || {};
            return entry.completed === true;
        });
        expect(isMasterCompleted).toBe(true);

        for (let i = 1; i <= 3; i++) {
            const isChildCompleted = await page.evaluate((idx) => {
                const entry = Store.getItemLog(5, `day5-ex7-r${idx}`) || {};
                return entry.completed === true;
            }, i);
            expect(isChildCompleted).toBe(true);
        }

        // Verify all child combinations are checked automatically in UI
        const checkmarks = round7Card.locator('.nested-row button.btn-check');
        const count = await checkmarks.count();
        expect(count).toBe(3);
        for (let i = 0; i < count; i++) {
            await expect(checkmarks.nth(i)).toHaveClass(/checked/);
        }
    });

});
