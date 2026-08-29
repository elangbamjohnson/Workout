const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing: Punch Power Primer Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('1. Section sequence: Punch Power Primer appears after Warm-up and before Bag Work', async ({ page }) => {
        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        await expect(page.locator('.title-page')).toHaveText('Hybrid Boxing');

        // Check cards sequence
        const cards = page.locator('.item-card');
        await expect(cards).toHaveCount(6);

        // 1. Warm-Up
        await expect(cards.nth(0).locator('.title-card')).toContainText('Warm-up');
        await expect(cards.nth(0).locator('.num-badge')).toHaveText('WU');

        // 2. Punch Power Primer
        const primerCard = cards.nth(1);
        await expect(primerCard.locator('.title-card')).toHaveText('Punch Power Primer');
        await expect(primerCard.locator('.num-badge')).toHaveText('R1');
        await expect(primerCard).toHaveAttribute('data-id', 'hybrid-primer');

        // 3. Bag Work
        await expect(cards.nth(2).locator('.title-card')).toHaveText('Bag Work');
        await expect(cards.nth(2).locator('.num-badge')).toHaveText('R2');

        // 4. Conditioning Circuit
        await expect(cards.nth(3).locator('.title-card')).toHaveText('Conditioning Circuit');
        await expect(cards.nth(3).locator('.num-badge')).toHaveText('R3');

        // 5. Bag Finisher
        await expect(cards.nth(4).locator('.title-card')).toHaveText('Bag Finisher');
        await expect(cards.nth(4).locator('.num-badge')).toHaveText('R4');

        // 6. Cool Down
        await expect(cards.nth(5).locator('.title-card')).toHaveText('Cool Down');
        await expect(cards.nth(5).locator('.num-badge')).toHaveText('CD');
    });

    test('2. Punch Power Primer card metadata, rules, stats, and 3 exercises', async ({ page }) => {
        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await expect(primerCard).toBeVisible();

        // Check header stats
        await expect(primerCard.locator('.stat-item').nth(0)).toContainText('~7 min');
        await expect(primerCard.locator('.stat-item').nth(1)).toContainText('2 sets');
        await expect(primerCard.locator('.stat-item').nth(2)).toContainText('3 exercises');

        // Expand Primer Card
        await primerCard.locator('.item-header').click();
        await expect(primerCard).toHaveClass(/expanded/);

        // Check Callout and Power Block Rules
        await expect(primerCard).toContainText('Develop hip explosiveness, rotational power, force transfer');
        await expect(primerCard).toContainText('This is NOT conditioning');
        await expect(primerCard).toContainText('Every explosive repetition should be high quality');
        await expect(primerCard).toContainText('STOP THE SET');

        // Check nested exercises
        const exRows = primerCard.locator('.nested-list > .nested-row');
        await expect(exRows).toHaveCount(3);

        // Exercise 1: Medicine Ball Rotational Throw
        const ex1 = exRows.nth(0);
        await expect(ex1).toContainText('Medicine Ball Rotational Throw');
        await expect(ex1).toContainText('2 × 4/side');
        await expect(ex1).toContainText('7 kg');
        await expect(ex1).toContainText('20 sec rest');

        // Check video demo icon for Ex 1
        const playBtn1 = ex1.locator('button.btn-demo-icon');
        await expect(playBtn1).toBeVisible();
        await playBtn1.click();
        const videoModal = page.locator('.video-modal-overlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /02c2YLgF8iE/);
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Exercise 2: Landmine Rotational Press
        const ex2 = exRows.nth(1);
        await expect(ex2).toContainText('Landmine Rotational Press');
        await expect(ex2).toContainText('2 × 5/side');
        await expect(ex2).toContainText('20 kg bar + 5 kg');
        await expect(ex2).toContainText('20 sec rest');

        // Check video demo icon for Ex 2
        const playBtn2 = ex2.locator('button.btn-demo-icon');
        await expect(playBtn2).toBeVisible();
        await playBtn2.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /kYj_kuUCla4/);
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Exercise 3: Explosive Push-ups
        const ex3 = exRows.nth(2);
        await expect(ex3).toContainText('Explosive Push-ups');
        await expect(ex3).toContainText('2 × 5–8');
        await expect(ex3).toContainText('Bodyweight');
        await expect(ex3).toContainText('1 min rest');

        // Check video demo icon for Ex 3
        const playBtn3 = ex3.locator('button.btn-demo-icon');
        await expect(playBtn3).toBeVisible();
        await playBtn3.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /iO0sT5FDgj4/);
        await videoModal.locator('button.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Check vertical center alignment of chevron in all 3 cells
        for (let i = 0; i < 3; i++) {
            const rowHeader = exRows.nth(i).locator('[role="button"]').first();
            const chevron = rowHeader.locator('.item-chevron');
            const headerBox = await rowHeader.boundingBox();
            const chevronBox = await chevron.boundingBox();

            expect(headerBox).not.toBeNull();
            expect(chevronBox).not.toBeNull();

            const headerCenterY = headerBox.y + headerBox.height / 2;
            const chevronCenterY = chevronBox.y + chevronBox.height / 2;

            // Chevron center should be within 4px of the row header center
            expect(Math.abs(headerCenterY - chevronCenterY)).toBeLessThanOrEqual(4);
        }
    });

    test('3. Set logging, input fields, and rest timer triggering in Primer exercises', async ({ page }) => {
        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await primerCard.locator('.item-header').click();

        // Expand Exercise 1
        const ex1 = primerCard.locator('.nested-list > .nested-row').nth(0);
        await ex1.locator('[role="button"]').first().click();

        // Check set rows (2 sets)
        const setRows = ex1.locator('.set-row');
        await expect(setRows).toHaveCount(2);

        // Check initial inputs for Set 1
        await expect(setRows.nth(0).locator('.input-weight')).toHaveValue('7 kg');
        await expect(setRows.nth(0).locator('.input-rep')).toHaveValue('4/side');

        // Check Execution Notes, Why This Exercise, and Muscles Worked
        await expect(ex1).toContainText('Hips first. Hands finish');
        await expect(ex1).toContainText('Develops hip explosiveness');
        await expect(ex1).toContainText('Obliques');

        // Complete Set 1 -> verify checkmark and rest timer launch
        await setRows.nth(0).locator('.btn-check').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toContainText('Medicine Ball Rotational Throw');
        await expect(timerModal.locator('.timer-display')).toContainText('0:20');
        await expect(timerModal.locator('.timer-cue')).toContainText('Hips first');

        // Close rest timer
        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();

        // Verify Set 1 is checked in UI
        const updatedEx1 = page.locator('.item-card[data-id="hybrid-primer"] .nested-list > .nested-row').nth(0);
        await expect(updatedEx1.locator('.set-row').nth(0)).toHaveClass(/checked/);
    });

    test('4. Responsive mobile layout on iPhone SE (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Check no horizontal overflow
        const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const windowInnerWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1);

        // Check Expand all button expands all 6 cards
        await page.locator('.content-header-row .btn-nav').click();

        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await expect(primerCard).toHaveClass(/expanded/);

        // Verify no horizontal overflow after expanding
        const expandedScrollWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(expandedScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1);
    });
});
