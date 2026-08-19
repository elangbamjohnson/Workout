const { test, expect } = require('@playwright/test');

test.describe('Play Icon Theme-Scoped Hover Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(async () => {
            localStorage.clear();
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
        });
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 3 (Technical Skills): Hovering over play icons resolves to teal accent (#2dd4d4 / rgb(45, 212, 212))', async ({ page }) => {
        // Navigate to Day 3
        await page.locator('.day-card').nth(2).click();
        await expect(page.locator('.title-page')).toHaveText('Technical Skills Day');

        // Expand Section 1
        const sec1Card = page.locator('.item-card.type-technical').first();
        if (!await sec1Card.evaluate(el => el.classList.contains('expanded'))) {
            await sec1Card.locator('.item-header').click();
        }
        await expect(sec1Card).toHaveClass(/expanded/);

        const playIcons = sec1Card.locator('.nested-row .btn-demo-icon');
        const count = await playIcons.count();
        expect(count).toBeGreaterThan(0);

        const firstIcon = playIcons.first();
        await firstIcon.hover();
        await page.waitForTimeout(300);

        // Check computed background-color on hover
        const hoverBg = await firstIcon.evaluate(el => window.getComputedStyle(el).backgroundColor);
        // rgb(45, 212, 212) corresponds to #2dd4d4
        expect(hoverBg).toBe('rgb(45, 212, 212)');
        expect(hoverBg).not.toBe('rgb(255, 71, 87)'); // not the default red
    });

    test('Day 2 (Bag Power): Hovering over play icons resolves to gold/amber accent (#d99a3d / rgb(217, 154, 61))', async ({ page }) => {
        // Navigate to Day 2
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        // Expand Round 1
        const r1Card = page.locator('.item-card[data-id^="day2-ex"]').first();
        if (!await r1Card.evaluate(el => el.classList.contains('expanded'))) {
            await r1Card.locator('.item-header').click();
        }
        await expect(r1Card).toHaveClass(/expanded/);

        const playIcons = r1Card.locator('.nested-row .btn-demo-icon');
        const firstIcon = playIcons.first();
        await firstIcon.hover();
        await page.waitForTimeout(300);

        const hoverBg = await firstIcon.evaluate(el => window.getComputedStyle(el).backgroundColor);
        // rgb(217, 154, 61) corresponds to #d99a3d
        expect(hoverBg).toBe('rgb(217, 154, 61)');
        expect(hoverBg).not.toBe('rgb(255, 71, 87)');
    });

    test('Day 1 (Lower Body Power): Hovering over warm-up play icons resolves to orange/strength accent (#ee6c3f / rgb(238, 108, 63))', async ({ page }) => {
        // Navigate to Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand Warmup Card
        const warmupCard = page.locator('.item-card.type-strength').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }
        await expect(warmupCard).toHaveClass(/expanded/);

        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        const playIcon = hipRow.locator('.btn-demo-icon');
        await playIcon.hover();
        await page.waitForTimeout(300);

        const hoverBg = await playIcon.evaluate(el => window.getComputedStyle(el).backgroundColor);
        // rgb(238, 108, 63) corresponds to #ee6c3f
        expect(hoverBg).toBe('rgb(238, 108, 63)');
    });
});
