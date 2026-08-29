const { test, expect } = require('@playwright/test');

const viewports = [
    { name: 'iPhone-SE-375px', width: 375, height: 667 },
    { name: 'iPhone-14-390px', width: 390, height: 844 },
    { name: 'Pixel-7-412px', width: 412, height: 915 }
];

test.describe('Hybrid Boxing: Mobile Screen Layout & Timer Audits', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    for (const vp of viewports) {
        test(`Mobile Viewport Audit [${vp.name}]: Cards, Overflow, and Timers`, async ({ page }) => {
            const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
            await page.setViewportSize({ width: vp.width, height: vp.height });

            // 1. Navigate to Quick Sessions -> Hybrid Boxing
            await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
            const swapBtn = page.locator('#btn-confirm-swap');
            if (await swapBtn.isVisible()) await swapBtn.click();

            // Verify no horizontal page overflow
            const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
            expect(pageOverflow).toBe(true);

            // 2. Expand Warm-up Card and verify mobile layout
            const wuCard = page.locator('.item-card').filter({ hasText: 'Warm-up' }).first();
            await wuCard.locator('.item-header').click();
            await expect(wuCard).toHaveClass(/expanded/);

            // Verify warm-up rows layout and tap targets
            const wuRows = wuCard.locator('.warmup-hybrid-row');
            expect(await wuRows.count()).toBe(4);
            for (let i = 0; i < 4; i++) {
                const row = wuRows.nth(i);
                const box = await row.boundingBox();
                expect(box.width).toBeLessThanOrEqual(vp.width);
                expect(box.height).toBeGreaterThanOrEqual(44);
            }

            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-wu-card-${vp.name}.png` });

            // 3. Expand Bag Finisher Card (R4) and verify mobile layout
            const finisherCard = page.locator('.item-card').filter({ hasText: 'Bag Finisher' }).first();
            await finisherCard.locator('.item-header').click();
            await expect(finisherCard).toHaveClass(/expanded/);

            const finisherRows = finisherCard.locator('.nested-row');
            expect(await finisherRows.count()).toBe(2);
            for (let i = 0; i < 2; i++) {
                const row = finisherRows.nth(i);
                const box = await row.boundingBox();
                expect(box.width).toBeLessThanOrEqual(vp.width);
            }

            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-finisher-card-${vp.name}.png` });

            // 4. Test Warm-up Timer Modal on mobile
            await wuCard.locator('button:has-text("Start Warm-up Session")').click();
            const timerModal = page.locator('#timer-modal');
            await expect(timerModal).toBeVisible();

            // Fast-forward countdown into Drill 1 Work phase
            await page.waitForTimeout(6500);

            // Verify modal fits within mobile viewport without modal overflow
            const modalCard = timerModal.locator('.timer-card');
            const modalBox = await modalCard.boundingBox();
            expect(modalBox.width).toBeLessThanOrEqual(vp.width);

            // Verify total countdown in <h3>, drill name in <h2>, drill timer in .timer-display
            await expect(timerModal.locator('.timer-header h3')).toContainText('WARM UP :');
            await expect(timerModal.locator('.timer-header h2')).toHaveText('1. Jump Rope');
            await expect(timerModal.locator('.timer-display')).toHaveText(/2:00|1:59/);
            await expect(timerModal.locator('.phase-progress-bar-fill')).toBeVisible();

            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-wu-timer-drill1-${vp.name}.png` });

            // Transition to Rest Phase
            await page.evaluate(() => {
                Timer.endTime = Date.now() - 1000;
                Timer.tick();
            });

            await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
            await expect(timerModal.locator('.timer-cue')).toHaveText('Warm-up complete! Sixty seconds rest. Get ready for the Punch Power Primer.');
            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-wu-timer-rest-${vp.name}.png` });

            // Close timer
            await page.locator('.btn-cancel').click();
            await expect(timerModal).toBeHidden();

            // 5. Test Bag Finisher Round 1 Timer Modal on mobile
            const r1Check = finisherRows.nth(0).locator('.btn-check');
            await r1Check.click();
            await expect(timerModal).toBeVisible();

            await page.evaluate(() => {
                if (Timer.intervalId) clearInterval(Timer.intervalId);
                const r1 = window.quickWorkouts.find(q => q.id === 'quick-hybrid').finisher.rounds[0];
                Timer.startRound(r1.workSeconds, r1.restSeconds, r1.name, r1.combo, 'bag', null, r1.timedCues, false, r1.restCue);
            });

            await expect(timerModal.locator('.timer-header h2')).toHaveText('Speed Endurance Round');
            await expect(timerModal.locator('.timer-cue-container')).toBeVisible();
            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-finisher-r1-work-${vp.name}.png` });

            // Transition to Finisher Rest
            await page.evaluate(() => {
                Timer.endTime = Date.now() - 1000;
                Timer.tick();
            });
            await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
            await expect(timerModal.locator('.timer-cue')).toHaveText('Round one complete! Sixty seconds rest. Deep breathing, one final round.');
            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-finisher-r1-rest-${vp.name}.png` });

            // Close timer
            await page.locator('.btn-cancel').click();
            await expect(timerModal).toBeHidden();

            // 6. Test Bag Finisher Round 2 (Fight Finish) Timer Modal on mobile
            const r2Check = finisherRows.nth(1).locator('.btn-check');
            await r2Check.click();
            await expect(timerModal).toBeVisible();

            await page.evaluate(() => {
                if (Timer.intervalId) clearInterval(Timer.intervalId);
                const r2 = window.quickWorkouts.find(q => q.id === 'quick-hybrid').finisher.rounds[1];
                Timer.startRound(r2.workSeconds, r2.restSeconds, r2.name, r2.combo, 'bag', null, r2.timedCues, false, r2.restCue);
            });

            await expect(timerModal.locator('.timer-header h2')).toHaveText('Fight Finish Round');
            await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-finisher-r2-work-${vp.name}.png` });

            await page.locator('.btn-cancel').click();
            await expect(timerModal).toBeHidden();
        });
    }
});
