const { test, expect } = require('@playwright/test');

test.describe('Rest & Recovery Banner (Days 6 & 7 Replacement)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Desktop (1280px): Exactly 5 day cards and Rest & Recovery banner spanning remaining columns', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });

        const dayCards = page.locator('.days-grid .day-card');
        await expect(dayCards).toHaveCount(5);

        // Check cards are Days 1 through 5
        for (let i = 1; i <= 5; i++) {
            await expect(dayCards.nth(i - 1)).toContainText(`DAY ${i}`);
        }

        // Rest & Recovery Banner
        const banner = page.locator('.rest-recovery-banner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Days 6 & 7 — Rest & Recovery');
        await expect(banner).toContainText("Active mobility & full rest. You've earned it — see you next week.");
        await expect(banner.locator('.rest-pill-badge')).toHaveText('REST');
        await expect(banner.locator('.rest-icon-box')).toHaveText('😴');

        // Check no "0 exercises" in the grid
        const gridText = await page.locator('.days-grid').innerText();
        expect(gridText).not.toContain('0 exercises');

        // Check no "View" button inside the banner
        await expect(banner.locator('text=View')).toBeHidden();

        // Check banner is non-interactive (not a link)
        const tagName = await banner.evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('div');

        // Check left border accent
        const borderLeftColor = await banner.evaluate(el => window.getComputedStyle(el).borderLeftColor);
        expect(borderLeftColor).toBe('rgb(100, 116, 139)'); // #64748b

        // Check desktop height
        const bannerBox = await banner.boundingBox();
        expect(bannerBox.height).toBeGreaterThanOrEqual(80);

        // Check Row 2 layout: Day 5 (index 4) and banner share the same Y position on 4-col desktop
        const day5Box = await dayCards.nth(4).boundingBox();
        expect(Math.abs(day5Box.y - bannerBox.y)).toBeLessThan(10);
    });

    test('Mobile (375px): Days 1-5 stack vertically with full-width Rest & Recovery banner', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        const dayCards = page.locator('.days-grid .day-card');
        await expect(dayCards).toHaveCount(5);

        const banner = page.locator('.rest-recovery-banner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Days 6 & 7 — Rest & Recovery');
        await expect(banner).toContainText("Active mobility & full rest");
        await expect(banner.locator('.rest-pill-badge')).toHaveText('REST');

        // Check banner is below Day 5
        const day5Box = await dayCards.nth(4).boundingBox();
        const bannerBox = await banner.boundingBox();
        expect(bannerBox.y).toBeGreaterThan(day5Box.y);

        // Check mobile height ~80px
        expect(bannerBox.height).toBeGreaterThanOrEqual(70);
    });

    test('Clicking Day 1 navigates to Day 1 workout correctly', async ({ page }) => {
        await page.locator('.days-grid .day-card').first().click();
        await expect(page.locator('.day-header-card .label-small')).toHaveText('DAY 1');
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');
    });
});
