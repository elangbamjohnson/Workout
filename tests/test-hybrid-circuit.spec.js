const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing - Conditioning Circuit Rest Timer', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Triggers 45s rest timer only after 3rd exercise is checked', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        await circCard.locator('.item-header').click();

        const timerModal = page.locator('#timer-modal');
        
        // 1. Check Kettlebell Swings
        await circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' }).click();
        await page.waitForTimeout(500); // UI stabilization
        await expect(timerModal).toBeHidden();

        // 2. Check Burpees
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await page.waitForTimeout(500);
        await expect(timerModal).toBeHidden();

        // 3. Check Squat Jumps
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        await page.waitForTimeout(500);
        
        // 4. Expect timer to trigger
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-display')).toContainText('45');
        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('One round down. Shake out the legs before the next round.');
        
        // 5. Fast forward the 45s rest timer
        await page.clock.fastForward('00:46');
        await page.waitForTimeout(500); // Wait for modal to hide and UI to rerender
        await expect(timerModal).toBeHidden();
        
        // 6. Assert UI reflection of round 2
        await expect(circCard.locator('.title-card')).toHaveText('Conditioning Circuit (Round 2 of 2)');
        
        // Checkboxes should be unchecked
        const kbRow = circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' });
        await expect(kbRow).not.toHaveClass(/checked/);
    });
});
