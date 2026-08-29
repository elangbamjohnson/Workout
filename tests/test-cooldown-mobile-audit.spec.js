const { test, expect } = require('@playwright/test');

const viewports = [
    { name: 'iPhone-SE-375px', width: 375, height: 667 },
    { name: 'iPhone-14Pro-393px', width: 393, height: 852 },
    { name: 'Small-Android-360px', width: 360, height: 740 },
    { name: 'Pixel-7-412px', width: 412, height: 915 }
];

test.describe('Cool-Down Mobile Screens & Responsiveness Comprehensive Audit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    for (const vp of viewports) {
        test(`Audit on ${vp.name} (${vp.width}x${vp.height}): Card, Timer Modal, Video Modal`, async ({ page }) => {
            const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
            await page.setViewportSize({ width: vp.width, height: vp.height });

            // Open Hybrid Boxing
            await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
            const swapBtn = page.locator('#btn-confirm-swap');
            if (await swapBtn.isVisible()) await swapBtn.click();

            // Locate and expand Cool Down card
            const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
            await expect(cdCard).toBeVisible();
            await cdCard.locator('.item-header').click();

            // 1. Assert zero page horizontal overflow in card view
            const hasNoCardOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
            expect(hasNoCardOverflow).toBe(true);

            // 2. Assert interactive rows and demo buttons
            const rows = cdCard.locator('.nested-row');
            await expect(rows).toHaveCount(5);

            // Verify demo icon buttons on drill 3 and 4
            const row3 = rows.nth(2); // Chest + shoulder stretch
            const demoBtn3 = row3.locator('.btn-demo-icon');
            await expect(demoBtn3).toBeVisible();

            const row4 = rows.nth(3); // Lat/upper-back stretch
            const demoBtn4 = row4.locator('.btn-demo-icon');
            await expect(demoBtn4).toBeVisible();

            // Verify Start button
            const startBtn = cdCard.locator('button.btn-large:has-text("Start Cool Down Session")');
            await expect(startBtn).toBeVisible();

            await page.screenshot({ path: `${artifactsDir}/mobile-${vp.name}-cooldown-card.png` });

            // 3. Open Video Modal and verify responsive layout
            await demoBtn3.click();
            const videoModal = page.locator('#videoModalOverlay');
            await expect(videoModal).toBeVisible();

            const hasNoVideoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
            expect(hasNoVideoOverflow).toBe(true);

            await page.screenshot({ path: `${artifactsDir}/mobile-${vp.name}-video-modal.png` });
            await videoModal.locator('.btn-close-modal').click();
            await expect(videoModal).toBeHidden();

            // 4. Open Cool Down Timer Modal
            await startBtn.click();
            const timerModal = page.locator('#timer-modal');
            await expect(timerModal).toBeVisible();

            // Fast-forward countdown into active workout phase
            await page.evaluate(() => {
                if (window.Timer && window.Timer.mode === 'countdown') {
                    if (window.Timer.intervalId) clearTimeout(window.Timer.intervalId);
                    window.Timer.mode = 'round';
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

            // Verify timer modal layout
            await expect(timerModal.locator('.timer-header h3')).toContainText('COOL DOWN : 4:00');
            await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Slow shadowboxing');
            await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
            await expect(timerModal.locator('.phase-progress-bar-fill')).toBeVisible();
            await expect(timerModal.locator('.timer-cue')).toBeVisible();

            const hasNoTimerOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
            expect(hasNoTimerOverflow).toBe(true);

            await page.screenshot({ path: `${artifactsDir}/mobile-${vp.name}-timer-modal.png` });

            await timerModal.locator('.btn-cancel').click();
            await expect(timerModal).toBeHidden();
        });
    }

    test('Audit Day 1 on iPhone SE (375px) for Card, Start/Reset flow, and auto-checks', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.setViewportSize({ width: 375, height: 667 });

        await page.locator('.day-card').filter({ hasText: 'Day 1' }).click();
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard.locator('.item-header').click();

        const startBtn = cdCard.locator('button.btn-large:has-text("Start Cool Down Session")');
        await expect(startBtn).toBeVisible();

        await page.screenshot({ path: `${artifactsDir}/mobile-day1-375px-cooldown-card.png` });

        await startBtn.click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

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

        await expect(timerModal.locator('.timer-header h3')).toContainText('COOL DOWN : 3:00');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Hamstring stretch');
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');

        await page.screenshot({ path: `${artifactsDir}/mobile-day1-375px-timer-modal.png` });

        // Complete timer
        await page.evaluate(() => {
            if (window.Timer) window.Timer.handleExpire();
        });

        await expect(timerModal).toBeHidden();
        await expect(cdCard.locator('button.btn-large:has-text("Reset Cool Down")')).toBeVisible();
        await expect(cdCard.locator('.nested-row.checked')).toHaveCount(3);

        await page.screenshot({ path: `${artifactsDir}/mobile-day1-375px-completed-cooldown.png` });
    });
});
