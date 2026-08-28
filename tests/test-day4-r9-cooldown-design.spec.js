const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 4 R-9 and Cool Down Design Consistency', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('R-9 Punch Power Circuit and Cool Down have checkboxes on the right and consistent theme colors when selected', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');

        // Expand R9 (Punch Power Circuit)
        const r9Card = page.locator('.item-card[data-id="upper-finisher"]');
        await r9Card.locator('.item-header').click();
        await expect(r9Card).toHaveClass(/expanded/);

        const r9Rows = r9Card.locator('.nested-row');
        await expect(r9Rows).toHaveCount(2);

        // Verify R-9 Row 1 layout: set-num on left, combo in middle, checkmark on right
        for (let i = 0; i < 2; i++) {
            const row = r9Rows.nth(i);
            const numEl = row.locator('.set-num');
            await expect(numEl).toHaveText(String(i + 1));

            const checkBtn = row.locator('.btn-check');
            await expect(checkBtn).toBeVisible();

            // Verify check button is positioned after content (on the right)
            const numBox = await numEl.boundingBox();
            const checkBtnBox = await checkBtn.boundingBox();
            expect(checkBtnBox.x).toBeGreaterThan(numBox.x);
        }

        // Click R-9 Row 1 check button
        await r9Rows.first().locator('.btn-check').click();
        await expect(r9Rows.first()).toHaveClass(/checked/);

        // Check selected styling on R9 Row 1
        const r9RowBorder = await r9Rows.first().evaluate(el => window.getComputedStyle(el).borderColor);
        expect(r9RowBorder).toBe('rgb(238, 108, 63)');

        const r9NumBg = await r9Rows.first().locator('.set-num').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(r9NumBg).toBe('rgb(238, 108, 63)');

        const r9CheckBg = await r9Rows.first().locator('.btn-check').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(r9CheckBg).toBe('rgb(238, 108, 63)');

        // Expand Cool Down Card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        const cdRows = cdCard.locator('.nested-row');
        await expect(cdRows).toHaveCount(3);

        // Verify Cool Down Rows layout: set-num on left, stretch in middle, checkmark on right
        for (let i = 0; i < 3; i++) {
            const row = cdRows.nth(i);
            const numEl = row.locator('.set-num');
            await expect(numEl).toHaveText(String(i + 1));

            const checkBtn = row.locator('.btn-check');
            await expect(checkBtn).toBeVisible();

            const numBox = await numEl.boundingBox();
            const checkBtnBox = await checkBtn.boundingBox();
            expect(checkBtnBox.x).toBeGreaterThan(numBox.x);
        }

        // Click Cool Down Row 1 to complete it
        await cdRows.first().click();
        await expect(cdRows.first()).toHaveClass(/checked/);

        // Check selected styling on Cool Down Row 1 - should be consistent with strength theme (orange #ee6c3f)
        const cdRowBorder = await cdRows.first().evaluate(el => window.getComputedStyle(el).borderColor);
        expect(cdRowBorder).toBe('rgb(238, 108, 63)');

        const cdNumBg = await cdRows.first().locator('.set-num').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(cdNumBg).toBe('rgb(238, 108, 63)');

        const cdCheckBg = await cdRows.first().locator('.btn-check').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(cdCheckBg).toBe('rgb(238, 108, 63)');

        // Capture screenshot of Day 4 with R9 and Cool Down expanded and checked
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day4-r9-cooldown-design-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 1800 });
        await page.screenshot({ path: path.join(outDir, 'day4-r9-cooldown-design-mobile.png'), fullPage: true });
    });
});
