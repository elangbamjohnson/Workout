const { test, expect } = require('@playwright/test');

test.describe('Warmup Card Label & Expansion Verification Across All Days & Quick Sessions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 1: First card is Warm-up (not Lower Body Power) and expands/collapses on click', async ({ page }) => {
        await page.locator('.day-card').first().click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // First item card in the list
        const firstCard = page.locator('.item-card').first();
        const firstHeader = firstCard.locator('.item-header');
        
        // Verify title and badge
        await expect(firstCard.locator('.title-card')).toHaveText('Warm-up');
        await expect(firstCard.locator('.num-badge')).toHaveText('WU');

        // Initially collapsed
        await expect(firstCard).not.toHaveClass(/expanded/);

        // Click to expand
        await firstHeader.click();
        await expect(firstCard).toHaveClass(/expanded/);
        await expect(firstCard.locator('.nested-row').first()).toBeVisible();

        // Click again to collapse
        await firstHeader.click();
        await expect(firstCard).not.toHaveClass(/expanded/);
    });

    test('Days 1 to 5: Verify Warmup card labels and expand/collapse functionality', async ({ page }) => {
        const dayTitles = [
            { dayIndex: 0, dayNum: 1, expectedFirstCardTitle: 'Warm-up' },
            { dayIndex: 1, dayNum: 2, expectedFirstCardTitle: 'Warm-up' },
            { dayIndex: 2, dayNum: 3, expectedFirstCardTitle: 'Dynamic Warm-Up' }, // Day 3 is technical, sec1 is Dynamic Warm-Up
            { dayIndex: 3, dayNum: 4, expectedFirstCardTitle: 'Warm-up' },
            { dayIndex: 4, dayNum: 5, expectedFirstCardTitle: 'Warm-up' },
        ];

        for (const { dayIndex, dayNum, expectedFirstCardTitle } of dayTitles) {
            // Navigate to Day
            await page.locator('.day-card').nth(dayIndex).click();
            await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

            const firstCard = page.locator('.item-card').first();
            await expect(firstCard.locator('.title-card')).toHaveText(expectedFirstCardTitle);

            // Test Expand
            await firstCard.locator('.item-header').click();
            await expect(firstCard).toHaveClass(/expanded/);

            // Test Collapse
            await firstCard.locator('.item-header').click();
            await expect(firstCard).not.toHaveClass(/expanded/);

            // Return to Home
            await page.locator('.nav-back-btn').click();
            await expect(page.locator('#app-container')).toHaveClass(/is-home/);
        }
    });

    test('Quick Sessions: Verify Warmup card labels and expand/collapse functionality', async ({ page }) => {
        const quickSessions = [
            { name: 'Hybrid Boxing', expectedFirstTitle: 'Warm-up' },
            { name: 'Upper Body Power', expectedFirstTitle: 'Warm-up' },
            { name: 'Lower Body Power', expectedFirstTitle: 'Warm-up' },
            { name: 'Shadow Boxing', expectedFirstTitle: 'Warm-up' },
            { name: 'Full-Body Workout', expectedFirstTitle: 'Warm-up & Mobility' }
        ];

        for (const qs of quickSessions) {
            await page.locator('.qs-card').filter({ hasText: qs.name }).click();
            if (await page.locator('#btn-confirm-swap').isVisible()) {
                await page.locator('#btn-confirm-swap').click();
            }
            await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

            const firstCard = page.locator('.item-card').first();
            await expect(firstCard.locator('.title-card')).toHaveText(qs.expectedFirstTitle);

            // Expand
            await firstCard.locator('.item-header').click();
            await expect(firstCard).toHaveClass(/expanded/);

            // Collapse
            await firstCard.locator('.item-header').click();
            await expect(firstCard).not.toHaveClass(/expanded/);

            // Return to Home
            await page.locator('.nav-back-btn').click();
            await expect(page.locator('#app-container')).toHaveClass(/is-home/);
        }
    });
});
