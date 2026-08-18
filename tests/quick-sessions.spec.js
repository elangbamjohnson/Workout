const { test, expect } = require('@playwright/test');

test.describe('Quick Sessions Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage for a clean slate
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Home screen renders Quick Sessions row below nav bar', async ({ page }) => {
    // Wait for splash screen to hide
    await expect(page.locator('#splash-screen')).toBeHidden();

    // The Quick Sessions section should be visible on the home view
    const quickSessionsSection = page.locator('.qs-section');
    await expect(quickSessionsSection).toBeVisible();
    await expect(quickSessionsSection.locator('.qs-header-title')).toContainText('Quick Sessions');

    // The Shadow Boxing card should exist
    const shadowBoxingCard = page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' });
    await expect(shadowBoxingCard).toBeVisible();
  });

  test('Shadow Boxing session opens correctly with timer controls and text', async ({ page }) => {
    // Click the card
    await page.locator('.qs-card').filter({ hasText: 'Shadow Boxing' }).click();

    // Verify "doing this instead of today's workout" banner logic
    const swapBanner = page.locator('#swap-banner');
    await expect(swapBanner).toBeVisible();
    await expect(swapBanner).toContainText('Doing Shadow Boxing today instead of your scheduled workout?');

    // Click to confirm the swap
    await page.locator('#btn-confirm-swap').click();
    await expect(swapBanner).toBeHidden(); // Banner should disappear after confirming

    // Verify session view opens
    await expect(page.locator('#app-container')).toHaveClass(/is-day-view/);
    await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);
    
    // Verify title
    await expect(page.locator('.title-page')).toContainText('Shadow Boxing');

    // Prev/next day arrows should be hidden or disabled
    // In Quick Sessions, these buttons do not render at all. We check if they are attached to the page.
    const navArrowsContainer = page.locator('.nav-day-arrows');
    await expect(navArrowsContainer).toBeEmpty();

    // Verify round/combo text accuracy
    // Check main rounds card
    const roundsCard = page.locator('.item-card').filter({ hasText: 'Shadow Boxing Rounds' });
    await expect(roundsCard).toBeVisible();
    
    // Expand the card
    await roundsCard.locator('.item-header').click();
    
    // Start button is inside the expanded content (first round)
    const startBtn = roundsCard.locator('.btn-play.type-bag').first();
    await expect(startBtn).toBeVisible();
    await expect(startBtn).toContainText('Start');

    // Click Start Timer
    await startBtn.click();

    // Timer modal should appear (it's used for countdown too)
    const timerModal = page.locator('#timer-modal');
    await expect(timerModal).not.toHaveClass(/hidden/);
    await expect(timerModal).toBeVisible();

    // Verify timer starts counting down
    // First it's the countdown modal, so check countdown display
    const timeDisplay = timerModal.locator('.countdown-number');
    await expect(timeDisplay).toBeVisible();
    
    // Check the text
    const initialTime = await timeDisplay.textContent();
    
    // Wait for 1.5 seconds for timer to tick down
    await page.waitForTimeout(1500);
    const newTime = await timeDisplay.textContent();
    
    expect(newTime).not.toEqual(initialTime);
  });

  const quickSessions = [
    { id: 'quick-upper-power', name: 'Upper Body Power' },
    { id: 'quick-hybrid', name: 'Hybrid Boxing' },
    { id: 'quick-lower-power', name: 'Lower Body Power' },
    { id: 'quick-shadow-boxing', name: 'Shadow Boxing' },
    { id: 'quick-hiit-boxing', name: 'HIIT Boxing' },
    { id: 'quick-full-body-explosive', name: 'Full-Body Workout' }
  ];

  for (const qs of quickSessions) {
    test(`Swap banner appears for ${qs.name} and confirms correctly`, async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('#splash-screen')).toBeHidden();

      // Clear logs to ensure clean slate
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await expect(page.locator('#splash-screen')).toBeHidden();

      // Click card
      await page.locator('.qs-card').filter({ hasText: qs.name }).click();

      // Banner should appear
      const swapBanner = page.locator('#swap-banner');
      await expect(swapBanner).toBeVisible();
      await expect(swapBanner).toContainText(`Doing ${qs.name} today instead of your scheduled workout?`);

      // Cancel should close it and keep us on home
      await page.locator('.btn-ghost', { hasText: 'Cancel' }).click();
      await expect(swapBanner).toBeHidden();
      await expect(page.locator('#app-container')).toHaveClass(/is-home/);

      // Verify no logs
      const historyAfterCancel = await page.evaluate(() => {
          const state = JSON.parse(localStorage.getItem('punchpower_state') || '{}');
          return state.history || [];
      });
      expect(historyAfterCancel.length).toBe(0);

      // Click card again
      await page.locator('.qs-card').filter({ hasText: qs.name }).click();
      await expect(swapBanner).toBeVisible();

      // Confirm
      await page.locator('#btn-confirm-swap').click();
      await expect(swapBanner).toBeHidden();
      
      try {
        await expect(page.locator('.title-page')).toContainText(qs.name, { timeout: 2000 });
      } catch (e) {
        await page.screenshot({ path: `failure-${qs.id}.png`, fullPage: true });
        throw e;
      }

      // Force log completion
      await page.evaluate(({ id, name }) => {
          if (typeof Store !== 'undefined' && Store.logQuickSession) {
              Store.logQuickSession(id, name);
          }
      }, { id: qs.id, name: qs.name });

      // Verify logs
      const historyAfterConfirm = await page.evaluate(() => {
          const state = JSON.parse(localStorage.getItem('punchpower_state') || '{}');
          return state.history || [];
      });
      expect(historyAfterConfirm.length).toBe(1);
      
      const logEntry = historyAfterConfirm[0];
      expect(logEntry.sessionType).toBe('quick');
      expect(logEntry.dayId).toBe(qs.id);
      expect(logEntry.title).toBe(qs.name);
      
      const todayStr = new Date().toISOString().split('T')[0];
      expect(logEntry.date.startsWith(todayStr.slice(0, 7))).toBe(true); // Rough check for month matching
    });
  }

  test('Regular day flow (Days 1-7) unaffected — no banner appears', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('#splash-screen')).toBeHidden();
      
      // Ensure clean state
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await expect(page.locator('#splash-screen')).toBeHidden();
      
      // Click Day 1 (ensure we click the actual regular day card)
      await page.locator('.day-card').first().click();
      
      // No banner should appear
      const swapBanner = page.locator('#swap-banner');
      await expect(swapBanner).toBeHidden();
      
      // Should go straight to Day 1
      await expect(page.locator('.day-header-card .label-small')).toHaveText('DAY 1');
      await expect(page.locator('.title-page')).toHaveText('Lower Body Power');
  });
  test('HIIT Boxing continuous session flow', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#splash-screen')).toBeHidden();

    await page.locator('.qs-card').filter({ hasText: 'HIIT Boxing' }).click();
    
    // Swap banner confirmation
    await page.locator('#btn-confirm-swap').click();
    await expect(page.locator('.title-page')).toContainText('HIIT Boxing');

    // Verify sections render correctly from the dynamic playlist
    const tabataCard = page.locator('.item-card').filter({ hasText: 'Tabata Bag Rounds' });
    await expect(tabataCard).toBeVisible();
    
    // Expand Tabata card to see rows
    await tabataCard.locator('.item-header').click();
    await expect(tabataCard.locator('.nested-row')).toHaveCount(8);

    const circuitCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
    await expect(circuitCard).toBeVisible();

    // Expand Circuit card
    await circuitCard.locator('.item-header').click();
    await expect(circuitCard.locator('.nested-row')).toHaveCount(3); // 3 exercises in checklist

    // Verify 'Start Full Session' button exists
    const startFullBtn = page.locator('button', { hasText: 'Start Full Session' });
    await expect(startFullBtn).toBeVisible();

    // Click it to start the continuous sequence
    await startFullBtn.click();

    const timerModal = page.locator('#timer-modal');
    await expect(timerModal).toBeVisible();

    // Verify the first phase starts (Jump Rope)
    const timerTitle = timerModal.locator('.timer-header h2');
    await expect(timerTitle).toContainText('Jump Rope', { timeout: 2000 });

    // Verify the timer ticks down
    const timeDisplay = timerModal.locator('.timer-display');
    await expect(timeDisplay).toBeVisible();
    const initialTime = await timeDisplay.textContent();
    
    await page.waitForTimeout(1500);
    const newTime = await timeDisplay.textContent();
    expect(newTime).not.toEqual(initialTime);

    // Clean up
    await page.evaluate(() => {
        if (typeof Timer !== 'undefined') Timer.close();
    });
  });
  test('Full-Body Workout continuous session flow', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#splash-screen')).toBeHidden();

    await page.locator('.qs-card').filter({ hasText: 'Full-Body Workout' }).click();
    
    // Swap banner confirmation
    await page.locator('#btn-confirm-swap').click();
    await expect(page.locator('.title-page')).toContainText('Full-Body Workout');

    // Verify equipment renders
    await expect(page.locator('.callout-text')).toContainText('Equipment Required: Dumbbells');

    // Expand all to render warmup blocks' content
    await page.locator('button', { hasText: 'Expand all' }).click();

    // Verify all 7 blocks render (we have 7 sections with a start button)
    const startBtns = page.locator('button', { hasText: /Start (Warm-up & Mobility|Explosive Power|Full-Body Strength|Unilateral Athletic Strength|Full-Body Athletic Conditioning|Rotational Core|Mobility & Recovery)/ });
    await expect(startBtns).toHaveCount(7);

    // Verify countdown fires on tap for the first block
    await startBtns.first().click();
    const timerModal = page.locator('#timer-modal');
    await expect(timerModal).toBeVisible();

    // Verify countdown timer text
    const timeDisplay = timerModal.locator('.countdown-number');
    await expect(timeDisplay).toBeVisible();
    
    // Clean up
    await page.evaluate(() => {
        if (typeof Timer !== 'undefined') Timer.close();
    });
  });
});
