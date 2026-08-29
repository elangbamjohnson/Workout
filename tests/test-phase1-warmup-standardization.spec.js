const { test, expect } = require('@playwright/test');

test.describe('Phase 1: Warm-Up Timer Standardization (Days 1, 2, 4, 5)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
            window.__spokenPrompts = [];
            const origSpeak = window.speakAlert;
            window.speakAlert = function(text) {
                window.__spokenPrompts.push(text);
                if (origSpeak) origSpeak(text);
            };
        });
    });

    test('Day 1 Warm-up: Modal header shows total countdown, display shows drill countdown (3:00), and 60s rest transition', async ({ page }) => {
        await page.locator('.day-card').nth(0).click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const startBtn = wuCard.locator('button.btn-large', { hasText: 'Start Warm-up Session' });
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Fast-forward 5s countdown
        await page.waitForTimeout(5500);

        // Header shows WARM UP : <total countdown>
        const subHeader = timerModal.locator('.timer-header h3');
        await expect(subHeader).toContainText('WARM UP : 7:');

        // Drill title
        const mainTitle = timerModal.locator('.timer-header h2');
        await expect(mainTitle).toContainText('1. Jump Rope');

        // Display shows drill countdown (3:00 -> 0:00)
        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/3:00|2:59/);

        // Advance to rest phase
        await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();

        // Rest phase verification
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Barbell deadlift coming up');
        await expect(timerDisplay).toHaveText(/1:00|0:59/);

        // Verify spoken rest cue
        const spoken = await page.evaluate(() => window.__spokenPrompts);
        expect(spoken.some(s => s.includes('Barbell deadlift coming up'))).toBe(true);

        // Skip rest to finish
        await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toHaveClass(/hidden/);
    });

    test('Day 2 Warm-up: Modal header shows total countdown (6:30), display shows drill countdown (2:00), and 60s rest transition', async ({ page }) => {
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const startBtn = wuCard.locator('button.btn-large', { hasText: 'Start Warm-up Session' });
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await page.waitForTimeout(5500);

        const subHeader = timerModal.locator('.timer-header h3');
        await expect(subHeader).toContainText('WARM UP : 6:');

        const mainTitle = timerModal.locator('.timer-header h2');
        await expect(mainTitle).toContainText('1. Jump Rope');

        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/2:00|1:59/);

        // Advance to rest phase
        await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Power jabs coming up in Round 1');

        const spoken = await page.evaluate(() => window.__spokenPrompts);
        expect(spoken.some(s => s.includes('Power jabs coming up'))).toBe(true);

        await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toHaveClass(/hidden/);
    });

    test('Day 4 Warm-up: Modal header shows total countdown (7:35), display shows drill countdown (3:00), and 60s rest transition', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const startBtn = wuCard.locator('button.btn-large', { hasText: 'Start Warm-up Session' });
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await page.waitForTimeout(5500);

        const subHeader = timerModal.locator('.timer-header h3');
        await expect(subHeader).toContainText('WARM UP : 7:');

        const mainTitle = timerModal.locator('.timer-header h2');
        await expect(mainTitle).toContainText('1. Jump Rope');

        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/3:00|2:59/);

        await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Plyometric push-ups coming up');

        const spoken = await page.evaluate(() => window.__spokenPrompts);
        expect(spoken.some(s => s.includes('Plyometric push-ups coming up'))).toBe(true);

        await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toHaveClass(/hidden/);
    });

    test('Day 5 Warm-up: Modal header shows total countdown (5:30), display shows drill countdown (2:00), and 60s rest transition', async ({ page }) => {
        await page.locator('.day-card').nth(4).click();
        await expect(page.locator('.title-page')).toHaveText('Conditioning Bag Day');

        const wuCard = page.locator('.item-card').first();
        await wuCard.locator('.item-header').click();

        const startBtn = wuCard.locator('button.btn-large', { hasText: 'Start Warm-up Session' });
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        await page.waitForTimeout(5500);

        const subHeader = timerModal.locator('.timer-header h3');
        await expect(subHeader).toContainText('WARM UP : 5:');

        const mainTitle = timerModal.locator('.timer-header h2');
        await expect(mainTitle).toContainText('1. Jump Rope');

        const timerDisplay = timerModal.locator('.timer-display');
        await expect(timerDisplay).toHaveText(/2:00|1:59/);

        await timerModal.locator('button.btn-large', { hasText: 'Finish Workout' }).click();

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue')).toContainText('Technical combination build coming up in Round 1');

        const spoken = await page.evaluate(() => window.__spokenPrompts);
        expect(spoken.some(s => s.includes('Technical combination build coming up'))).toBe(true);

        await timerModal.locator('button.btn-large', { hasText: 'Skip Rest' }).click();
        await expect(timerModal).toHaveClass(/hidden/);
    });
});
