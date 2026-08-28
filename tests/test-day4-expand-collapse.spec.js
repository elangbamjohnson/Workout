const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 4 & Cross-Day Expand All / Collapse All Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 4: Expand All opens all 11 cards and toggles button label correctly', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Verify total item cards count is 11 (Warm-up, R1-R8, Punch Power Circuit, Cool Down)
        const cards = page.locator('.item-card');
        await expect(cards).toHaveCount(11);

        const toggleBtn = page.locator('.content-header-row .btn-nav').filter({ hasText: /Expand all|Collapse all/ });
        await expect(toggleBtn).toBeVisible();
        await expect(toggleBtn).toHaveText('Expand all');

        // All 11 cards initially collapsed
        for (let i = 0; i < 11; i++) {
            await expect(cards.nth(i)).not.toHaveClass(/expanded/);
        }

        // Capture initial collapsed screenshot
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day4-collapsed-state.png'), fullPage: true });

        // Click "Expand all"
        await toggleBtn.click();
        await page.waitForTimeout(300);

        // Button label should toggle to "Collapse all"
        await expect(toggleBtn).toHaveText('Collapse all');

        // All 11 cards should now be expanded
        for (let i = 0; i < 11; i++) {
            await expect(cards.nth(i)).toHaveClass(/expanded/);
        }

        // Verify specific key sections are expanded
        const warmupCard = cards.filter({ hasText: /Warm-up/ }).first();
        await expect(warmupCard).toHaveClass(/expanded/);

        const finisherCard = cards.filter({ hasText: /Punch Power Circuit/ }).first();
        await expect(finisherCard).toHaveClass(/expanded/);

        const cooldownCard = cards.filter({ hasText: /Cool Down/ }).first();
        await expect(cooldownCard).toHaveClass(/expanded/);

        // Capture expanded screenshot
        await page.screenshot({ path: path.join(outDir, 'day4-expanded-state.png'), fullPage: true });

        // Click "Collapse all"
        await toggleBtn.click();
        await page.waitForTimeout(300);

        // Button label should toggle back to "Expand all"
        await expect(toggleBtn).toHaveText('Expand all');

        // All 11 cards should now be collapsed
        for (let i = 0; i < 11; i++) {
            await expect(cards.nth(i)).not.toHaveClass(/expanded/);
        }
    });

    test('Day 4: Individual card toggling updates the Expand all / Collapse all button state dynamically', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        const toggleBtn = page.locator('.content-header-row .btn-nav').filter({ hasText: /Expand all|Collapse all/ });
        const cards = page.locator('.item-card');

        await expect(toggleBtn).toHaveText('Expand all');

        // Manually expand all 11 cards
        for (let i = 0; i < 11; i++) {
            await cards.nth(i).locator('.item-header').click();
            await page.waitForTimeout(50);
        }

        // When all are expanded manually, button should show "Collapse all"
        await expect(toggleBtn).toHaveText('Collapse all');

        // Manually collapse 1 card (first card)
        await cards.first().locator('.item-header').click();
        await page.waitForTimeout(50);

        // Button should switch back to "Expand all"
        await expect(toggleBtn).toHaveText('Expand all');
    });

    test('All Days 1-5: Expand all and Collapse all work across every workout day', async ({ page }) => {
        for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
            await page.locator('.day-card').nth(dayIdx).click();
            await page.waitForTimeout(200);

            const toggleBtn = page.locator('.content-header-row .btn-nav').filter({ hasText: /Expand all|Collapse all/ });
            const cards = page.locator('.item-card');
            const count = await cards.count();
            expect(count).toBeGreaterThan(0);

            // Initially Expand all
            await expect(toggleBtn).toHaveText('Expand all');

            // Click Expand all
            await toggleBtn.click();
            await page.waitForTimeout(200);
            await expect(toggleBtn).toHaveText('Collapse all');

            for (let i = 0; i < count; i++) {
                await expect(cards.nth(i)).toHaveClass(/expanded/);
            }

            // Click Collapse all
            await toggleBtn.click();
            await page.waitForTimeout(200);
            await expect(toggleBtn).toHaveText('Expand all');

            for (let i = 0; i < count; i++) {
                await expect(cards.nth(i)).not.toHaveClass(/expanded/);
            }

            // Back to home
            await page.evaluate(() => window.renderHome());
            await page.waitForTimeout(200);
        }
    });

    test('Quick Sessions: Expand all and Collapse all work properly', async ({ page }) => {
        // Navigate to Quick Sessions tab if available or test quick workouts
        const qsCards = page.locator('.qs-card');
        const qsCount = await qsCards.count();
        if (qsCount > 0) {
            await qsCards.first().click();
            await page.waitForTimeout(200);

            const toggleBtn = page.locator('.content-header-row .btn-nav').filter({ hasText: /Expand all|Collapse all/ });
            const cards = page.locator('.item-card');
            const count = await cards.count();

            if (count > 0 && await toggleBtn.count() > 0) {
                await expect(toggleBtn).toHaveText('Expand all');
                await toggleBtn.click();
                await page.waitForTimeout(200);
                await expect(toggleBtn).toHaveText('Collapse all');

                for (let i = 0; i < count; i++) {
                    await expect(cards.nth(i)).toHaveClass(/expanded/);
                }

                await toggleBtn.click();
                await page.waitForTimeout(200);
                await expect(toggleBtn).toHaveText('Expand all');
            }
        }
    });
});
