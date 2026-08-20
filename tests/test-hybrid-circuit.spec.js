const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing - Conditioning Circuit Rest Timer', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Triggers 45s rest timer only after 3rd exercise is checked, persists, and resets for Round 2', async ({ page }) => {
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        await circCard.locator('.item-header').click();

        const timerModal = page.locator('#timer-modal');
        
        // 1. Check Kettlebell Swings (1st exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' }).click();
        await page.waitForTimeout(300);
        await expect(timerModal).toBeHidden();

        // 2. Check Burpees (2nd exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await page.waitForTimeout(300);
        await expect(timerModal).toBeHidden();

        // 3. Check Squat Jumps (3rd / final exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        // 4. Expect timer modal to trigger and PERSIST (not destroyed in subsequent ticks)
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
        await expect(timerModal.locator('.timer-display')).toContainText('45');
        
        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('One round down. Shake out the legs before the next round.');
        
        // Verify persistence over multiple seconds
        await page.clock.fastForward('00:05');
        await page.waitForTimeout(200);
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-display')).toContainText('40');

        // Capture screenshot of visible rest modal
        await page.screenshot({ path: 'scratch/hybrid_circuit_rest_modal.png' });

        // 5. Fast forward remaining 40s rest timer to completion
        await page.clock.fastForward('00:41');
        await page.waitForTimeout(500);
        await expect(timerModal).toBeHidden();
        
        // 6. Assert UI reflection of round 2
        await expect(circCard.locator('.title-card')).toHaveText('Conditioning Circuit (Round 2 of 2)');
        
        // Checkboxes should be reset to unchecked
        const kbRow = circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' });
        await expect(kbRow).not.toHaveClass(/checked/);
        const burpeeRow = circCard.locator('.nested-row').filter({ hasText: 'Burpees' });
        await expect(burpeeRow).not.toHaveClass(/checked/);
        const squatRow = circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' });
        await expect(squatRow).not.toHaveClass(/checked/);
    });

    test('Mobile viewport: Conditioning Circuit rest timer modal renders cleanly', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        await circCard.locator('.item-header').click();

        const timerModal = page.locator('#timer-modal');
        
        await circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
        await expect(timerModal.locator('.timer-cue')).toHaveText('One round down. Shake out the legs before the next round.');
        
        // Capture mobile screenshot
        await page.screenshot({ path: 'scratch/hybrid_circuit_rest_mobile.png' });
    });
});
