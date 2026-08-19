const { test, expect } = require('@playwright/test');

test.describe('Quick Sessions Responsive Layout (Grid Desktop / Scroll Mobile)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Desktop (1280px): Renders 6-column grid with square cards and scaled typography', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });

        const container = page.locator('.qs-scroll-container');
        await expect(container).toBeVisible();

        // Computed display should be grid
        const containerDisplay = await container.evaluate(el => window.getComputedStyle(el).display);
        expect(containerDisplay).toBe('grid');

        // Check overflow-x is visible
        const overflowX = await container.evaluate(el => window.getComputedStyle(el).overflowX);
        expect(overflowX).toBe('visible');

        // Check cards count
        const cards = page.locator('.qs-card');
        await expect(cards).toHaveCount(6);

        // Check all 6 cards are on the same vertical offset (single row)
        const firstCardBox = await cards.nth(0).boundingBox();
        const lastCardBox = await cards.nth(5).boundingBox();
        expect(Math.abs(firstCardBox.y - lastCardBox.y)).toBeLessThan(2);

        // Check cards are square (aspect-ratio 1:1)
        for (let i = 0; i < 6; i++) {
            const box = await cards.nth(i).boundingBox();
            expect(box.width).toBeGreaterThan(150);
            expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(2); // square within 2px subpixel rounding
        }

        // Check scaled typography on desktop
        const firstEmoji = cards.first().locator('.qs-card-emoji');
        const emojiFontSize = await firstEmoji.evaluate(el => window.getComputedStyle(el).fontSize);
        expect(emojiFontSize).toBe('40px');

        const firstTitle = cards.first().locator('.qs-card-title');
        const titleFontSize = await firstTitle.evaluate(el => window.getComputedStyle(el).fontSize);
        const titleFontWeight = await firstTitle.evaluate(el => window.getComputedStyle(el).fontWeight);
        expect(titleFontSize).toBe('16px');
        expect(parseInt(titleFontWeight)).toBeGreaterThanOrEqual(700);

        const firstDuration = cards.first().locator('.qs-card-duration');
        const durationFontSize = await firstDuration.evaluate(el => window.getComputedStyle(el).fontSize);
        expect(durationFontSize).toBe('13px');

        const firstCardPadding = await cards.first().evaluate(el => window.getComputedStyle(el).paddingTop);
        expect(firstCardPadding).toBe('16px');

        // Focus pill position
        const firstPill = cards.first().locator('.qs-pill');
        const pillLeft = await firstPill.evaluate(el => window.getComputedStyle(el).left);
        expect(pillLeft).toBe('16px');

        // Test clicking a card opens session
        await cards.first().click();
        const swapBanner = page.locator('#swap-banner');
        await expect(swapBanner).toBeVisible();
    });

    test('Tablet (768px): Applies 6-column grid layout with square cards', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });

        const container = page.locator('.qs-scroll-container');
        const containerDisplay = await container.evaluate(el => window.getComputedStyle(el).display);
        expect(containerDisplay).toBe('grid');

        const cards = page.locator('.qs-card');
        await expect(cards).toHaveCount(6);

        // Check single row
        const firstCardBox = await cards.nth(0).boundingBox();
        const lastCardBox = await cards.nth(5).boundingBox();
        expect(Math.abs(firstCardBox.y - lastCardBox.y)).toBeLessThan(2);

        // Check square aspect ratio
        for (let i = 0; i < 6; i++) {
            const box = await cards.nth(i).boundingBox();
            expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(2);
        }
    });

    test('Mobile (375px): Keeps horizontal scroll with fixed 160px cards', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        const container = page.locator('.qs-scroll-container');
        const containerDisplay = await container.evaluate(el => window.getComputedStyle(el).display);
        expect(containerDisplay).toBe('flex');

        const overflowX = await container.evaluate(el => window.getComputedStyle(el).overflowX);
        expect(overflowX).toBe('auto');

        const cards = page.locator('.qs-card');
        await expect(cards).toHaveCount(6);

        // First card fixed 160px size
        const firstCardBox = await cards.first().boundingBox();
        expect(Math.round(firstCardBox.width)).toBe(160);
        expect(Math.round(firstCardBox.height)).toBe(160);

        // Mobile typography
        const firstEmoji = cards.first().locator('.qs-card-emoji');
        const emojiFontSize = await firstEmoji.evaluate(el => window.getComputedStyle(el).fontSize);
        expect(emojiFontSize).toBe('28px');

        const firstTitle = cards.first().locator('.qs-card-title');
        const titleFontSize = await firstTitle.evaluate(el => window.getComputedStyle(el).fontSize);
        expect(titleFontSize).toBe('13px');
    });
});
