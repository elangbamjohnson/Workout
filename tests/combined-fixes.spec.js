const { test, expect } = require('@playwright/test');

test.describe('Combined Fixes Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Fix 1: btn-demo has minimum 44px height and flex layout on Days 2 & 3', async ({ page }) => {
        // Navigate to Day 2 (Technical)
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Expand all item cards on Day 2 to reveal all demo buttons
        const countHeaders = await page.locator('.item-header').count();
        for (let i = 0; i < countHeaders; i++) {
            await page.locator('.item-header').nth(i).click();
        }

        const demoBtns = page.locator('.btn-demo');
        const count = await demoBtns.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const btn = demoBtns.nth(i);
            await expect(btn).toBeVisible();
            const box = await btn.boundingBox();
            expect(box.height).toBeGreaterThanOrEqual(44);
            const display = await btn.evaluate(el => window.getComputedStyle(el).display);
            expect(display).toBe('flex');
            const minHeight = await btn.evaluate(el => window.getComputedStyle(el).minHeight);
            expect(minHeight).toBe('44px');
        }

        // Navigate back to Home and go to Day 3 (Heavy Bag)
        await page.locator('.nav-back-btn').click();
        await expect(page.locator('#app-container')).toHaveClass(/is-home/);
        await page.locator('.day-card').nth(2).click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Expand all item cards on Day 3
        const countHeadersD3 = await page.locator('.item-header').count();
        for (let i = 0; i < countHeadersD3; i++) {
            await page.locator('.item-header').nth(i).click();
        }

        const demoBtnsD3 = page.locator('.btn-demo');
        const countD3 = await demoBtnsD3.count();
        expect(countD3).toBeGreaterThan(0);

        for (let i = 0; i < countD3; i++) {
            const btn = demoBtnsD3.nth(i);
            await expect(btn).toBeVisible();
            const box = await btn.boundingBox();
            expect(box.height).toBeGreaterThanOrEqual(44);
            const minHeight = await btn.evaluate(el => window.getComputedStyle(el).minHeight);
            expect(minHeight).toBe('44px');
        }
    });

    test('Fix 2: Quick Sessions row has exactly 6 cards and no Active Recovery card', async ({ page }) => {
        const quickCards = page.locator('.qs-card');
        await expect(quickCards).toHaveCount(6);

        const cardTexts = await quickCards.allInnerTexts();
        const combinedText = cardTexts.join(' ');
        expect(combinedText).not.toContain('Active Recovery');
        expect(combinedText).toContain('Hybrid Boxing');
        expect(combinedText).toContain('Upper Body Power');
        expect(combinedText).toContain('Lower Body Power');
        expect(combinedText).toContain('Shadow Boxing');
        expect(combinedText).toContain('HIIT Boxing');
        expect(combinedText).toContain('Full-Body Workout');
    });

    test('Fix 3: Shadow Boxing details are styled with subtitle and bullets for all 5 rounds', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Expand Shadow Boxing Rounds section (it's the 2nd item card after warmup)
        await page.locator('.item-card[data-id="shadow-main"] .item-header, .item-card').nth(1).locator('.item-header').click();

        const roundTitles = page.locator('.shadow-round-title');
        await expect(roundTitles).toHaveCount(5);

        // Check Round 1 details
        await expect(roundTitles.nth(0)).toHaveText('Round 1 — Footwork + Basic Combos');
        const r1Subtitle = page.locator('.shadow-subtitle').nth(0);
        await expect(r1Subtitle).toContainText('Stay light');
        const r1Bullets = page.locator('.shadow-bullets').nth(0).locator('li');
        await expect(r1Bullets).toHaveCount(6);

        // Check Round 2 details
        await expect(roundTitles.nth(1)).toHaveText('Round 2 — Head Movement + Counters');
        const r2Subtitle = page.locator('.shadow-subtitle').nth(1);
        await expect(r2Subtitle).toContainText('moving target');
        const r2Bullets = page.locator('.shadow-bullets').nth(1).locator('li');
        await expect(r2Bullets).toHaveCount(6);

        // Check Round 3 details
        await expect(roundTitles.nth(2)).toHaveText('Round 3 — Defense + Combos');
        const r3Subtitle = page.locator('.shadow-subtitle').nth(2);
        await expect(r3Subtitle).toContainText('Absorb and fire back');
        const r3Bullets = page.locator('.shadow-bullets').nth(2).locator('li');
        await expect(r3Bullets).toHaveCount(6);

        // Check Round 4 details
        await expect(roundTitles.nth(3)).toHaveText('Round 4 — Full Speed Free Flow');
        const r4Subtitle = page.locator('.shadow-subtitle').nth(3);
        await expect(r4Subtitle).toContainText('No instructions');
        const r4Bullets = page.locator('.shadow-bullets').nth(3).locator('li');
        await expect(r4Bullets).toHaveCount(6);

        // Check Round 5 details
        await expect(roundTitles.nth(4)).toHaveText('Round 5 — Cool Down Shadow');
        const r5Subtitle = page.locator('.shadow-subtitle').nth(4);
        await expect(r5Subtitle).toContainText('Breathe and wind down');
        const r5Bullets = page.locator('.shadow-bullets').nth(4).locator('li');
        await expect(r5Bullets).toHaveCount(5);
    });

    test('Fix 4: Accessibility attributes and contrast compliance', async ({ page }) => {
        // Muted text color is #9ca3af (rgb(156, 163, 175))
        const textMuted = await page.evaluate(() => {
            return getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
        });
        expect(textMuted.toLowerCase()).toBe('#9ca3af');

        // Check navigation and icon button aria-labels
        const infoBtn = page.locator('.header-info-btn');
        await expect(infoBtn).toHaveAttribute('aria-label', 'About Strike First');

        // Go to Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        const backBtn = page.locator('.nav-back-btn');
        await expect(backBtn).toHaveAttribute('aria-label', 'Back to Week');

        const prevArrow = page.locator('.nav-arrow-btn[aria-label="Previous day"]');
        await expect(prevArrow).toBeAttached();

        const nextArrow = page.locator('.nav-arrow-btn[aria-label="Next day"]');
        await expect(nextArrow).toBeAttached();

        // Check item header aria-label and aria-expanded
        const itemHeader = page.locator('.item-header').first();
        await expect(itemHeader).toHaveAttribute('aria-expanded');
        await expect(itemHeader).toHaveAttribute('aria-label');
    });
});
