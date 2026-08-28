const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 5 Rounds 1-7 Design & Consistency Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('All rounds R1 to R7 have sequential numbers on left, checkboxes on right, and theme accent highlight', async ({ page }) => {
        // Navigate to Day 5
        await page.locator('.day-card').nth(4).click();
        await expect(page.locator('.title-page')).toHaveText('Conditioning Bag Day');

        // Click Expand all
        await page.locator('.content-header-row .btn-nav').click();

        const roundConfig = [
            { id: 'day5-ex1', name: 'Technical Combination Build', count: 3 },
            { id: 'day5-ex2', name: 'Power Singles', count: 6 },
            { id: 'day5-ex3', name: 'Body Power + Level Change', count: 4 },
            { id: 'day5-ex4', name: 'Combination Power', count: 4 },
            { id: 'day5-ex5', name: 'Pressure Round', count: 5 },
            { id: 'day5-ex6', name: 'Power Endurance Test', count: 6 },
            { id: 'day5-ex7', name: 'Cool-Down Shadowboxing', count: 3 }
        ];

        for (const rc of roundConfig) {
            const card = page.locator(`.item-card[data-id="${rc.id}"]`);
            await expect(card).toBeVisible();
            await expect(card).toHaveClass(/expanded/);

            const rows = card.locator('.nested-row');
            await expect(rows).toHaveCount(rc.count);

            for (let i = 0; i < rc.count; i++) {
                const row = rows.nth(i);

                // Check left sequence number
                const numBadge = row.locator('.set-num');
                await expect(numBadge).toBeVisible();
                await expect(numBadge).toHaveText(String(i + 1));

                // Check right checkbox
                const checkBtn = row.locator('.btn-check');
                await expect(checkBtn).toBeVisible();

                const numBox = await numBadge.boundingBox();
                const checkBtnBox = await checkBtn.boundingBox();
                expect(checkBtnBox.x).toBeGreaterThan(numBox.x);
            }
        }

        // Test checkbox click and checked styling on R1 row 1 and R2 row 1
        const r1Card = page.locator('.item-card[data-id="day5-ex1"]');
        const r1Row1 = r1Card.locator('.nested-row').first();
        await r1Row1.locator('.btn-check').click();

        await expect(r1Row1).toHaveClass(/checked/);

        // Verify theme accent color on checked row (#d99a3d -> rgb(217, 154, 61))
        const rowBorder = await r1Row1.evaluate(el => window.getComputedStyle(el).borderColor);
        expect(rowBorder).toBe('rgb(217, 154, 61)');

        const numBg = await r1Row1.locator('.set-num').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(numBg).toBe('rgb(217, 154, 61)');

        const numColor = await r1Row1.locator('.set-num').evaluate(el => window.getComputedStyle(el).color);
        expect(numColor).toBe('rgb(0, 0, 0)');

        // Capture full page desktop & mobile screenshots
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day5-r1-r7-consistent-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 4200 });
        await page.screenshot({ path: path.join(outDir, 'day5-r1-r7-consistent-mobile.png'), fullPage: true });
    });
});
