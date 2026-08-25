const { test, expect } = require('@playwright/test');

test.describe('Day 1 Warm-up Session Timer Fixes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Session timer: No overlapping Get ready audio before first exercise', async ({ page }) => {
        const logs = [];
        page.on('console', msg => {
            if (msg.text().includes('[AUDIO]')) {
                logs.push(msg.text().replace('[AUDIO] speakAlert called with: ', '').trim());
            }
        });

        await page.clock.install();

        await page.evaluate(() => {
            const originalSpeak = window.speakAlert;
            window.speakAlert = function(text) {
                console.log('[AUDIO] speakAlert called with: ' + text);
                if (originalSpeak) originalSpeak(text);
            };
        });

        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        await warmupCard.locator('button.btn-large').filter({ hasText: 'Start Warm-up Session' }).click();

        for (let i = 0; i < 8; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(10);
        }

        const joined = logs.join('|');
        expect(joined).not.toContain('Get ready for Warm-up');
        expect(joined).toContain('Warm-up started');
    });

    test('Session timer: Phase progress bar is visible and starts near 100%', async ({ page }) => {
        await page.clock.install();

        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        await warmupCard.locator('button.btn-large').filter({ hasText: 'Start Warm-up Session' }).click();

        for (let i = 0; i < 7; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(20);
        }

        const modal = page.locator('#timer-modal');
        await expect(modal).not.toHaveClass(/hidden/);

        const phaseBar = modal.locator('.phase-progress-bar-fill');
        await expect(phaseBar).toBeVisible();

        const widthPct = await phaseBar.evaluate(el => parseFloat(el.style.width));
        expect(widthPct).toBeGreaterThan(90);
    });

    test('Session timer: Phase progress bar drains as time passes within an exercise', async ({ page }) => {
        await page.clock.install();

        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        await warmupCard.locator('button.btn-large').filter({ hasText: 'Start Warm-up Session' }).click();

        for (let i = 0; i < 7; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(20);
        }

        const modal = page.locator('#timer-modal');
        const phaseBar = modal.locator('.phase-progress-bar-fill');
        await expect(phaseBar).toBeVisible();

        const widthBefore = await phaseBar.evaluate(el => parseFloat(el.style.width));

        for (let i = 0; i < 30; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(10);
        }

        const widthAfter = await phaseBar.evaluate(el => parseFloat(el.style.width));
        expect(widthAfter).toBeLessThan(widthBefore - 10);
    });
});
