const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Design Consistency Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Warm-up Design Consistency: Number on left, name/stats/cue center, checkbox on right, video demos, and bottom session button', async ({ page }) => {
        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        await expect(page.locator('.title-page')).toHaveText('Hybrid Boxing');

        const warmupCard = page.locator('.item-card').filter({ hasText: 'Warm-up' }).first();
        await warmupCard.locator('.item-header').click();

        // 4 warmup rows
        const rows = warmupCard.locator('.warmup-hybrid-row');
        await expect(rows).toHaveCount(4);

        // Verify sequential numbers on left
        for (let i = 0; i < 4; i++) {
            await expect(rows.nth(i).locator('.warmup-hybrid-num')).toHaveText(String(i + 1));
            // Checkbox on right
            const checkBtn = rows.nth(i).locator('.btn-check');
            await expect(checkBtn).toBeVisible();
        }

        // Verify Drill 1: Jump Rope
        const row1 = rows.nth(0);
        await expect(row1.locator('.warmup-hybrid-name')).toHaveText('Jump Rope');
        await expect(row1.locator('.warmup-hybrid-stat')).toHaveText('2 min');
        await expect(row1.locator('.warmup-hybrid-cue')).toHaveText('Moderate pace — get your feet and rhythm ready');
        const demo1 = row1.locator('.btn-demo-icon');
        await expect(demo1).toBeVisible();

        // Verify Drill 2: Jumping Jacks
        const row2 = rows.nth(1);
        await expect(row2.locator('.warmup-hybrid-name')).toHaveText('Jumping Jacks');
        await expect(row2.locator('.warmup-hybrid-stat')).toHaveText('1 min');
        await expect(row2.locator('.warmup-hybrid-cue')).toHaveText('Full arm extension overhead on every rep');
        await expect(row2.locator('.btn-demo-icon')).toBeVisible();

        // Verify Drill 3: Arm Circles + Shoulder Rolls
        const row3 = rows.nth(2);
        await expect(row3.locator('.warmup-hybrid-name')).toHaveText('Arm Circles + Shoulder Rolls');
        await expect(row3.locator('.warmup-hybrid-stat')).toHaveText('1 min');
        await expect(row3.locator('.btn-demo-icon')).toBeVisible();

        // Verify Drill 4: Hip Rotations
        const row4 = rows.nth(3);
        await expect(row4.locator('.warmup-hybrid-name')).toHaveText('Hip Rotations');
        await expect(row4.locator('.warmup-hybrid-stat')).toHaveText('1 min');
        await expect(row4.locator('.btn-demo-icon')).toBeVisible();

        // Verify video modal opens from Warmup Drill 1
        await demo1.click();
        const videoModal = page.locator('.video-modal-overlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /Gt9hlRMXDXc/);
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Verify bottom action button: Start Warm-up Session
        const startWarmupBtn = warmupCard.locator('button.btn-large');
        await expect(startWarmupBtn).toHaveText('Start Warm-up Session');

        // Test tapping checkbox on Drill 1 launches countdown timer
        await row1.locator('.btn-check').click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-cue')).toContainText('Jump Rope');
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();
    });

    test('2. Punch Power Primer, Circuit, and Cooldown layout consistency', async ({ page }) => {
        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Expand all sections
        await page.locator('.content-header-row .btn-nav').click();

        // Primer Card (R1)
        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await expect(primerCard.locator('.num-badge')).toHaveText('R1');
        const primerRows = primerCard.locator('.nested-list > .nested-row');
        await expect(primerRows).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
            await expect(primerRows.nth(i).locator('.btn-demo-icon')).toBeVisible();
        }

        // Conditioning Circuit (R3)
        const circuitCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' }).first();
        await expect(circuitCard.locator('.num-badge')).toHaveText('R3');
        const circRows = circuitCard.locator('.nested-row');
        await expect(circRows).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
            await expect(circRows.nth(i).locator('.set-num')).toHaveText(String(i + 1));
            await expect(circRows.nth(i).locator('.btn-check')).toBeVisible();
        }

        // Cool Down (CD)
        const cooldownCard = page.locator('.item-card').filter({ hasText: 'Cool Down' }).first();
        await expect(cooldownCard.locator('.num-badge')).toHaveText('CD');
        const cdRows = cooldownCard.locator('.nested-row');
        await expect(cdRows).toHaveCount(5);
        for (let i = 0; i < 5; i++) {
            await expect(cdRows.nth(i).locator('.set-num')).toHaveText(String(i + 1));
            await expect(cdRows.nth(i).locator('.btn-check')).toBeVisible();
        }
    });

    test('3. Cross-platform responsive layout on mobile viewport (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Expand all
        await page.locator('.content-header-row .btn-nav').click();

        // Verify zero horizontal scrolling
        const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const windowInnerWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1);
    });

    test('4. Full Section Badge Hierarchy & Video Demo consistency', async ({ page }) => {
        await page.goto('/');
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Verify 6 cards with exact sequential badges
        const cards = page.locator('.item-card');
        await expect(cards).toHaveCount(6);

        await expect(cards.nth(0).locator('.num-badge')).toHaveText('WU');
        await expect(cards.nth(1).locator('.num-badge')).toHaveText('R1');
        await expect(cards.nth(2).locator('.num-badge')).toHaveText('R2');
        await expect(cards.nth(3).locator('.num-badge')).toHaveText('R3');
        await expect(cards.nth(4).locator('.num-badge')).toHaveText('R4');
        await expect(cards.nth(5).locator('.num-badge')).toHaveText('CD');

        // Check video demo icons on Circuit Card
        const circuitCard = cards.nth(3);
        await circuitCard.locator('.item-header').click();
        const circRows = circuitCard.locator('.nested-row');
        await expect(circRows.nth(0).locator('.btn-demo-icon')).toBeVisible(); // KB Swings
        await expect(circRows.nth(1).locator('.btn-demo-icon')).toBeVisible(); // Burpees
        await expect(circRows.nth(2).locator('.btn-demo-icon')).toBeVisible(); // Squat Jumps

        // Check Cooldown descriptions
        const cdCard = cards.nth(5);
        await cdCard.locator('.item-header').click();
        await expect(cdCard).toContainText('~30–40% intensity. Gentle rhythmic movement to bring heart rate down.');
        await expect(cdCard).toContainText('Open the chest and front deltoids, ease tension from power punches.');
    });
});
