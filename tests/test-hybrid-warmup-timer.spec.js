const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Warm-up Timer Consistency & Header Countdown Sync', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Start Warm-up Session launches countdown, displays total timer in <h3>, individual drill countdown in .timer-display, and per-drill progress bar', async ({ page }) => {
        // Intercept speech alerts
        await page.evaluate(() => {
            window.__spoken = [];
            window.speakAlert = (text) => window.__spoken.push(text);
        });

        // Navigate to Quick Sessions -> Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Expand Warm-up card
        const wuCard = page.locator('.item-card').filter({ hasText: 'Warm-up' }).first();
        await wuCard.locator('.item-header').click();
        await expect(wuCard).toHaveClass(/expanded/);

        // Click "Start Warm-up Session"
        const startBtn = wuCard.locator('button:has-text("Start Warm-up Session")');
        await expect(startBtn).toBeVisible();
        await startBtn.click();

        // Check 5s countdown modal
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.label-small')).toHaveText('GET READY');

        // Fast-forward 5s countdown into work phase
        await page.waitForTimeout(5500);

        // Verify total countdown in <h3> header title: "WARM UP : 5:00" or "WARM UP : 4:59"
        const headerSub = timerModal.locator('.timer-header h3');
        await expect(headerSub).toContainText('WARM UP :');

        // Verify active exercise title in <h2>: "1. Jump Rope"
        const headerTitle = timerModal.locator('.timer-header h2');
        await expect(headerTitle).toHaveText('1. Jump Rope');

        // Verify individual drill countdown in .timer-display: "2:00" or "1:59" (NOT 5:00)
        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/2:00|1:59/);

        // Verify coaching cue in .timer-cue
        const timerCue = timerModal.locator('.timer-cue');
        await expect(timerCue).toHaveText('Moderate pace — get your feet and rhythm ready');

        // Verify per-drill progress bar exists
        const phaseBar = timerModal.locator('.phase-progress-bar-fill');
        await expect(phaseBar).toBeVisible();

        // Verify spoken prompt
        let spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Warm-up started. Jump Rope'))).toBe(true);

        // Advance to t = 120s (Drill 2: Jumping Jacks)
        await page.evaluate(() => {
            // totalDuration is 300s, advance so 180s remaining
            Timer.endTime = Date.now() + 180 * 1000;
            Timer.tick();
        });

        // Header <h3> displays total remaining: "WARM UP : 3:00"
        await expect(headerSub).toContainText('WARM UP : 3:00');

        // Header <h2> displays "2. Jumping Jacks"
        await expect(headerTitle).toHaveText('2. Jumping Jacks');

        // Timer display shows individual 60s drill: "1:00" (NOT 3:00)
        await expect(timerDisplay).toHaveText('1:00');

        // Timer cue updates to Jumping Jacks cue
        await expect(timerCue).toHaveText('Full arm extension overhead on every rep');

        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Jumping Jacks. Full arm extension overhead'))).toBe(true);

        // Advance to t = 180s (Drill 3: Arm Circles + Shoulder Rolls)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 120 * 1000;
            Timer.tick();
        });

        await expect(headerSub).toContainText('WARM UP : 2:00');
        await expect(headerTitle).toHaveText('3. Arm Circles + Shoulder Rolls');
        await expect(timerDisplay).toHaveText('1:00');
        await expect(timerCue).toHaveText('Loosen the shoulder joint — full range in both directions');

        // Advance to t = 240s (Drill 4: Hip Rotations)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 60 * 1000;
            Timer.tick();
        });

        await expect(headerSub).toContainText('WARM UP : 1:00');
        await expect(headerTitle).toHaveText('4. Hip Rotations');
        await expect(timerDisplay).toHaveText('1:00');
        await expect(timerCue).toHaveText('Hands on hips, draw big circles — loosen the hip joint fully');

        // Advance to completion -> triggers 60s Rest period
        await page.evaluate(() => {
            Timer.endTime = Date.now() - 1000;
            Timer.tick();
        });

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Warm-up complete! Sixty seconds rest. Get ready for the Punch Power Primer.');
        spoken = await page.evaluate(() => window.__spoken);
        expect(spoken.some(s => s.includes('Warm-up complete! Sixty seconds rest'))).toBe(true);
    });
});
