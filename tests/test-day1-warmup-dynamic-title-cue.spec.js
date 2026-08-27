const { test, expect } = require('@playwright/test');

test.describe('Day 1 Warm-up Session Timer - Dynamic Title & Detail Coaching Cue Display', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Session timer displays dynamic exercise name in h2 with accent color and coaching detail text in timer-cue', async ({ page }) => {
        await page.clock.install();

        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand Warm-up card
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        // Start Warm-up Session
        await warmupCard.locator('button.btn-large').filter({ hasText: 'Start Warm-up Session' }).click();

        // Fast forward through 5s countdown
        for (let i = 0; i < 6; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(5);
        }

        const modal = page.locator('#timer-modal');
        await expect(modal).not.toHaveClass(/hidden/);

        // 1. Check Exercise 1 (Jump Rope)
        const headerTitle = modal.locator('.timer-header h2');
        await expect(headerTitle).toHaveText('1. Jump Rope');

        // Verify title color is the accent color (rgb(238, 108, 63))
        const titleColor = await headerTitle.evaluate(el => window.getComputedStyle(el).color);
        expect(titleColor).toBe('rgb(238, 108, 63)');

        const cueEl = modal.locator('.timer-cue');
        await expect(cueEl).toBeVisible();
        await expect(cueEl).toHaveText('Easy pace — this is activation, not cardio');

        // 2. Fast forward into Exercise 2 (Jumping Jacks at 185s)
        for (let i = 0; i < 185; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(2);
        }

        await expect(headerTitle).toHaveText('2. Jumping Jacks');
        await expect(cueEl).toHaveText('Full arm extension overhead on every rep');

        // 3. Fast forward into Exercise 4 (Hip 90/90 Stretch at 255s: +70s from 185)
        for (let i = 0; i < 70; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(2);
        }

        // Verify Hip 90/90 Stretch shows title and detail text
        await expect(headerTitle).toHaveText('4. Hip 90/90 Stretch');
        await expect(cueEl).toHaveText('Sit tall, press the front shin down, feel the hip open');
    });
});
