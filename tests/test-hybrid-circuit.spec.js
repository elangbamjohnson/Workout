const { test, expect } = require('@playwright/test');

test.describe('Hybrid Boxing - Conditioning Circuit Auto-Trigger on All Checkboxes Checked', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
        
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        await page.locator('#btn-confirm-swap').click();
        
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        await circCard.locator('.item-header').click();
    });

    test('Checking 1st and 2nd checkboxes does not trigger timer, checking 3rd checkbox auto-triggers 45s rest timer', async ({ page }) => {
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        const timerModal = page.locator('#timer-modal');
        
        // Confirm no "Complete Round" button exists in the card
        await expect(circCard.locator('button:has-text("Complete Round")')).toHaveCount(0);
        
        // 1. Check KB Swings (1st exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await page.waitForTimeout(300);
        await expect(timerModal).toBeHidden();
        
        // 2. Check Burpees (2nd exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await page.waitForTimeout(300);
        await expect(timerModal).toBeHidden();
        
        // 3. Check Squat Jumps (3rd / final exercise)
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        // 4. Expect timer modal to trigger and be visible
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
        await expect(timerModal.locator('.timer-display')).toContainText('45');
        
        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Round one complete! Forty-five seconds rest. Walk it off, breathe through your nose, and prepare for round two.');
        
        // 5. Fast forward 45s rest timer to completion
        await page.clock.fastForward('00:46');
        await page.waitForTimeout(500);
        await expect(timerModal).toBeHidden();
        
        // 6. Assert UI reflection of Round 2
        await expect(circCard.locator('.title-card')).toHaveText('Conditioning Circuit (Round 2 of 2)');
        
        // All 3 checkboxes should now be reset to unchecked for Round 2
        const kbRow = circCard.locator('.nested-row').filter({ hasText: 'KB Swings' });
        await expect(kbRow).not.toHaveClass(/checked/);
        const burpeeRow = circCard.locator('.nested-row').filter({ hasText: 'Burpees' });
        await expect(burpeeRow).not.toHaveClass(/checked/);
        const squatRow = circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' });
        await expect(squatRow).not.toHaveClass(/checked/);
    });

    test('Round 2: checking all 3 exercises triggers finish rest timer and completes circuit', async ({ page }) => {
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        const timerModal = page.locator('#timer-modal');
        
        // --- ROUND 1 ---
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        await expect(timerModal).toBeVisible();
        await page.clock.fastForward('00:46');
        await page.waitForTimeout(500);
        await expect(timerModal).toBeHidden();
        
        // --- ROUND 2 (Final Round) ---
        await expect(circCard.locator('.title-card')).toHaveText('Conditioning Circuit (Round 2 of 2)');
        
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        // Expect finish timer modal to appear
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Complete');
        await expect(timerModal.locator('.timer-cue')).toHaveText('Conditioning circuit complete! Forty-five seconds rest. Shake it out before the Bag Finisher.');
        
        await page.clock.fastForward('00:46');
        await page.waitForTimeout(500);
        await expect(timerModal).toBeHidden();
        
        // All 3 checkboxes remain checked
        const kbRow = circCard.locator('.nested-row').filter({ hasText: 'KB Swings' });
        await expect(kbRow).toHaveClass(/checked/);
        const burpeeRow = circCard.locator('.nested-row').filter({ hasText: 'Burpees' });
        await expect(burpeeRow).toHaveClass(/checked/);
        const squatRow = circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' });
        await expect(squatRow).toHaveClass(/checked/);
    });

    test('Auto-reset: unchecking all exercises resets round count back to 0', async ({ page }) => {
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        const timerModal = page.locator('#timer-modal');
        
        // Check 2 boxes then uncheck them
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        
        // Uncheck both
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        
        // Now check all 3 fresh
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        // Timer modal should trigger cleanly
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
    });

    test('Mobile viewport: Conditioning Circuit auto-trigger check', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        
        const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
        const timerModal = page.locator('#timer-modal');
        
        await circCard.locator('.nested-row').filter({ hasText: 'KB Swings' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
        await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
        
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Circuit Rest');
    });
});
