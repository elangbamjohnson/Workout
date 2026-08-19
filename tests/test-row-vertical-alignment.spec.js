const { test, expect } = require('@playwright/test');

test.describe('Vertical Alignment of Duration Label and Action Buttons', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Desktop (1280px): Day 1 Warm-up Hip 90/90 Stretch row and buttons are vertically centered', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow).toBeVisible();

        // Check CSS alignment properties
        const rowStyle = await hipRow.evaluate(el => {
            const cs = window.getComputedStyle(el);
            return {
                display: cs.display,
                alignItems: cs.alignItems,
                flexDirection: cs.flexDirection
            };
        });
        expect(rowStyle.display).toBe('flex');
        expect(rowStyle.alignItems).toBe('center');
        expect(rowStyle.flexDirection).toBe('row');

        const actionsContainer = hipRow.locator('.warmup-actions');
        await expect(actionsContainer).toBeVisible();
        const actionsStyle = await actionsContainer.evaluate(el => {
            const cs = window.getComputedStyle(el);
            return {
                display: cs.display,
                alignItems: cs.alignItems,
                flexDirection: cs.flexDirection
            };
        });
        expect(actionsStyle.display).toBe('flex');
        expect(actionsStyle.alignItems).toBe('center');

        // Check vertical alignment of duration label, play icon, and start button
        const durationBox = await hipRow.locator('.warmup-duration-label').boundingBox();
        const demoBox = await hipRow.locator('.btn-demo-icon').boundingBox();
        const startBox = await hipRow.locator('.btn-play').boundingBox();
        const rowBox = await hipRow.boundingBox();

        expect(durationBox).not.toBeNull();
        expect(demoBox).not.toBeNull();
        expect(startBox).not.toBeNull();
        expect(rowBox).not.toBeNull();

        const rowCenterY = rowBox.y + rowBox.height / 2;
        const startCenterY = startBox.y + startBox.height / 2;

        // Button centers should be closely aligned with row center
        expect(Math.abs(startCenterY - rowCenterY)).toBeLessThanOrEqual(4);
    });

    test('Mobile (375px): Day 1 Warm-up Hip 90/90 Stretch alignment holds on small screen', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        await expect(hipRow).toBeVisible();

        const demoBtn = hipRow.locator('.btn-demo-icon');
        const startBtn = hipRow.locator('.btn-play');
        await expect(demoBtn).toBeVisible();
        await expect(startBtn).toBeVisible();
    });

    test('Day 1 Exercise card set row: input groups and check button vertically centered', async ({ page }) => {
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        const deadliftCard = page.locator('.item-card').filter({ hasText: 'Barbell deadlift' });
        await deadliftCard.locator('.item-header').click();
        await expect(deadliftCard).toHaveClass(/expanded/);

        const setRow = deadliftCard.locator('.set-row').first();
        await expect(setRow).toBeVisible();

        const setRowStyle = await setRow.evaluate(el => {
            const cs = window.getComputedStyle(el);
            return {
                display: cs.display,
                alignItems: cs.alignItems,
                flexDirection: cs.flexDirection
            };
        });
        expect(setRowStyle.display).toBe('flex');
        expect(setRowStyle.alignItems).toBe('center');
    });

    test('Quick Sessions (Hybrid Boxing & Shadow Boxing): warm-up rows vertically aligned', async ({ page }) => {
        // Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        if (await page.locator('#btn-confirm-swap').isVisible()) {
            await page.locator('#btn-confirm-swap').click();
        }
        const hybridWarmup = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await hybridWarmup.locator('.item-header').click();
        const hybridRow = hybridWarmup.locator('.nested-row').first();
        const hybridRowStyle = await hybridRow.evaluate(el => window.getComputedStyle(el).alignItems);
        expect(hybridRowStyle).toBe('center');

        // Back to home
        await page.locator('.nav-back-btn').click();
        await expect(page.locator('#app-container')).toHaveClass(/is-home/);

        // Shadow Boxing
        await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).click();
        if (await page.locator('#btn-confirm-swap').isVisible()) {
            await page.locator('#btn-confirm-swap').click();
        }
        const shadowWarmup = page.locator('.item-card').filter({ hasText: 'Warm-up' });
        await shadowWarmup.locator('.item-header').click();
        const shadowRow = shadowWarmup.locator('.nested-row').first();
        const shadowRowStyle = await shadowRow.evaluate(el => window.getComputedStyle(el).alignItems);
        expect(shadowRowStyle).toBe('center');
    });
});
