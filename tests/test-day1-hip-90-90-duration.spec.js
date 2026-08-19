const { test, expect } = require('@playwright/test');

test.describe('Day 1 Hip 90/90 Stretch 1 min duration & Switch Sides', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 1 title duration displays ~55 min and Hip 90/90 shows 1 min', async ({ page }) => {
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Check header session duration pill
        const durationPill = page.locator('.session-duration-stat .time-pill');
        await expect(durationPill).toBeVisible();
        await expect(durationPill).toHaveText('⏱ ~55 min with warm-up');

        // Expand warmup
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow).toBeVisible();

        // Duration label should show "1 min"
        const durationLabel = hipRow.locator('.warmup-duration-label');
        await expect(durationLabel).toHaveText('1 min');
    });

    test('Hip 90/90 Stretch timer announces first side, switches sides at 30s, and completes', async ({ page }) => {
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow).toBeVisible();

        // Capture speakAlert calls
        await page.evaluate(() => {
            window.spokenPrompts = [];
            const originalSpeak = window.speakAlert;
            window.speakAlert = function(msg) {
                window.spokenPrompts.push(msg);
                if (originalSpeak) originalSpeak(msg);
            };
        });

        // Start warmup timer for Hip 90/90 Stretch directly
        await page.evaluate(() => {
            const day1 = workoutData.days[0];
            const hipEx = day1.warmup.find(w => w.id === 'day1-wu4');
            Timer.startWarmup(hipEx.duration, hipEx.name, hipEx.cue, hipEx.switchSides, 'strength', () => {});
        });

        // Timer modal should be open (warmup mode)
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Verify warmup mode start prompt
        let prompts = await page.evaluate(() => window.spokenPrompts);
        expect(prompts).toContain('Hip 90/90 Stretch — first side, start now');

        // Fast-forward to 30s remaining (halfway mark of 60s total)
        await page.evaluate(() => {
            Timer.endTime = Date.now() + 30000;
            Timer.tick();
        });

        prompts = await page.evaluate(() => window.spokenPrompts);
        expect(prompts).toContain('Switch sides');

        // Verify flash overlay
        const timerDisplay = page.locator('.timer-display');
        await expect(timerDisplay).toHaveAttribute('data-flash', 'SWITCH SIDES');

        // Fast-forward to completion
        await page.evaluate(() => {
            Timer.endTime = Date.now() - 100;
            Timer.tick();
        });

        prompts = await page.evaluate(() => window.spokenPrompts);
        expect(prompts).toContain('Hip 90/90 Stretch done');
    });
});
