const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Quick Session — Hybrid Boxing Rest Time Modal Descriptions & Alignment', () => {
    const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Power Primer exercises trigger rest modal with proper rest descriptions', async ({ page }) => {
        // Navigate to Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // 1. Expand Power Primer block
        const primerCard = page.locator('.item-card[data-id="hybrid-primer"]');
        await expect(primerCard).toBeVisible();
        if (!(await primerCard.evaluate(el => el.classList.contains('expanded')))) {
            await primerCard.locator('.item-header').click();
        }

        // Test Exercise 1: Medicine Ball Rotational Throw
        const mbRow = primerCard.locator('.nested-row').filter({ hasText: 'Medicine Ball Rotational Throw' });
        await expect(mbRow).toBeVisible();
        // Expand the exercise details to reveal set rows
        await mbRow.locator('div[role="button"]').click();

        // Click set 1 checkbox
        const set1Btn = mbRow.locator('.set-row').first().locator('.btn-check');
        await set1Btn.click();

        // Rest modal should appear with proper rest description
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Medicine Ball Rotational Throw');
        await expect(timerModal.locator('.timer-display')).toHaveText('0:20');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Rest 20 seconds. Catch your breath and shake out your arms before switching sides or starting the next set.');

        await page.screenshot({ path: path.join(artifactsDir, 'rest-modal-mb-throw.png') });

        // Skip/Close rest modal
        await timerModal.locator('button:has-text("Skip Rest")').click();
        await expect(timerModal).toBeHidden();

        // Test Exercise 2: Landmine Rotational Press
        const landmineRow = primerCard.locator('.nested-row').filter({ hasText: 'Landmine Rotational Press' });
        await expect(landmineRow).toBeVisible();
        await landmineRow.locator('div[role="button"]').click();

        // Click set 1 checkbox
        const set2Btn = landmineRow.locator('.set-row').first().locator('.btn-check');
        await set2Btn.click();

        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Landmine Rotational Press');
        await expect(timerModal.locator('.timer-display')).toHaveText('0:20');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Rest 20 seconds. Shake out your shoulders and switch sides or prepare for Set 2.');

        await page.screenshot({ path: path.join(artifactsDir, 'rest-modal-landmine-press.png') });

        // Skip/Close rest modal
        await timerModal.locator('button:has-text("Skip Rest")').click();
        await expect(timerModal).toBeHidden();

        // Test Exercise 3: Explosive Push-ups
        const pushupsRow = primerCard.locator('.nested-row').filter({ hasText: 'Explosive Push-ups' });
        await expect(pushupsRow).toBeVisible();
        await pushupsRow.locator('div[role="button"]').click();

        // Click set 1 checkbox
        const set3Btn = pushupsRow.locator('.set-row').first().locator('.btn-check');
        await set3Btn.click();

        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Explosive Push-ups');
        await expect(timerModal.locator('.timer-display')).toHaveText('1:00');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Rest 60 seconds. Shake out your chest and arms, breathe deep, and prepare for Set 2.');

        await page.screenshot({ path: path.join(artifactsDir, 'rest-modal-explosive-pushups.png') });

        // Skip/Close rest modal
        await timerModal.locator('button:has-text("Skip Rest")').click();
        await expect(timerModal).toBeHidden();
    });
});
