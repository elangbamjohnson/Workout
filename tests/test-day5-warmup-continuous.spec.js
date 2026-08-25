const { test, expect } = require('@playwright/test');

async function advanceTimer(page, seconds) {
    await page.clock.runFor(seconds * 1000);
    await page.waitForTimeout(50);
}

test.describe('Day 5 Warm-up Single Continuous Timer (5:30)', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.pauseAt(new Date('2024-01-01T00:00:00Z'));
        await page.goto('/');
        await page.evaluate(async () => {
            localStorage.clear();
            sessionStorage.clear();
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
        });
        await page.reload();
        await page.evaluate(() => { document.getElementById('splash-screen').style.display = 'none'; });

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
            window.Audio = class {
                play() { return Promise.resolve(); }
                pause() {}
                load() {}
            };
        });
    });

    test('UI Card: Header duration ~5:30, no checkboxes, leftmost icon position, single Start Warm-up footer button', async ({ page }) => {
        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await expect(warmupCard).toBeVisible();
        await expect(warmupCard).toContainText('~5:30');

        await warmupCard.locator('.item-header').click();

        // Verify all 6 exercises render
        const rows = warmupCard.locator('.warmup-v2-row');
        await expect(rows).toHaveCount(6);

        // 1. Confirm checkboxes appear on all 6 warm-up rows
        const checkBoxes = warmupCard.locator('.warmup-v2-row .btn-check');
        await expect(checkBoxes).toHaveCount(6);

        // 2. Confirm the checkbox sits in the leftmost position of band1
        for (let i = 0; i < 6; i++) {
            const row = rows.nth(i);
            const firstChild = row.locator('.warmup-v2-band1 > :first-child');
            await expect(firstChild).toHaveClass(/btn-check/);
        }

        // Verify no individual START buttons in exercise rows
        const individualPlayBtns = warmupCard.locator('.warmup-v2-row .btn-play');
        await expect(individualPlayBtns).toHaveCount(0);

        // Verify single footer Start Warm-up button
        const startWarmupBtn = warmupCard.locator('button.btn-large', { hasText: 'Start Warm-up' });
        await expect(startWarmupBtn).toBeVisible();
    });

    test('5:30 Continuous Timer: 6 phases, progressive auto-completion, Reset Warm-up toggle and reset action', async ({ page }) => {
        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await warmupCard.locator('.item-header').click();

        const startWarmupBtn = warmupCard.locator('button.btn-large', { hasText: 'Start Warm-up' });
        await startWarmupBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // 5s countdown
        await advanceTimer(page, 6);
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Warm-up');

        // Phase 1 (0:00 - 2:00) Jump Rope
        const cue1 = "Start relaxed. Light feet, relaxed shoulders, steady breathing.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1);
        let spoken = await page.evaluate(() => window.spokenCues);
        expect(spoken).toContain(cue1);

        // Mid-phase cue at 1:40 (100s elapsed)
        await advanceTimer(page, 100);
        const cue1_mid = "Gradually increase pace during the final 20 seconds.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue1_mid);

        // Phase 2 at 2:00 (120s elapsed, +20s) Jumping Jacks -> Jump Rope row auto-completes
        await advanceTimer(page, 20);
        const cue2 = "Full arm extension overhead. Land softly and maintain a steady rhythm.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue2);
        spoken = await page.evaluate(() => window.spokenCues);
        expect(spoken).toContain(cue2);

        // Verify Jump Rope row is now marked completed
        const jumpRopeRow = warmupCard.locator('.warmup-v2-row[data-item-id="day5-wu1"]');
        await expect(jumpRopeRow).toHaveClass(/checked/);

        // Phase 3 at 2:30 (150s elapsed, +30s) Mountain Climbers -> Jumping Jacks auto-completes
        await advanceTimer(page, 30);
        const cue3 = "Keep hips level. Drive each knee toward the chest without bouncing excessively.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue3);
        const jumpingJacksRow = warmupCard.locator('.warmup-v2-row[data-item-id="day5-wu2"]');
        await expect(jumpingJacksRow).toHaveClass(/checked/);

        // Phase 4 at 3:00 (180s elapsed, +30s) Shoulder Circles -> Mountain Climbers auto-completes
        await advanceTimer(page, 30);
        const cue4 = "Controlled full range of motion. 15 seconds forward.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4);
        const mountainClimbersRow = warmupCard.locator('.warmup-v2-row[data-item-id="day5-wu3"]');
        await expect(mountainClimbersRow).toHaveClass(/checked/);

        // Mid-phase cue at 3:15 (195s elapsed, +15s)
        await advanceTimer(page, 15);
        const cue4_mid = "Switch direction, 15 seconds backward.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue4_mid);

        // Phase 5 at 3:30 (210s elapsed, +15s) Hip Circles -> Shoulder Circles auto-completes
        await advanceTimer(page, 15);
        const cue5 = "Wide controlled circles. Loosen the hips without rushing.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue5);
        const shoulderCirclesRow = warmupCard.locator('.warmup-v2-row[data-item-id="day5-wu5"]');
        await expect(shoulderCirclesRow).toHaveClass(/checked/);

        // Phase 6 at 4:00 (240s elapsed, +30s) Shadowboxing -> Hip Circles auto-completes
        await advanceTimer(page, 30);
        const cue6 = "1-2, hooks, body shots, slips, pivots. Light movement.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue6);
        const hipCirclesRow = warmupCard.locator('.warmup-v2-row[data-item-id="day5-wu6"]');
        await expect(hipCirclesRow).toHaveClass(/checked/);

        // Mid-phase cue at 5:00 (300s elapsed, +60s)
        await advanceTimer(page, 60);
        const cue6_mid = "Gradually increase speed to approximately 60 percent.";
        await expect(timerModal.locator('.timer-cue')).toHaveText(cue6_mid);

        // Complete timer (+30s to 330s)
        await advanceTimer(page, 31);
        await expect(timerModal).toBeHidden();

        // Check completion in Store for all 6 exercises
        const completedMap = await page.evaluate(() => {
            const wuIds = ['day5-wu1', 'day5-wu2', 'day5-wu3', 'day5-wu5', 'day5-wu6', 'day5-wu7'];
            return wuIds.map(id => (Store.getItemLog(5, id) || {}).completed);
        });
        expect(completedMap.every(c => c === true)).toBe(true);

        // Verify all 6 rows have the .checked completed visual styling
        const checkedRows = warmupCard.locator('.warmup-v2-row.checked');
        await expect(checkedRows).toHaveCount(6);

        // Verify footer button has transitioned to "Reset Warm-up"
        const resetWarmupBtn = warmupCard.locator('button.btn-large', { hasText: 'Reset Warm-up' });
        await expect(resetWarmupBtn).toBeVisible();

        // Click "Reset Warm-up" and verify all 6 rows revert to uncompleted state
        await resetWarmupBtn.click();
        await page.waitForTimeout(200);

        const resetCheckedRows = warmupCard.locator('.warmup-v2-row.checked');
        await expect(resetCheckedRows).toHaveCount(0);

        // Verify footer button toggles back to "Start Warm-up"
        const restoredStartBtn = warmupCard.locator('button.btn-large', { hasText: 'Start Warm-up' });
        await expect(restoredStartBtn).toBeVisible();
    });
});
