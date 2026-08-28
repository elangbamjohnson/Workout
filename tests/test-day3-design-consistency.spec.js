const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Day 3 Design Consistency & Section Layout Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 3 all sections have sequential left number badges, right checkboxes, video buttons, and cyan accent on check', async ({ page }) => {
        // Navigate to Day 3
        await page.locator('.day-card').nth(2).click();
        await expect(page.locator('.title-page')).toHaveText('Technical Skills Day');

        const sectionCards = page.locator('.item-card[data-id^="day3-sec"]');
        await expect(sectionCards).toHaveCount(5);

        const expectedSections = [
            { id: 'day3-sec1', badge: 'WU', name: 'Dynamic Warm-Up', drillCount: 6, firstVideoId: 'DTXpjDJDoeI' },
            { id: 'day3-sec2', badge: 'R1', name: 'Footwork Patterns', drillCount: 2, firstVideoId: 'M2EN9AH7cDc' },
            { id: 'day3-sec3', badge: 'R2', name: 'Defense & Head Movement', drillCount: 3, firstVideoId: '6wJu5xm8VXA' },
            { id: 'day3-sec4', badge: 'R3', name: 'Combination Drilling', drillCount: 3, firstVideoId: '3qSg2evfEQ8' },
            { id: 'day3-sec5', badge: 'CD', name: 'Cool Down & Mobility', drillCount: 5, firstVideoId: 'UlyMK4MJ1v4' }
        ];

        for (let s = 0; s < expectedSections.length; s++) {
            const exp = expectedSections[s];
            const card = sectionCards.nth(s);

            // Badge text check
            await expect(card.locator('.num-badge')).toHaveText(exp.badge);
            await expect(card.locator('.title-card')).toHaveText(exp.name);

            // Expand card
            await card.locator('.item-header').click();
            await expect(card).toHaveClass(/expanded/);

            const rows = card.locator('.nested-row');
            await expect(rows).toHaveCount(exp.drillCount);

            // Verify each drill row layout
            for (let i = 0; i < exp.drillCount; i++) {
                const row = rows.nth(i);

                // 1. Number badge on left
                const numBadge = row.locator('.set-num');
                await expect(numBadge).toHaveText(String(i + 1));

                // 2. Checkbox on right
                const checkBtn = row.locator('.btn-check');
                await expect(checkBtn).toBeVisible();

                const numBox = await numBadge.boundingBox();
                const checkBtnBox = await checkBtn.boundingBox();
                expect(checkBtnBox.x).toBeGreaterThan(numBox.x);
            }
        }

        // Test video modal opening for Section 1 Drill 1 (Leg Swings)
        const sec1FirstRow = sectionCards.first().locator('.nested-row').first();
        const demoBtn = sec1FirstRow.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();
        await demoBtn.click();

        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /DTXpjDJDoeI/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Test checkbox click & checked styling (cyan accent #2dd4d4)
        const checkBtn = sec1FirstRow.locator('.btn-check');
        await checkBtn.click();
        await expect(sec1FirstRow).toHaveClass(/checked/);

        // Verify cyan accent border (#2dd4d4 / rgb(45, 212, 212))
        const rowBorder = await sec1FirstRow.evaluate(el => window.getComputedStyle(el).borderColor);
        expect(rowBorder).toBe('rgb(45, 212, 212)');

        // Verify cyan background on active .set-num
        const numBg = await sec1FirstRow.locator('.set-num').evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(numBg).toBe('rgb(45, 212, 212)');

        // Test section reset when all drills completed
        const sec2 = sectionCards.nth(1); // Footwork Patterns (2 drills)
        const sec2Rows = sec2.locator('.nested-row');
        await sec2Rows.nth(0).locator('.btn-check').click();
        await sec2Rows.nth(1).locator('.btn-check').click();

        // CTA button should now say "Reset Footwork Patterns"
        const resetBtn = sec2.locator('button.btn-large');
        await expect(resetBtn).toContainText('Reset Footwork Patterns');

        // Click reset and verify rows are uncompleted
        await resetBtn.click();
        await expect(sec2Rows.nth(0)).not.toHaveClass(/checked/);
        await expect(sec2Rows.nth(1)).not.toHaveClass(/checked/);

        // Verify Complete Session footer button
        const footerCompleteBtn = page.locator('.btn-complete-session');
        await expect(footerCompleteBtn).toBeVisible();
        await expect(footerCompleteBtn).toContainText('Complete Session');

        // Capture visual verification screenshots
        const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.screenshot({ path: path.join(outDir, 'day3-consistent-desktop.png'), fullPage: true });

        await page.setViewportSize({ width: 375, height: 2600 });
        await page.screenshot({ path: path.join(outDir, 'day3-consistent-mobile.png'), fullPage: true });
    });
});
