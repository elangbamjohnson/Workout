const { test, expect } = require('@playwright/test');

test.describe('Rest Timer Text & Voice Prompts Audit & UI Bleed Fix Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(async () => {
            localStorage.clear();
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
        });
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Day 2 (Bag Power Day): All bag rounds with rest have bespoke restCue and combo-bleed is suppressed', async ({ page }) => {
        // Data verification
        const day2 = await page.evaluate(() => workoutData.days.find(d => d.id === 2));
        expect(day2).toBeDefined();

        const expectedDay2Cues = {
            'day2-ex1': 'Shake out the lead arm. Breathe deep. Power crosses coming up.',
            'day2-ex2': 'Recover that rear shoulder. Lead hooks are next — stay loose.',
            'day2-ex3': 'Breathe deep. Shake out the arms. Get ready for rear body hooks.',
            'day2-ex4': 'Great work. Drop your hands, walk it off. Full combinations next.',
            'day2-ex5': 'One round left. Empty the tank on this endurance finisher.'
        };

        for (const [id, expectedCue] of Object.entries(expectedDay2Cues)) {
            const ex = day2.exercises.find(e => e.id === id);
            expect(ex).toBeDefined();
            expect(ex.restCue).toBe(expectedCue);
            expect(ex.restSeconds).toBe(60);
        }

        // Final finisher has 0 restSeconds
        const finisher = day2.exercises.find(e => e.id === 'day2-ex6');
        expect(finisher.restSeconds).toBe(0);

        // UI Verification on Round 1
        await page.locator('.day-card').nth(1).click();
        const firstBagCard = page.locator('.item-card[data-id="day2-ex1"]');
        await firstBagCard.locator('.item-header').click();

        await firstBagCard.locator('button.btn-large:has-text("Start Round Timer")').click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // During Work Phase: Combos are rendered
        await expect(timerModal.locator('.timer-cue-container')).toBeVisible();
        await expect(timerModal.locator('.timer-header h3')).toHaveText('WORK');

        // Trigger Rest Phase
        await page.evaluate(() => {
            Timer.phase = 'rest';
            Timer.timeLeft = 60;
            Timer.totalDuration = 60;
            Timer.render();
        });

        // In Rest: header is REST, work combos hidden, restCue shown
        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText(expectedDay2Cues['day2-ex1']);

        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();
    });

    test('Day 5 (Conditioning Bag Day): All bag rounds have verified restCues and proper restSeconds structure', async ({ page }) => {
        const day5 = await page.evaluate(() => workoutData.days.find(d => d.id === 5));
        expect(day5).toBeDefined();

        const expectedDay5Cues = {
            'day5-ex1': 'Shoulders should be warm now. Shake it out, prepare for power singles.',
            'day5-ex2': 'Breathe deep. Drop the hands. Body work coming up next.',
            'day5-ex3': 'Recover. Next round is zero rest — Combination Power. Get ready.',
            'day5-ex5': 'One minute to recover. Final round is your power endurance test.',
            'day5-ex6': 'Outstanding work. Catch your breath. Day 5 is almost done.'
        };

        for (const [id, expectedCue] of Object.entries(expectedDay5Cues)) {
            const ex = day5.exercises.find(e => e.id === id);
            expect(ex).toBeDefined();
            expect(ex.restCue).toBe(expectedCue);
            expect(ex.restSeconds).toBe(60);
        }

        // Round 4 (Combination Power) is a standard timed round again
        const r4 = day5.exercises.find(e => e.id === 'day5-ex4');
        expect(r4.restSeconds).toBe(30);

        // Round 7 (Cool-Down Shadowboxing) has 0s rest (session ends)
        const r7 = day5.exercises.find(e => e.id === 'day5-ex7');
        expect(r7.restSeconds).toBe(0);

        // UI Verification on Day 5 Round 2 (Power Singles)
        await page.locator('.day-card').nth(4).click();
        const r2Card = page.locator('.item-card[data-id="day5-ex2"]');
        await r2Card.locator('.item-header').click();

        await r2Card.locator('button.btn-large:has-text("Start Round Timer")').click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Switch to rest phase
        await page.evaluate(() => {
            Timer.phase = 'rest';
            Timer.timeLeft = 60;
            Timer.totalDuration = 60;
            Timer.render();
        });

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        await expect(timerModal.locator('.timer-cue')).toHaveText(expectedDay5Cues['day5-ex2']);

        await timerModal.locator('.btn-cancel').click();
    });

    test('Quick Session Hybrid Boxing: Both Round 1 and Round 2 have bespoke restCues and combos are hidden in rest', async ({ page }) => {
        const hybrid = await page.evaluate(() => quickWorkouts.find(q => q.id === 'quick-hybrid'));
        expect(hybrid).toBeDefined();

        expect(hybrid.bagRounds.rounds[0].restCue).toBe('Great combinations. Hands down, shake it out. Body and head combos next.');
        expect(hybrid.bagRounds.rounds[0].restSeconds).toBe(60);

        expect(hybrid.bagRounds.rounds[1].restCue).toBe('Deep breaths. One round left — power finishing combinations. Leave it all on the bag.');
        expect(hybrid.bagRounds.rounds[1].restSeconds).toBe(60);

        expect(hybrid.bagRounds.rounds[2].restSeconds).toBe(0);

        // Open Hybrid Boxing quick session
        const hybridCard = page.locator('.qs-card:has-text("Hybrid Boxing")');
        await hybridCard.click();
        
        const swapBanner = page.locator('#swap-banner');
        if (await swapBanner.isVisible()) {
            await page.locator('#btn-confirm-swap').click();
            await expect(swapBanner).toBeHidden();
        }
        
        await expect(page.locator('.title-page')).toHaveText('Hybrid Boxing');

        // Expand Bag Work block
        const bagBlock = page.locator('.item-card[data-id="hybrid-bag"]');
        await bagBlock.locator('.item-header').click();

        // Start Round 1
        const startBtn = bagBlock.locator('.nested-row').first().locator('.btn-play');
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Switch to rest phase
        await page.evaluate(() => {
            if (Timer.countdownInterval) {
                clearInterval(Timer.countdownInterval);
                Timer.countdownInterval = null;
            }
            Timer.mode = 'round';
            Timer.phase = 'rest';
            Timer.timeLeft = 60;
            Timer.totalDuration = 60;
            Timer.roundData = {
                title: 'Basic Power Combinations',
                restCue: 'Great combinations. Hands down, shake it out. Body and head combos next.',
                combos: ['1-2-3 (Jab, Cross, Lead Hook)', '1-2-5 (Jab, Cross, Lead Uppercut)', '2-3-2 (Cross, Lead Hook, Cross)']
            };
            Timer.render();
        });

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        await expect(timerModal.locator('.timer-cue')).toHaveText('Great combinations. Hands down, shake it out. Body and head combos next.');

        await timerModal.locator('.btn-cancel').click();
    });

    test('Quick Session Shadow Boxing: All 4 main rounds have bespoke restCues and work combos are hidden in rest', async ({ page }) => {
        const shadow = await page.evaluate(() => quickWorkouts.find(q => q.id === 'quick-shadow-boxing'));
        expect(shadow).toBeDefined();

        const expectedShadowCues = [
            'Stay loose. Keep walking around the room. Prepare for head movement and counters.',
            'Breathe deep. Great head movement. Next round mixes defense into combos.',
            'Shake out the shoulders. One more intense round — full speed free flow.',
            'Incredible pace. Catch your breath for the cool-down shadowboxing.'
        ];

        for (let i = 0; i < 4; i++) {
            expect(shadow.bagRounds.rounds[i].restCue).toBe(expectedShadowCues[i]);
            expect(shadow.bagRounds.rounds[i].restSeconds).toBe(60);
        }

        // Round 5 (Cool Down Shadow) has 0 rest
        expect(shadow.bagRounds.rounds[4].restSeconds).toBe(0);

        // UI Verification
        const shadowCard = page.locator('.qs-card:has-text("Shadow Boxing")');
        await shadowCard.click();

        const swapBanner = page.locator('#swap-banner');
        if (await swapBanner.isVisible()) {
            await page.locator('#btn-confirm-swap').click();
            await expect(swapBanner).toBeHidden();
        }

        await expect(page.locator('.title-page')).toContainText('Shadow Boxing');

        // Expand Shadow Boxing Rounds card
        const roundsCard = page.locator('.item-card[data-id="shadow-main"]');
        await roundsCard.locator('.item-header').click();

        // Start Round 1
        const startBtn = roundsCard.locator('.nested-row').first().locator('.btn-play');
        await startBtn.click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Switch to rest phase
        await page.evaluate(() => {
            if (Timer.countdownInterval) {
                clearInterval(Timer.countdownInterval);
                Timer.countdownInterval = null;
            }
            Timer.mode = 'round';
            Timer.phase = 'rest';
            Timer.timeLeft = 60;
            Timer.totalDuration = 60;
            Timer.roundData = {
                title: 'Round 1 — Footwork + Basic Combos',
                restCue: 'Stay loose. Keep walking around the room. Prepare for head movement and counters.',
                combos: ['Jab, Cross (1-2)', 'Jab, Cross, Hook (1-2-3)', 'Jab, Cross, Hook, Cross (1-2-3-2)']
            };
            Timer.render();
        });

        await expect(timerModal.locator('.timer-header h3')).toHaveText('REST');
        await expect(timerModal.locator('.timer-cue-container')).toBeHidden();
        await expect(timerModal.locator('.timer-cue')).toHaveText('Stay loose. Keep walking around the room. Prepare for head movement and counters.');

        await timerModal.locator('.btn-cancel').click();
    });

    test('Day 1 (Lower Body Power): Rest modal displays exercise-specific restCue upon completion', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').nth(0).click();

        // Check Deadlift card (day1-ex1)
        const dlCard = page.locator('.item-card[data-id="day1-ex1"]');
        await dlCard.locator('.item-header').click();

        // Click check button to trigger rest modal
        await dlCard.locator('.btn-check').first().click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-cue')).toHaveText('Take the full two minutes. Do not rush. Let your central nervous system recover.');

        await timerModal.locator('.btn-cancel').click();
    });

    test('Quick Session Strength: Logging a set displays restCue instead of work cue (Mobile Viewport)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Open Upper Body Power quick session
        const upperCard = page.locator('.qs-card:has-text("Upper Body Power")');
        await upperCard.click();

        const swapBanner = page.locator('#swap-banner');
        if (await swapBanner.isVisible()) {
            await page.locator('#btn-confirm-swap').click();
            await expect(swapBanner).toBeHidden();
        }

        // Expand first exercise (Plyometric Push-ups)
        const plyoCard = page.locator('.item-card[data-id="day4-ex1"]');
        await plyoCard.locator('.item-header').click();

        // Click first set check button
        await plyoCard.locator('.btn-check').first().click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Should display restCue instead of work cue
        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('Shake out your arms. Stay light on your feet.');
        
        await timerModal.locator('.btn-cancel').click();
    });

    test('Quick Session Circuit Finisher: Displays restCue after round completion instead of empty string', async ({ page }) => {
        // Open Lower Body Power quick session
        const lowerCard = page.locator('.qs-card:has-text("Lower Body Power")');
        await lowerCard.click();

        const swapBanner = page.locator('#swap-banner');
        if (await swapBanner.isVisible()) {
            await page.locator('#btn-confirm-swap').click();
            await expect(swapBanner).toBeHidden();
        }

        // Expand finisher
        const finisherCard = page.locator('.item-card[data-id="lower-finisher"]');
        await finisherCard.locator('.item-header').click();

        // Start Round 1
        await finisherCard.locator('.btn-play').first().click();
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();

        // Complete the round (fast forward Timer phase)
        await page.evaluate(() => {
            if (Timer.countdownInterval) {
                clearInterval(Timer.countdownInterval);
                Timer.countdownInterval = null;
            }
            Timer.mode = 'round';
            Timer.phase = 'rest';
            Timer.timeLeft = 60;
            Timer.totalDuration = 60;
            Timer.roundData = {
                title: 'Round 1',
                restCue: 'One round down. Catch your breath before the final explosive leg push.'
            };
            Timer.render();
        });

        const restCue = timerModal.locator('.timer-cue');
        await expect(restCue).toBeVisible();
        await expect(restCue).toHaveText('One round down. Catch your breath before the final explosive leg push.');
        
        await timerModal.locator('.btn-cancel').click();
    });

    test('HIIT Boxing: Rest intervals have synchronized on-screen cue matching spoken prompts', async ({ page }) => {
        const hiitData = await page.evaluate(() => {
            return quickWorkouts.find(q => q.id === 'quick-hiit-boxing');
        });

        expect(hiitData).toBeDefined();
        const restIntervals = hiitData.playlist.filter(item => item.type === 'rest');
        expect(restIntervals.length).toBeGreaterThanOrEqual(10);

        for (const restItem of restIntervals) {
            expect(restItem.cue).toBeDefined();
            expect(restItem.cue.length).toBeGreaterThan(0);
            expect(restItem.timedCues).toBeDefined();
            expect(restItem.timedCues[0].text).toBe(restItem.cue);
        }
    });

    test('Shadow Boxing Quick Session: Card icon renders boxer image correctly', async ({ page }) => {
        const shadowCard = page.locator('.qs-card:has-text("Shadow Boxing")');
        await expect(shadowCard).toBeVisible();
        const iconImg = shadowCard.locator('.qs-boxer-icon');
        await expect(iconImg).toBeVisible();
        await expect(iconImg).toHaveAttribute('src', './assets/boxer-icon.png');
    });
});
