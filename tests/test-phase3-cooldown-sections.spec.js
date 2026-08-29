const { test, expect } = require('@playwright/test');

test.describe('Phase 3: Dedicated Cool-Down Mobility Sections for Days 1 & 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('Day 1: Renders Cool Down card with 3 lower body recovery stretches', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Locate Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await expect(cdCard.locator('.num-badge')).toHaveText('CD');
        await expect(cdCard.locator('.title-card')).toHaveText('Cool Down');
        await expect(cdCard.locator('.stat-item')).toContainText('~3 min');

        // Expand Cool Down card
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        const rows = cdCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);

        // Drill 1: Hamstring stretch
        const drill1 = rows.nth(0);
        await expect(drill1.locator('.set-num')).toHaveText('1');
        await expect(drill1).toContainText('Hamstring stretch — 1 min');
        await expect(drill1).toContainText('posterior chain');

        // Drill 2: Kneeling hip flexor stretch
        const drill2 = rows.nth(1);
        await expect(drill2.locator('.set-num')).toHaveText('2');
        await expect(drill2).toContainText('Kneeling hip flexor stretch — 1 min');
        await expect(drill2).toContainText('half-kneeling');

        // Drill 3: Pigeon / glute stretch
        const drill3 = rows.nth(2);
        await expect(drill3.locator('.set-num')).toHaveText('3');
        await expect(drill3).toContainText('Pigeon / glute stretch — 1 min');
        await expect(drill3).toContainText('glutes');

        // Interactive toggle checking
        await drill1.click();
        await expect(drill1).toHaveClass(/checked/);
        await expect(drill1.locator('.btn-check')).toHaveClass(/checked/);
    });

    test('Day 2: Renders Cool Down card with 3 upper body recovery stretches', async ({ page }) => {
        // Open Day 2
        await page.locator('.day-card').nth(1).click();
        await expect(page.locator('.title-page')).toHaveText('Bag Power Day');

        // Locate Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await expect(cdCard.locator('.num-badge')).toHaveText('CD');
        await expect(cdCard.locator('.title-card')).toHaveText('Cool Down');
        await expect(cdCard.locator('.stat-item')).toContainText('~3 min');

        // Expand Cool Down card
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toHaveClass(/expanded/);

        const rows = cdCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);

        // Drill 1: Shoulder cross-body stretch
        const drill1 = rows.nth(0);
        await expect(drill1.locator('.set-num')).toHaveText('1');
        await expect(drill1).toContainText('Shoulder cross-body stretch — 1 min');

        // Drill 2: Chest opener stretch
        const drill2 = rows.nth(1);
        await expect(drill2.locator('.set-num')).toHaveText('2');
        await expect(drill2).toContainText('Chest opener stretch — 1 min');

        // Drill 3: Wrist + forearm stretch
        const drill3 = rows.nth(2);
        await expect(drill3.locator('.set-num')).toHaveText('3');
        await expect(drill3).toContainText('Wrist + forearm stretch — 1 min');

        // Interactive toggle checking
        await drill1.click();
        await expect(drill1).toHaveClass(/checked/);
    });

    test('Day 4: Cool Down card renders 3 stretches with accurate details', async ({ page }) => {
        // Open Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');

        // Locate Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await cdCard.locator('.item-header').click();

        const rows = cdCard.locator('.nested-row');
        await expect(rows).toHaveCount(3);
        await expect(rows.nth(0)).toContainText('Chest opener stretch — 1 min');
        await expect(rows.nth(1)).toContainText('Shoulder cross-body stretch — 1 min');
        await expect(rows.nth(2)).toContainText('Wrist + forearm stretch — 1 min');
    });
});
