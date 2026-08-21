const { test, expect } = require('@playwright/test');

test.describe('Day 5 Restructure — Round 4 (Combination Power) Hybrid Rendering', () => {

    test.beforeEach(async ({ page }) => {
        // Intercept global audio to prevent real playback and capture speech events
        await page.addInitScript(() => {
            window.spokenCues = [];
            window.speakAlert = (text) => {
                window.spokenCues.push(text);
            };
            window.Audio = class {
                play() { return Promise.resolve(); }
                pause() {}
                load() {}
            };
        });
        
        await page.goto('/');
        
        // Use a clean state
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();

        await expect(page.locator('#splash-screen')).toBeHidden();

        // Navigate to Day 5 (Advanced Technical Sparring)
        const day5Card = page.locator('.day-card').filter({ hasText: 'Day 5' });
        await day5Card.click();
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);
    });

    test('UI Verification: Hybrid Display & Checkbox Rendering', async ({ page }) => {
        // Find Round 4 card (Combination Power)
        const round4Card = page.locator('.item-card').filter({ hasText: 'Combination Power' });
        await expect(round4Card).toBeVisible();

        // Expand the card to make nested rows visible
        await round4Card.locator('.item-header').click();

        // Verify there is NO global "Start Round Timer" button for this card
        const startGlobalBtn = round4Card.locator('button:has-text("Start Round Timer")');
        await expect(startGlobalBtn).toHaveCount(0);

        // Verify Combination A
        const comboA = round4Card.locator('.nested-row').filter({ hasText: '1-2-3 — approximately 6 repetitions' });
        await expect(comboA).toBeVisible();
        await expect(comboA.locator('button:has-text("Start Timer")')).toHaveCount(0);
        await expect(comboA.locator('.btn-check')).not.toHaveClass(/checked/);

        // Verify Combination B
        const comboB = round4Card.locator('.nested-row').filter({ hasText: '1-2-3-2 — approximately 5 repetitions' });
        await expect(comboB).toBeVisible();
        await expect(comboB.locator('button:has-text("Start Timer")')).toHaveCount(0);

        // Verify Combination C
        const comboC = round4Card.locator('.nested-row').filter({ hasText: '1-2-Lead Body Hook-2' });
        await expect(comboC).toBeVisible();
        await expect(comboC.locator('button:has-text("Start Timer")')).toHaveCount(0);

        // Verify Final 30 seconds Segment (Combination D)
        const comboD = round4Card.locator('.nested-row').filter({ hasText: 'Final 30 seconds' });
        await expect(comboD).toBeVisible();
        
        // Should have the inline timer button
        const startTimerBtn = comboD.locator('button:has-text("Start Timer")');
        await expect(startTimerBtn).toBeVisible();
        await expect(startTimerBtn).toHaveClass(/btn-play type-bag/);
    });

    test('Timer Behavior: Final Segment Auto-Completion', async ({ page }) => {
        // Ensure not checked initially
        const round4Card = page.locator('.item-card').filter({ hasText: 'Combination Power' });
        await round4Card.locator('.item-header').click();
        const comboD = round4Card.locator('.nested-row').filter({ hasText: 'Final 30 seconds' });
        await expect(comboD.locator('.btn-check')).not.toHaveClass(/checked/);
        
        // Start inline timer
        await comboD.locator('button:has-text("Start Timer")').click();
        
        // Timer modal should appear
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        
        // Verify cue text in timer modal
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Final 30 seconds');
        await expect(timerModal.locator('.timer-cue-container div')).toContainText('Free combination work using 1-2-3');

        // Fast-forward timer to completion
        await page.evaluate(() => {
            if (window.Timer) {
                window.Timer.endTime = Date.now();
            }
        });
        await page.waitForTimeout(1000); // Allow tick to process and transition
        
        // Verify the timer transitioned to REST mode
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        
        // Verify rest structure and merged active recovery cue
        await expect(timerModal.locator('.timer-cue')).toContainText('Walk around the bag, shake out the shoulders');
        
        // Fast-forward rest by skipping it
        await timerModal.locator('.btn-large', { hasText: 'Skip Rest' }).click();

        // Verify ONLY the Final 30 Seconds combination auto-checked
        await expect(comboD.locator('.btn-check')).toHaveClass(/checked/);
        
        // Verify A, B, and C DID auto-check
        const comboA = round4Card.locator('.nested-row').filter({ hasText: '1-2-3 — approximately 6 repetitions' });
        await expect(comboA.locator('.btn-check')).toHaveClass(/checked/);
        
        const comboB = round4Card.locator('.nested-row').filter({ hasText: '1-2-3-2 — approximately 5 repetitions' });
        await expect(comboB.locator('.btn-check')).toHaveClass(/checked/);
        
        const comboC = round4Card.locator('.nested-row').filter({ hasText: '1-2-Lead Body Hook-2' });
        await expect(comboC.locator('.btn-check')).toHaveClass(/checked/);
    });

    test('Mobile Viewport (375px): Inline timer button fits cleanly', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        
        const round4Card = page.locator('.item-card').filter({ hasText: 'Combination Power' });
        await round4Card.locator('.item-header').click();
        const comboD = round4Card.locator('.nested-row').filter({ hasText: 'Final 30 seconds' });
        
        const startTimerBtn = comboD.locator('button:has-text("Start Timer")');
        await expect(startTimerBtn).toBeVisible();
        
        // Ensure no horizontal scrolling caused by inline button
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(375);
    });

});
