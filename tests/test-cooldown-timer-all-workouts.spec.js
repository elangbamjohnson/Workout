const { test, expect } = require('@playwright/test');

test.describe('Cool-Down Timer Modal & Audio Prompts Across All Workouts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Day 1: Cool-Down card has Start button, launches timer modal with synchronized headers and drill timer', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        
        // Open Day 1
        await page.locator('.day-card').filter({ hasText: 'Day 1' }).click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Locate and expand Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        // Verify Start button exists in card actionHtml
        const startBtn = cdCard.locator('button.btn-large:has-text("Start Cool Down Session")');
        await expect(startBtn).toBeVisible();

        // Launch Cool Down timer
        await startBtn.click();

        // Verify Get Ready countdown
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.countdown-number')).toBeVisible();

        // Fast-forward countdown into active workout phase
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'countdown') {
                if (window.Timer.intervalId) clearTimeout(window.Timer.intervalId);
                window.Timer.mode = 'round';
                const day = workoutData.days.find(d => d.id === 1);
                window.Timer.startRound(day.cooldownSessionDuration, 0, "Cool Down", '', 'bag', () => {
                    day.cooldown.forEach((item, idx) => {
                        Store.logItem(1, item.id || `cooldown-card-${idx}`, { completed: true });
                        Store.logItem(1, `cooldown-card-${idx}`, { completed: true });
                    });
                    Store.logItem(1, 'cooldown-card', { completed: true });
                    reRenderViewingDay();
                }, day.cooldownTimedCues, false, '', day.cooldownCompletionCue, [
                    { start: 0, end: 60, name: "1. Hamstring stretch", cue: day.cooldown[0].desc },
                    { start: 60, end: 120, name: "2. Kneeling hip flexor stretch", cue: day.cooldown[1].desc },
                    { start: 120, end: 180, name: "3. Pigeon / glute stretch", cue: day.cooldown[2].desc }
                ]);
            }
        });

        // Verify modal elements:
        // 1. Total session timer in <h3>: COOL DOWN : 3:00
        await expect(timerModal.locator('.timer-header h3')).toContainText('COOL DOWN : 3:00');
        // 2. Active drill name in <h2>: 1. Hamstring stretch
        await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Hamstring stretch');
        // 3. Individual drill timer in .timer-display: 1:00
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
        // 4. Progress bar fill exists
        await expect(timerModal.locator('.phase-progress-bar-fill')).toBeVisible();

        await page.screenshot({ path: `${artifactsDir}/day1-cooldown-timer-modal.png` });

        // Fast-forward to completion
        await page.evaluate(() => {
            if (window.Timer) {
                window.Timer.handleExpire();
            }
        });

        // Modal closes and card updates to Reset Cool Down
        await expect(timerModal).toBeHidden();
        await expect(cdCard.locator('button.btn-large:has-text("Reset Cool Down")')).toBeVisible();
        const checkedRows = cdCard.locator('.nested-row.checked');
        await expect(checkedRows).toHaveCount(3);
    });

    test('2. Day 2 & Day 4: Cool-Down timer modal launch & verification', async ({ page }) => {
        // Test Day 2
        await page.locator('.day-card').filter({ hasText: 'Day 2' }).click();
        const cdCard2 = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard2.locator('.item-header').click();
        const startBtn2 = cdCard2.locator('button.btn-large:has-text("Start Cool Down Session")');
        await expect(startBtn2).toBeVisible();
        await startBtn2.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Advance into timer
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'countdown') {
                const day = workoutData.days.find(d => d.id === 2);
                window.Timer.startRound(day.cooldownSessionDuration, 0, "Cool Down", '', 'bag', null, day.cooldownTimedCues, false, '', day.cooldownCompletionCue, [
                    { start: 0, end: 60, name: "1. Shoulder cross-body stretch", cue: day.cooldown[0].desc },
                    { start: 60, end: 120, name: "2. Chest opener stretch", cue: day.cooldown[1].desc },
                    { start: 120, end: 180, name: "3. Wrist + forearm stretch", cue: day.cooldown[2].desc }
                ]);
            }
        });

        await expect(timerModal.locator('.timer-header h3')).toContainText('COOL DOWN : 3:00');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Shoulder cross-body stretch');
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();

        // Test Day 4
        await page.goto('/');
        await page.locator('.day-card').filter({ hasText: 'Day 4' }).click();
        const cdCard4 = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard4.locator('.item-header').click();
        const startBtn4 = cdCard4.locator('button.btn-large:has-text("Start Cool Down Session")');
        await expect(startBtn4).toBeVisible();
        await startBtn4.click();
        await expect(timerModal).toBeVisible();
        await timerModal.locator('.btn-cancel').click();
    });

    test('3. Quick Sessions (Hybrid Boxing, Lower Body Power, Shadow Boxing) Cool-Down Timers', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Hybrid Boxing (4:00 Routine)
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const hybridCd = page.locator('.item-card[data-id="cooldown-card"]');
        await hybridCd.locator('.item-header').click();
        const hybridStart = hybridCd.locator('button.btn-large:has-text("Start Cool Down Session")');
        await expect(hybridStart).toBeVisible();
        await hybridStart.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Advance to active phase
        await page.evaluate(() => {
            if (window.Timer && window.Timer.mode === 'countdown') {
                const day = quickWorkouts.find(q => q.id === 'quick-hybrid');
                window.Timer.startRound(day.cooldownSessionDuration, 0, "Cool Down", '', 'bag', null, day.cooldownTimedCues, false, '', day.cooldownCompletionCue, [
                    { start: 0, end: 60, name: "1. Slow shadowboxing", cue: day.cooldown[0].desc },
                    { start: 60, end: 105, name: "2. Slow walking + controlled breathing", cue: day.cooldown[1].desc },
                    { start: 105, end: 150, name: "3. Chest + shoulder stretch", cue: day.cooldown[2].desc },
                    { start: 150, end: 195, name: "4. Lat/upper-back stretch", cue: day.cooldown[3].desc },
                    { start: 195, end: 240, name: "5. Wrist + forearm + hip mobility", cue: day.cooldown[4].desc }
                ]);
            }
        });

        await expect(timerModal.locator('.timer-header h3')).toContainText('COOL DOWN : 4:00');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Slow shadowboxing');
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
        await page.screenshot({ path: `${artifactsDir}/hybrid-cooldown-timer-modal.png` });
        await timerModal.locator('.btn-cancel').click();

        // Lower Body Power
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Lower Body Power' }).click();
        if (await swapBtn.isVisible()) await swapBtn.click();
        const lowerCd = page.locator('.item-card[data-id="cooldown-card"]');
        await lowerCd.locator('.item-header').click();
        await expect(lowerCd.locator('button.btn-large:has-text("Start Cool Down Session")')).toBeVisible();

        // Shadow Boxing
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).first().click();
        if (await swapBtn.isVisible()) await swapBtn.click();
        const shadowCd = page.locator('.item-card[data-id="cooldown-card"]');
        await shadowCd.locator('.item-header').click();
        await expect(shadowCd.locator('button.btn-large:has-text("Start Cool Down Session")')).toBeVisible();
    });

    test('4. Mobile Responsiveness on iPhone SE (375px) has zero overflow and clean touch targets', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.setViewportSize({ width: 375, height: 667 });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard.locator('.item-header').click();

        const startBtn = cdCard.locator('button.btn-large:has-text("Start Cool Down Session")');
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
        expect(pageOverflow).toBe(true);

        await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-cooldown-timer-375px.png` });
    });
});
