const { test, expect } = require('@playwright/test');

const mobileViewports = [
    { name: 'iPhone-SE-375px', width: 375, height: 667 },
    { name: 'iPhone-14-390px', width: 390, height: 844 },
    { name: 'Pixel-7-412px', width: 412, height: 915 }
];

test.describe('Day 3 Mobile Screen Responsiveness & Layout Audit', () => {
    for (const vp of mobileViewports) {
        test(`Day 3 Section Cards & Drill Rows on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto('/');
            await page.evaluate(() => localStorage.clear());
            await page.reload();

            // Navigate to Day 3
            await page.locator('.day-card').nth(2).click();
            await expect(page.locator('.title-page')).toHaveText('Technical Skills Day');

            // Verify no horizontal document overflow
            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
            expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

            // Verify all 5 section cards are present
            const sectionCards = page.locator('.item-card');
            await expect(sectionCards).toHaveCount(5);

            // Expand Section 1: Dynamic Warm-Up
            const sec1 = sectionCards.nth(0);
            await sec1.locator('.item-header').click();
            await expect(sec1).toHaveClass(/expanded/);

            // Verify each row in Section 1 on mobile
            const nestedRows = sec1.locator('.nested-row');
            await expect(nestedRows).toHaveCount(6);

            for (let i = 0; i < 6; i++) {
                const row = nestedRows.nth(i);
                const badge = row.locator('.set-num');
                const title = row.locator('span').first();
                const check = row.locator('.btn-check');

                await expect(badge).toBeVisible();
                await expect(badge).toHaveText(String(i + 1));
                await expect(title).toBeVisible();
                await expect(check).toBeVisible();

                // Touch target check: Checkbox should have at least 32px height/width
                const checkBox = await check.boundingBox();
                expect(checkBox.width).toBeGreaterThanOrEqual(30);
                expect(checkBox.height).toBeGreaterThanOrEqual(30);
            }

            // Verify Start Section Timer button is full-width and touch accessible
            const startBtn = sec1.locator('button.btn-large');
            await expect(startBtn).toBeVisible();
            const btnBox = await startBtn.boundingBox();
            expect(btnBox.width).toBeGreaterThanOrEqual(vp.width * 0.7);
            expect(btnBox.height).toBeGreaterThanOrEqual(44);

            // Capture screenshot of expanded section
            await page.screenshot({ path: `/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-mobile-card-${vp.name}.png` });
        });

        test(`Day 3 Timer Modal (Work & Rest) on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto('/');
            await page.evaluate(() => localStorage.clear());
            await page.reload();

            await page.locator('.day-card').nth(2).click();

            const sec1 = page.locator('.item-card[data-id="day3-sec1"]');
            await sec1.locator('.item-header').click();
            await sec1.locator('button.btn-large').click();

            // Wait for countdown into work phase
            await page.waitForTimeout(6500);

            const timerModal = page.locator('#timer-modal');
            await expect(timerModal).toBeVisible();

            // Verify modal does not overflow screen
            const modalCard = timerModal.locator('.timer-card');
            const cardBox = await modalCard.boundingBox();
            expect(cardBox.width).toBeLessThanOrEqual(vp.width);

            // Verify sub-header "WARM UP : 8:00"
            const subHeader = timerModal.locator('.timer-header h3');
            await expect(subHeader).toContainText('WARM UP :');

            // Verify exercise title
            const mainTitle = timerModal.locator('.timer-header h2');
            await expect(mainTitle).toContainText('1. Leg swings');

            // Verify giant timer display fits
            const timerDisplay = timerModal.locator('.timer-display');
            await expect(timerDisplay).toHaveText(/1:30|1:29/);
            const displayBox = await timerDisplay.boundingBox();
            expect(displayBox.width).toBeLessThanOrEqual(cardBox.width);

            // Verify phase progress bar is visible
            const progressBar = timerModal.locator('.phase-progress-bar-fill');
            await expect(progressBar).toBeVisible();

            // Verify coaching cue text
            const cue = timerModal.locator('.timer-cue');
            await expect(cue).toBeVisible();

            // Capture Work Phase screenshot
            await page.screenshot({ path: `/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-mobile-timer-work-${vp.name}.png` });

            // Skip to rest phase
            await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();
            await page.waitForTimeout(500);

            // Verify Rest phase modal on mobile
            await expect(subHeader).toHaveText('REST');
            await expect(timerModal.locator('.timer-cue')).toContainText('Dynamic warm-up complete');
            await expect(timerDisplay).toHaveText(/1:00|0:59/);

            // Capture Rest Phase screenshot
            await page.screenshot({ path: `/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c/day3-mobile-timer-rest-${vp.name}.png` });

            // Close modal
            await timerModal.locator('.btn-cancel').click();
            await expect(timerModal).toHaveClass(/hidden/);
        });
    }
});
