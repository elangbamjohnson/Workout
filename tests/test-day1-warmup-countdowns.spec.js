const { test, expect } = require('@playwright/test');

test.describe('Day 1 Warm-up Session Timer - 5s Countdowns & 5s Transitions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('All 8 workouts have 5s countdown and 5s get ready transition', async ({ page }) => {
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

        // 5s initial countdown (fast forward 6s to start round)
        for (let i = 0; i < 6; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(5);
        }

        // Verify Jump rope started
        expect(logs.some(l => l.includes('Warm-up started. Jump rope'))).toBeTruthy();

        // Fast forward through Jump Rope (180s total: countdown at 175-179, transition at 180, JJ at 185)
        for (let i = 0; i < 185; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(2);
        }

        // Verify Jump Rope countdown and transition to Jumping Jacks
        expect(logs).toContain('5');
        expect(logs).toContain('4');
        expect(logs).toContain('3');
        expect(logs).toContain('2');
        expect(logs).toContain('1');
        expect(logs).toContain('Get ready for jumping jacks.');
        expect(logs.some(l => l.includes('Jumping jacks. Full arm extension'))).toBeTruthy();

        // Fast forward through rest of session (455 total - 185 = 270s + buffer)
        for (let i = 0; i < 280; i++) {
            await page.clock.fastForward('00:01');
            await page.waitForTimeout(2);
        }

        // Verify transitions for all workouts
        expect(logs).toContain('Get ready for mountain climbers.');
        expect(logs).toContain('Get ready for hip 90 stretch.');
        expect(logs).toContain('Get ready for glute bridges.');
        expect(logs).toContain('Get ready for arm circles.');
        expect(logs).toContain('Get ready for bodyweight squats.');
        expect(logs).toContain('Get ready for inchworm.');

        // Verify completion
        expect(logs.some(l => l.includes('Warm-up complete'))).toBeTruthy();
    });
});
