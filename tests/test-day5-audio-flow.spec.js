const { test, expect } = require('@playwright/test');

test.describe('Day 5 Audio Prompt Natural Flow & Cutoff Prevention', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();

        await page.evaluate(() => {
            window.spokenCues = [];
            window.speakAlert = function(text) {
                window.spokenCues.push(text);
            };
            window.Audio = class {
                play() { return Promise.resolve(); }
                pause() {}
                load() {}
            };
        });
    });

    test('All Day 5 sections & rounds 1-7 start cleanly without audio cutoff or overlapping speech', async ({ page }) => {
        // Navigate to Day 5
        await page.locator('.day-card').nth(4).click();
        await expect(page.locator('.nav-day-title')).toContainText('Day 5');

        // Test Round 1 audio start
        await page.evaluate(() => {
            window.spokenCues = [];
            window.startRoundTimer(5, 'day5-ex1', 180, 60, 'Technical Combination Build', '');
        });

        // Fast-forward countdown
        await page.waitForTimeout(6200);

        let cues = await page.evaluate(() => window.spokenCues);

        // Verify the countdown spoke 5, 4, 3, 2, 1, Go!
        expect(cues).toContain('5');
        expect(cues).toContain('4');
        expect(cues).toContain('3');
        expect(cues).toContain('2');
        expect(cues).toContain('1');
        expect(cues).toContain('Go');

        // Verify that "Get ready for Technical Combination Build." was NOT spoken at 0s (which caused cutoff)
        expect(cues).not.toContain('Get ready for Technical Combination Build.');

        // Verify that Round 1 initial coach cue was cleanly spoken
        expect(cues).toContain('1-2 — one minute. Focus on perfect mechanics, not power.');

        // Close timer
        await page.evaluate(() => window.Timer.close());

        // Test Round 2
        await page.evaluate(() => {
            window.spokenCues = [];
            window.startRoundTimer(5, 'day5-ex2', 180, 60, 'Power Singles', '');
        });
        await page.waitForTimeout(6200);
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Go');
        expect(cues).not.toContain('Get ready for Power Singles.');
        expect(cues.some(s => s.startsWith('Power jabs.'))).toBeTruthy();
        await page.evaluate(() => window.Timer.close());

        // Test Round 3
        await page.evaluate(() => {
            window.spokenCues = [];
            window.startRoundTimer(5, 'day5-ex3', 180, 60, 'Body Power + Level Change', '');
        });
        await page.waitForTimeout(6200);
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Go');
        expect(cues).not.toContain('Get ready for Body Power + Level Change.');
        expect(cues.some(s => s.includes('3 body'))).toBeTruthy();
        await page.evaluate(() => window.Timer.close());

        // Test Round 7 (Cool-Down)
        await page.evaluate(() => {
            window.spokenCues = [];
            window.startRoundTimer(5, 'day5-ex7', 120, 0, 'Cool-Down Shadowboxing', '');
        });
        await page.waitForTimeout(6200);
        cues = await page.evaluate(() => window.spokenCues);
        expect(cues).toContain('Go');
        expect(cues).not.toContain('Get ready for Cool-Down Shadowboxing.');
        expect(cues.some(s => s.startsWith('Light shadowboxing.'))).toBeTruthy();
        await page.evaluate(() => window.Timer.close());
    });
});
