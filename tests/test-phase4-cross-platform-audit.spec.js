const { test, expect } = require('@playwright/test');

const viewports = [
    { name: 'iPhone-SE', width: 375, height: 667 },
    { name: 'iPhone-14', width: 390, height: 844 },
    { name: 'Pixel-7', width: 412, height: 915 }
];

test.describe('Phase 4: Cross-Platform Multi-Device Mobile Screen Audits (Days 1–5)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    for (const vp of viewports) {
        test(`Home Grid Layout and Viewport Integrity on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto('/');

            // Check no unexpected horizontal overflow on body
            const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
            const windowInnerWidth = await page.evaluate(() => window.innerWidth);
            expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1); // 1px tolerance for subpixel rendering

            // All 5 day cards render
            const dayCards = page.locator('.day-card');
            await expect(dayCards).toHaveCount(5);

            // Day 5 Conditioning badge displays properly
            const day5Card = dayCards.nth(4);
            await expect(day5Card.locator('.type-badge')).toContainText(/conditioning/i);
        });

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            const dayNumber = dayIndex + 1;
            test(`Day ${dayNumber} Layout, Cards & Viewport Integrity on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto('/');
                await page.locator('.day-card').nth(dayIndex).click();

                // Wait for page header to be visible
                await expect(page.locator('.title-page')).toBeVisible();

                // Check no horizontal overflow
                const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
                const windowInnerWidth = await page.evaluate(() => window.innerWidth);
                expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1);

                // Check header elements
                await expect(page.locator('.day-header-card, .card-hero')).toBeVisible();

                // Expand all cards
                const toggleBtn = page.locator('.content-header-row .btn-nav');
                if (await toggleBtn.isVisible()) {
                    await toggleBtn.click();
                }

                // Check Warm-up card
                const warmupCard = page.locator('.item-card').first();
                await expect(warmupCard).toBeVisible();
                await expect(warmupCard.locator('.title-card')).toContainText(/Warm-up|Dynamic Warm-Up/i);

                // If Day 1, 2, 4 -> Check Cool Down card
                if (dayNumber === 1 || dayNumber === 2 || dayNumber === 4) {
                    const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
                    await expect(cdCard).toBeVisible();
                    await expect(cdCard.locator('.title-card')).toHaveText('Cool Down');
                    await expect(cdCard.locator('.nested-row')).toHaveCount(3);
                }

                // Check Complete Session button is visible at bottom
                const completeBtn = page.locator('.btn-complete-session');
                await expect(completeBtn).toBeVisible();
            });
        }
    }

    test('PWA Offline Cache and Manifest Integrity', async ({ page }) => {
        await page.goto('/');

        // Verify service worker registers
        const swRegistered = await page.evaluate(async () => {
            if ('serviceWorker' in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                return !!reg;
            }
            return false;
        });
        expect(swRegistered).toBe(true);

        // Verify manifest link
        const manifestLink = page.locator('link[rel="manifest"]');
        await expect(manifestLink).toHaveAttribute('href', /manifest\.json/);
    });
});
