const { test, expect } = require('@playwright/test');

test.describe('Day 4 (Upper Body Power) 8-Exercise Reordered Session Audit & Rendering Fixes', () => {
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

    test('Data Model Verification: Exactly 8 exercises in exact order with clean sequential IDs and restCues', async ({ page }) => {
        const day4 = await page.evaluate(() => {
            return workoutData.days.find(d => d.id === 4);
        });

        expect(day4).toBeDefined();
        expect(day4.exercises.length).toBe(8);

        const expectedExercises = [
            {
                id: 'day4-ex1',
                name: 'Plyometric Push-ups',
                setsReps: '4 x 6',
                weight: 'Bodyweight',
                restSeconds: 90,
                videoId: 'iO0sT5FDgj4',
                videoFormat: 'short',
                restCue: 'Shake out your arms. Stay light on your feet.'
            },
            {
                id: 'day4-ex2',
                name: 'Landmine Rotational Clean and Press',
                setsReps: '3 × 5 each side',
                weight: 'Bar only (20kg) to start — add 5kg once form is clean and movement is fluid end-to-end',
                restSeconds: 105,
                videoId: 'kYj_kuUCla4',
                videoFormat: 'short',
                restCue: 'Breathe deep. This one takes focus — reset your mind for the next set.'
            },
            {
                id: 'day4-ex3',
                name: 'Landmine Single-Arm Push Press',
                setsReps: '4 × 5 each side',
                weight: 'Bar only (20kg) to start — add 5kg once the leg drive and lockout are crisp on every rep',
                restSeconds: 90,
                videoId: 'eXD70Z14c34',
                videoFormat: 'short',
                restCue: "Recover that pressing arm. Switch sides mentally if you haven't yet."
            },
            {
                id: 'day4-ex4',
                name: 'Ring Rows (Explosive Pull)',
                setsReps: '4 x 6',
                weight: 'Bodyweight',
                restSeconds: 90,
                videoId: 'pyhQJuxxskk',
                videoFormat: 'short',
                restCue: 'Loosen the shoulders. Pulling power coming back up.'
            },
            {
                id: 'day4-ex5',
                name: 'Archer Ring Row',
                setsReps: '3 × 6 each side',
                weight: 'Bodyweight',
                restSeconds: 90,
                videoId: 'YDEuRPiJpuU',
                videoFormat: 'short',
                restCue: 'Rest both sides evenly. Stay square, stay patient.'
            },
            {
                id: 'day4-ex6',
                name: 'Single-arm Kettlebell Swings',
                setsReps: '3 x 8/side',
                weight: '18kg',
                restSeconds: 90,
                videoId: 'N9iGxOKl38A',
                videoFormat: 'short',
                restCue: 'Let the grip recover. Hips will thank you next set.'
            },
            {
                id: 'day4-ex7',
                name: 'Dumbbell Woodchoppers (Explosive)',
                setsReps: '3 x 8/side',
                weight: 'One dumbbell, 5-6kg',
                restSeconds: 75,
                videoId: 'rgjHOnCgkuk',
                videoFormat: 'short',
                restCue: 'Breathe and reset your rotation. Almost through the session.'
            },
            {
                id: 'day4-ex8',
                name: 'Hanging Leg Raises (Power Stand)',
                setsReps: '3 x 10',
                weight: 'Bodyweight',
                restSeconds: 60,
                videoId: 'XgTlyPzuKmQ',
                videoFormat: 'short',
                restCue: 'Final stretch. Shake out the grip, breathe deep.'
            }
        ];

        for (let i = 0; i < 8; i++) {
            const actual = day4.exercises[i];
            const expected = expectedExercises[i];
            expect(actual.id).toBe(expected.id);
            expect(actual.name).toBe(expected.name);
            expect(actual.setsReps).toBe(expected.setsReps);
            expect(actual.weight).toBe(expected.weight);
            expect(actual.restSeconds).toBe(expected.restSeconds);
            expect(actual.videoId).toBe(expected.videoId);
            expect(actual.videoFormat).toBe(expected.videoFormat);
            expect(actual.restCue).toBe(expected.restCue);
        }

        // Verify warmup has 8 exercises unchanged
        expect(day4.warmup.length).toBe(8);
        expect(day4.warmup.find(w => w.id === 'day4-wu4').videoId).toBe('fDC2KC1XqY8');
        expect(day4.warmup.find(w => w.id === 'day4-wu5').videoId).toBe('mzDpWDoJVFU');
        expect(day4.warmup.find(w => w.id === 'day4-wu8').videoId).toBe('RLSHZEomHCA');
    });

    test('UI Verification: Renders 8 exercise cards with badges 1 to 8 and shorter duration estimate', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');

        // Check header session duration tag
        const durationStat = page.locator('.session-duration-stat');
        await expect(durationStat).toContainText('~47 min with warm-up');

        // Check section header label
        const countHeader = page.locator('.content-header-row h2');
        await expect(countHeader).toHaveText('EXERCISES · 8');

        // Warmup card + 8 exercise cards = 9 total item cards
        const itemCards = page.locator('.item-card');
        await expect(itemCards).toHaveCount(9);

        // First card is Warmup
        await expect(itemCards.first().locator('.title-card')).toHaveText('Warm-up');
        await expect(itemCards.first().locator('.num-badge')).toHaveText('WU');

        // Cards 1-8
        const expectedTitles = [
            'Plyometric Push-ups',
            'Landmine Rotational Clean and Press',
            'Landmine Single-Arm Push Press',
            'Ring Rows (Explosive Pull)',
            'Archer Ring Row',
            'Single-arm Kettlebell Swings',
            'Dumbbell Woodchoppers (Explosive)',
            'Hanging Leg Raises (Power Stand)'
        ];

        for (let i = 0; i < 8; i++) {
            const card = itemCards.nth(i + 1);
            await expect(card.locator('.num-badge')).toHaveText(String(i + 1));
            await expect(card.locator('.title-card')).toHaveText(expectedTitles[i]);
            await expect(card.locator('.btn-demo-icon')).toBeVisible();
        }
    });

    test('1. Duplicate video play buttons: Exactly ONE play icon per exercise and NO bottom "Watch Video" button', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();

        // Check all 8 exercise cards
        for (let i = 1; i <= 8; i++) {
            const card = page.locator(`.item-card[data-id="day4-ex${i}"]`);
            await expect(card).toBeVisible();

            // Header has exactly 1 inline demo play icon
            const inlinePlayIcons = card.locator('.item-header .btn-demo-icon');
            await expect(inlinePlayIcons).toHaveCount(1);

            // Expand card
            await card.locator('.item-header').click();
            await expect(card).toHaveClass(/expanded/);

            // Verify no duplicate full-width "Watch Video" ghost button exists inside the card
            const bottomVideoBtn = card.locator('button:has-text("Watch Video")');
            await expect(bottomVideoBtn).toHaveCount(0);

            // Collapse back
            await card.locator('.item-header').click();
        }
    });

    test('2. Weight input placeholder shows "kg" and renders cleanly on mobile (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.day-card').nth(3).click();

        const card = page.locator('.item-card[data-id="day4-ex2"]');
        await card.locator('.item-header').click();

        const weightInputs = card.locator('.input-weight');
        await expect(weightInputs.first()).toHaveAttribute('placeholder', 'kg');

        // Check visibility and bounding box layout on mobile
        const firstRow = card.locator('.set-row').first();
        await expect(firstRow).toBeVisible();
        const checkBtn = firstRow.locator('.btn-check');
        await expect(checkBtn).toBeVisible();
    });

    test('3. Reps-parsing correctly handles "×" multiplication symbol and "x" letters', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();

        // Ex2 (Landmine Rotational Clean & Press: "3 × 5 each side")
        const ex2Card = page.locator('.item-card[data-id="day4-ex2"]');
        await ex2Card.locator('.item-header').click();
        const ex2RepsInput = ex2Card.locator('.input-rep').first();
        await expect(ex2RepsInput).toHaveValue('5 each side');

        // Ex3 (Landmine Single-Arm Push Press: "4 × 5 each side")
        const ex3Card = page.locator('.item-card[data-id="day4-ex3"]');
        await ex3Card.locator('.item-header').click();
        const ex3RepsInput = ex3Card.locator('.input-rep').first();
        await expect(ex3RepsInput).toHaveValue('5 each side');

        // Ex5 (Archer Ring Row: "3 × 6 each side")
        const ex5Card = page.locator('.item-card[data-id="day4-ex5"]');
        await ex5Card.locator('.item-header').click();
        const ex5RepsInput = ex5Card.locator('.input-rep').first();
        await expect(ex5RepsInput).toHaveValue('6 each side');

        // Ex1 (Plyometric Push-ups: "4 x 6")
        const ex1Card = page.locator('.item-card[data-id="day4-ex1"]');
        await ex1Card.locator('.item-header').click();
        const ex1RepsInput = ex1Card.locator('.input-rep').first();
        await expect(ex1RepsInput).toHaveValue('6');

        // Ex7 (DB Woodchoppers: "3 x 8/side")
        const ex7Card = page.locator('.item-card[data-id="day4-ex7"]');
        await ex7Card.locator('.item-header').click();
        const ex7RepsInput = ex7Card.locator('.input-rep').first();
        await expect(ex7RepsInput).toHaveValue('8/side');
    });

    test('Rest Timer Modal Text: All 8 Day 4 exercises display their distinct rest-appropriate subtitle', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();

        const expectedRestCues = [
            { id: 'day4-ex1', cue: 'Shake out your arms. Stay light on your feet.' },
            { id: 'day4-ex2', cue: 'Breathe deep. This one takes focus — reset your mind for the next set.' },
            { id: 'day4-ex3', cue: "Recover that pressing arm. Switch sides mentally if you haven't yet." },
            { id: 'day4-ex4', cue: 'Loosen the shoulders. Pulling power coming back up.' },
            { id: 'day4-ex5', cue: 'Rest both sides evenly. Stay square, stay patient.' },
            { id: 'day4-ex6', cue: 'Let the grip recover. Hips will thank you next set.' },
            { id: 'day4-ex7', cue: 'Breathe and reset your rotation. Almost through the session.' },
            { id: 'day4-ex8', cue: 'Final stretch. Shake out the grip, breathe deep.' }
        ];

        const timerModal = page.locator('#timer-modal');

        for (const item of expectedRestCues) {
            const card = page.locator(`.item-card[data-id="${item.id}"]`);
            await card.locator('.item-header').click();
            await expect(card).toHaveClass(/expanded/);

            // Click check button to start rest
            await card.locator('.btn-check').first().click();

            await expect(timerModal).toBeVisible();
            await expect(timerModal.locator('.timer-cue')).toHaveText(item.cue);

            // Close timer
            await timerModal.locator('.btn-cancel').click();
            await expect(timerModal).toBeHidden();

            // Collapse card
            await card.locator('.item-header').click();
        }
    });

    test('Warm-up Drill Button Label: Button reads "Skip" (not "Finish Workout") and only advances the current drill', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();

        const warmupCard = page.locator('.item-card[data-id="warmup-card"]');
        await warmupCard.locator('.item-header').click();
        await expect(warmupCard).toHaveClass(/expanded/);

        // Click Start on Jumping Jacks (30 sec drill)
        const jumpingJacksRow = warmupCard.locator('.nested-row').filter({ hasText: 'Jumping Jacks' });
        await jumpingJacksRow.locator('.btn-play').click();

        // Wait through 5s countdown
        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Jumping Jacks', { timeout: 8000 });
        await expect(timerModal.locator('.timer-header h3')).toHaveText('WORK');

        // Check action button label is "Skip"
        const skipBtn = timerModal.locator('.timer-actions button');
        await expect(skipBtn).toHaveText('Skip');

        // Click Skip
        await skipBtn.click();
        await expect(timerModal).toBeHidden();

        // Confirm Jumping Jacks is now marked completed with checked class
        await expect(jumpingJacksRow).toHaveClass(/checked/);

        // Confirm session is still active and not finished (e.g. exercises are still visible and incomplete)
        const ex1Card = page.locator('.item-card[data-id="day4-ex1"]');
        await expect(ex1Card).toBeVisible();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');
    });

    test('Warm-up Video Demos: Hip 90/90 Stretch, Glute Bridges, and Inchworm have play icons that open correct videos', async ({ page }) => {
        await page.locator('.day-card').nth(3).click();

        const warmupCard = page.locator('.item-card[data-id="warmup-card"]');
        await warmupCard.locator('.item-header').click();
        await expect(warmupCard).toHaveClass(/expanded/);

        const videoModal = page.locator('#videoModalOverlay');

        // 1. Hip 90/90 Stretch (fDC2KC1XqY8)
        const hipRow = warmupCard.locator('.nested-row').filter({ hasText: 'Hip 90/90 Stretch' });
        const hipPlayBtn = hipRow.locator('.btn-demo-icon');
        await expect(hipPlayBtn).toBeVisible();
        await hipPlayBtn.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /fDC2KC1XqY8/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // 2. Glute Bridges (mzDpWDoJVFU)
        const gluteRow = warmupCard.locator('.nested-row').filter({ hasText: 'Glute Bridges' });
        const glutePlayBtn = gluteRow.locator('.btn-demo-icon');
        await expect(glutePlayBtn).toBeVisible();
        await glutePlayBtn.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /mzDpWDoJVFU/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // 3. Inchworm (RLSHZEomHCA)
        const inchwormRow = warmupCard.locator('.nested-row').filter({ hasText: 'Inchworm' });
        const inchwormPlayBtn = inchwormRow.locator('.btn-demo-icon');
        await expect(inchwormPlayBtn).toBeVisible();
        await inchwormPlayBtn.click();
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /RLSHZEomHCA/);
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();

        // Confirm other 5 drills have NO demo icon
        const noVideoDrills = ['Jump Rope', 'Jumping Jacks', 'Mountain Climbers', 'Arm Circles', 'Bodyweight Squat'];
        for (const drillName of noVideoDrills) {
            const row = warmupCard.locator('.nested-row').filter({ hasText: drillName });
            await expect(row.locator('.btn-demo-icon')).toHaveCount(0);
        }
    });

    test('Mobile Viewport (375px): Warm-up "Skip" button fits cleanly without wrapping', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.day-card').nth(3).click();

        const warmupCard = page.locator('.item-card[data-id="warmup-card"]');
        await warmupCard.locator('.item-header').click();

        const armCirclesRow = warmupCard.locator('.nested-row').filter({ hasText: 'Arm Circles' });
        await armCirclesRow.locator('.btn-play').click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal.locator('.timer-header h2')).toHaveText('Arm Circles', { timeout: 8000 });

        const skipBtn = timerModal.locator('.timer-actions button');
        await expect(skipBtn).toHaveText('Skip');
        const box = await skipBtn.boundingBox();
        expect(box.width).toBeLessThanOrEqual(375);

        await skipBtn.click();
        await expect(timerModal).toBeHidden();
        await expect(armCirclesRow).toHaveClass(/checked/);
    });

    test('Mobile Viewport (375px): Rest Timer subtitle renders without awkward overflow or truncation', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.day-card').nth(3).click();

        const ex2Card = page.locator('.item-card[data-id="day4-ex2"]');
        await ex2Card.locator('.item-header').click();
        await ex2Card.locator('.btn-check').first().click();

        const timerModal = page.locator('#timer-modal');
        await expect(timerModal).toBeVisible();
        const cueElem = timerModal.locator('.timer-cue');
        await expect(cueElem).toBeVisible();
        await expect(cueElem).toHaveText('Breathe deep. This one takes focus — reset your mind for the next set.');

        // Verify bounding box width fits within 375px viewport
        const box = await cueElem.boundingBox();
        expect(box.width).toBeLessThanOrEqual(375);

        await timerModal.locator('.btn-cancel').click();
        await expect(timerModal).toBeHidden();
    });

    test('Mobile Viewport (375px): Video Demo opens correctly from title-adjacent play icon', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.day-card').nth(3).click();

        const archerCard = page.locator('.item-card[data-id="day4-ex5"]');
        const playIcon = archerCard.locator('.item-header .btn-demo-icon');
        await expect(playIcon).toBeVisible();

        await playIcon.click();
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Archer Ring Row');
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /YDEuRPiJpuU/);

        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });
});
