const { test, expect } = require('@playwright/test');

test.describe('Day 3 Warm-up Audio Prompts, Modal Display & Rest Timer Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 3 Dynamic Warm-Up starts with detailed exercise voice prompt, modal title, cues, phase progress, and 60s rest timer', async ({ page }) => {
        // Intercept speakAlert to record all speech calls
        await page.evaluate(() => {
            window.__spokenPrompts = [];
            const origSpeak = window.speakAlert;
            window.speakAlert = function(text) {
                window.__spokenPrompts.push(text);
                if (origSpeak) origSpeak(text);
            };
        });

        // Navigate to Day 3
        await page.locator('.day-card').nth(2).click();
        await expect(page.locator('.title-page')).toHaveText('Technical Skills Day');

        // Expand Section 1: Dynamic Warm-Up
        const sec1Card = page.locator('.item-card[data-id="day3-sec1"]');
        await sec1Card.locator('.item-header').click();
        await expect(sec1Card).toHaveClass(/expanded/);

        // Click Start Section Timer
        const startBtn = sec1Card.locator('button.btn-large');
        await startBtn.click();

        // Verify countdown appears
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Fast-forward countdown
        await page.waitForTimeout(5500);

        // Verify timer modal content during Work Phase
        const subHeader = timerModal.locator('.timer-header h3');
        await expect(subHeader).toContainText('WARM UP :');

        const timerHeader = timerModal.locator('.timer-header h2');
        await expect(timerHeader).toContainText('1. Leg swings');

        const timerCue = timerModal.locator('.timer-cue');
        await expect(timerCue).toContainText('Stand tall, hold a wall if needed');

        // Verify displayed countdown timer shows the per-drill countdown (1:30 for Leg Swings 90s), synced with progress bar
        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/1:30|1:29/);

        // Verify spoken audio prompt includes the detailed drill cue and NOT just "Dynamic Warm-Up started"
        const spoken = await page.evaluate(() => window.__spokenPrompts);
        expect(spoken).toContain('Leg swings. Stand tall, hold a wall if needed. Fifteen swings front to back, then lateral. Start with your first leg.');
        expect(spoken).not.toContain('Dynamic Warm-Up started');

        // Verify phase progress bar exists
        const phaseBar = timerModal.locator('.phase-progress-bar-fill');
        await expect(phaseBar).toBeVisible();

        // Simulate progressive cue firing & auto-checking (advancing 91s into workout -> 1s into Drill 2 Hip Circles)
        await page.evaluate(() => {
            // Fast forward timer to 91 seconds elapsed
            Timer.endTime = Date.now() + (Timer.totalDuration - 91) * 1000;
            Timer.tick();
        });

        // Verify title updated to Drill 2 and display updated to Hip Circles countdown (60s -> 59s)
        await expect(subHeader).toContainText('WARM UP : 6:29');
        await expect(timerHeader).toContainText('2. Hip circles');
        await expect(timerDisplay).toHaveText('0:59');
        await expect(timerCue).toContainText('10 big, controlled circles clockwise');

        // Verify first drill was auto-checked
        const drill1Row = sec1Card.locator('.nested-row').first();
        await expect(drill1Row).toHaveClass(/checked/);

        // Now test rest timer transition: Skip to rest phase
        await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();

        // Verify Rest phase is active
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Dynamic warm-up complete');

        // Verify rest cue was spoken
        const finalSpoken = await page.evaluate(() => window.__spokenPrompts);
        const hasRestSpeech = finalSpoken.some(s => s.includes('Dynamic warm-up complete'));
        expect(hasRestSpeech).toBe(true);

        // Close timer
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toHaveClass(/hidden/);
    });
});
