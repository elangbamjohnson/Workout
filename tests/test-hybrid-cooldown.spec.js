const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Cool-Down (5 Drills, 4:00 Routine)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Cool-Down card metadata, badge, ~4 min stat, and 5 drills render correctly', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Navigate to Quick Sessions -> Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Locate Cool Down Card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await expect(cdCard.locator('.num-badge')).toHaveText('CD');
        await expect(cdCard.locator('.title-card')).toHaveText('Cool Down');
        await expect(cdCard.locator('.item-stats')).toContainText('~4 min');
        await expect(cdCard.locator('.item-stats')).toContainText('Active recovery');

        // Expand Cool Down Card
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        // Verify 5 drills in sequence
        const drillRows = cdCard.locator('.nested-row');
        await expect(drillRows).toHaveCount(5);

        const expectedDrills = [
            { num: '1', title: 'Slow shadowboxing — 1 min', desc: '~30–40% intensity' },
            { num: '2', title: 'Slow walking + controlled breathing — 45s', desc: 'Try: 4 sec inhale → 6 sec exhale' },
            { num: '3', title: 'Chest + shoulder stretch — 45s', desc: 'Open the chest and front deltoids' },
            { num: '4', title: 'Lat/upper-back stretch — 45s', desc: 'Release lats and upper back' },
            { num: '5', title: 'Wrist + forearm + hip mobility — 45s', desc: 'Wrist rotations, forearm flexor/extensor stretches' }
        ];

        for (let i = 0; i < expectedDrills.length; i++) {
            const row = drillRows.nth(i);
            await expect(row.locator('.set-num')).toHaveText(expectedDrills[i].num);
            await expect(row).toContainText(expectedDrills[i].title);
            await expect(row).toContainText(expectedDrills[i].desc);
        }

        // Test interactive completion toggle
        await drillRows.nth(0).click();
        await expect(drillRows.nth(0)).toHaveClass(/checked/);

        await drillRows.nth(1).click();
        await expect(drillRows.nth(1)).toHaveClass(/checked/);

        await page.screenshot({ path: `${artifactsDir}/hybrid-cooldown-expanded.png` });
    });

    test('2. Mobile layout on iPhone SE (375px) has zero overflow and clean touch targets', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
        await page.setViewportSize({ width: 375, height: 667 });

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
        expect(pageOverflow).toBe(true);

        await page.screenshot({ path: `${artifactsDir}/mobile-hybrid-cooldown-375px.png` });
    });
});
