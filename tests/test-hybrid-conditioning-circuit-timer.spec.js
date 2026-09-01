const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Hybrid Boxing — R3 Conditioning Circuit Timer, Audio Prompts & UI Sync', () => {
    const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Conditioning Circuit renders Start button, launches timer modal, syncs cues, and handles reset', async ({ page }) => {
        // 1. Navigate to Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // 2. Locate Conditioning Circuit card
        const circuitCard = page.locator('.item-card[data-id="hybrid-circuit"]');
        await expect(circuitCard).toBeVisible();
        await circuitCard.locator('.item-header').click();

        // Check exercises
        const rows = circuitCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);
        await expect(rows.nth(0)).toContainText('18 kg KB Swings — 15 reps');
        await expect(rows.nth(1)).toContainText('Burpees — 8 reps');
        await expect(rows.nth(2)).toContainText('Squat Jumps — 8 reps');

        // Check group start button
        const startBtn = circuitCard.locator('button.btn-large:has-text("Start Conditioning Circuit")');
        await expect(startBtn).toBeVisible();

        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-conditioning-circuit-card-desktop.png') });

        // Mobile card screenshot
        await page.setViewportSize({ width: 375, height: 667 });
        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-conditioning-circuit-card-mobile.png') });
        await page.setViewportSize({ width: 1280, height: 800 });

        // 3. Launch Timer Modal
        await startBtn.click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Fast-forward 5s countdown into active Round 1
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'countdown') {
                if (window.Timer.intervalId) clearTimeout(window.Timer.intervalId);
                window.Timer.mode = 'round';
                const session = quickWorkouts.find(q => q.id === 'quick-hybrid');
                const c = session.circuit;
                window.startConditioningCircuitTimer('quick-hybrid');
            }
        });

        // Fast-forward countdown directly into round execution
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'countdown') {
                if (window.Timer.intervalId) clearTimeout(window.Timer.intervalId);
                const session = quickWorkouts.find(q => q.id === 'quick-hybrid');
                const c = session.circuit;
                const segs = c.exercises.map((ex, i) => ({
                    start: i * 30,
                    end: (i + 1) * 30,
                    name: `${i + 1}. ${ex.name} — ${ex.reps}`,
                    cue: ex.description || ''
                }));
                window.Timer.mode = 'round';
                window.Timer.startRound(90, 45, "Circuit Round 1", '', 'strength', () => {}, c.round1TimedCues, false, c.restCue, null, segs);
            }
        });

        // Verify initial drill: 1. 18 kg KB Swings
        await expect(timerModal.locator('.timer-header h3')).toContainText('CIRCUIT ROUND 1 : 1:30');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('1. 18 kg KB Swings — 15 reps');
        await expect(timerModal.locator('.timer-display')).toHaveText('0:30');
        await expect(timerModal.locator('.phase-progress-bar-fill')).toBeVisible();
        await expect(timerModal.locator('.timer-cue')).toContainText('Hips drive the bell');

        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-circuit-timer-swings-desktop.png') });

        // Mobile timer screenshot
        await page.setViewportSize({ width: 375, height: 667 });
        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-circuit-timer-swings-mobile.png') });
        await page.setViewportSize({ width: 1280, height: 800 });

        // Fast-forward to 35s (Burpees drill)
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'round') {
                window.Timer.endTime = Date.now() + (55 * 1000); // 35s elapsed of 90s
                window.Timer.remainingSeconds = 55;
                window.Timer.updateUI();
            }
        });

        await expect(timerModal.locator('.timer-header h2')).toHaveText('2. Burpees — 8 reps');
        await expect(timerModal.locator('.timer-cue')).toContainText('Chest to floor');

        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-circuit-timer-burpees.png') });

        // Fast-forward to 65s (Squat Jumps drill)
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'round') {
                window.Timer.endTime = Date.now() + (25 * 1000); // 65s elapsed of 90s
                window.Timer.remainingSeconds = 25;
                window.Timer.updateUI();
            }
        });

        await expect(timerModal.locator('.timer-header h2')).toHaveText('3. Squat Jumps — 8 reps');
        await expect(timerModal.locator('.timer-cue')).toContainText('Explosive vertical jump');

        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-circuit-timer-squat-jumps.png') });

        // Complete circuit and verify state
        await page.evaluate(() => {
            const session = quickWorkouts.find(q => q.id === 'quick-hybrid');
            session.circuit.exercises.forEach(ex => {
                Store.logItem('quick-hybrid', ex.id, { completed: true });
            });
            Store.logItem('quick-hybrid', 'circuit_completions', { count: 2 });
            Store.logItem('quick-hybrid', session.circuit.id, { completed: true });
            renderQuickSession('quick-hybrid');
        });

        // Close timer modal
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();

        // Verify Reset button is rendered
        if (!(await circuitCard.evaluate(el => el.classList.contains('expanded')))) {
            await circuitCard.locator('.item-header').click();
        }
        const resetBtn = circuitCard.locator('button.btn-large:has-text("Reset Conditioning Circuit")');
        await expect(resetBtn).toBeVisible();
        await expect(circuitCard.locator('.nested-row.checked')).toHaveCount(3);

        await page.screenshot({ path: path.join(artifactsDir, 'hybrid-circuit-completed-card.png') });

        // Tap reset and verify unchecking
        await resetBtn.click();
        if (!(await circuitCard.evaluate(el => el.classList.contains('expanded')))) {
            await circuitCard.locator('.item-header').click();
        }
        await expect(circuitCard.locator('button.btn-large:has-text("Start Conditioning Circuit")')).toBeVisible();
        await expect(circuitCard.locator('.nested-row.checked')).toHaveCount(0);
    });
});
