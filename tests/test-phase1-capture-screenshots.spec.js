const { test } = require('@playwright/test');

test.describe('Phase 1 Screenshots', () => {
    test('Capture Day 1, 2, 4, 5 Warmup Work & Rest states on Desktop and Mobile', async ({ page }) => {
        test.setTimeout(120000);
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Helper to launch warmup and take screenshots
        async function captureDayWarmup(dayIndex, dayTitle, dayKey) {
            // Desktop
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto('/');
            await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
            await page.reload();
            await page.locator('.day-card').nth(dayIndex).click();
            const wuCard = page.locator('.item-card').first();
            await wuCard.locator('.item-header').click();
            await wuCard.locator('button.btn-large', { hasText: 'Start Warm-up Session' }).click();
            await page.waitForTimeout(5500); // fast-forward 5s countdown

            await page.screenshot({ path: `${artifactsDir}/${dayKey}-warmup-work-desktop.png` });

            // Advance to rest
            const timerModal = page.locator('#timer-modal');
            await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${artifactsDir}/${dayKey}-warmup-rest-desktop.png` });
            await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();

            // Mobile (iPhone 14: 390x844)
            await page.setViewportSize({ width: 390, height: 844 });
            await page.goto('/');
            await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
            await page.reload();
            await page.locator('.day-card').nth(dayIndex).click();
            const wuCardMobile = page.locator('.item-card').first();
            await wuCardMobile.locator('.item-header').click();
            await wuCardMobile.locator('button.btn-large', { hasText: 'Start Warm-up Session' }).click();
            await page.waitForTimeout(5500);

            await page.screenshot({ path: `${artifactsDir}/${dayKey}-warmup-work-mobile.png` });

            await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${artifactsDir}/${dayKey}-warmup-rest-mobile.png` });
            await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();
        }

        await captureDayWarmup(0, 'Lower Body Power', 'day1');
        await captureDayWarmup(1, 'Bag Power Day', 'day2');
        await captureDayWarmup(3, 'Upper Body Power', 'day4');
        await captureDayWarmup(4, 'Conditioning Bag Day', 'day5');
    });
});
