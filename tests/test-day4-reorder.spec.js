const { test, expect } = require('@playwright/test');

test.describe('Day 4 (Upper Body Power) 8-Exercise Reordered Session Audit', () => {
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

    test('Data Model Verification: Exactly 8 exercises in exact order with clean sequential IDs', async ({ page }) => {
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
                videoFormat: 'short'
            },
            {
                id: 'day4-ex2',
                name: 'Landmine Rotational Clean and Press',
                setsReps: '3 × 5 each side',
                weight: 'Bar only (20kg) to start — add 5kg once form is clean and movement is fluid end-to-end',
                restSeconds: 105,
                videoId: 'kYj_kuUCla4',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex3',
                name: 'Landmine Single-Arm Push Press',
                setsReps: '4 × 5 each side',
                weight: 'Bar only (20kg) to start — add 5kg once the leg drive and lockout are crisp on every rep',
                restSeconds: 90,
                videoId: 'eXD70Z14c34',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex4',
                name: 'Ring Rows (Explosive Pull)',
                setsReps: '4 x 6',
                weight: 'Bodyweight',
                restSeconds: 90,
                videoId: 'pyhQJuxxskk',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex5',
                name: 'Archer Ring Row',
                setsReps: '3 × 6 each side',
                weight: 'Bodyweight',
                restSeconds: 90,
                videoId: 'YDEuRPiJpuU',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex6',
                name: 'Single-arm Kettlebell Swings',
                setsReps: '3 x 8/side',
                weight: '18kg',
                restSeconds: 90,
                videoId: 'N9iGxOKl38A',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex7',
                name: 'Dumbbell Woodchoppers (Explosive)',
                setsReps: '3 x 8/side',
                weight: 'One dumbbell, 5-6kg',
                restSeconds: 75,
                videoId: 'rgjHOnCgkuk',
                videoFormat: 'short'
            },
            {
                id: 'day4-ex8',
                name: 'Hanging Leg Raises (Power Stand)',
                setsReps: '3 x 10',
                weight: 'Bodyweight',
                restSeconds: 60,
                videoId: 'XgTlyPzuKmQ',
                videoFormat: 'short'
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
        }

        // Verify warmup has 8 exercises unchanged
        expect(day4.warmup.length).toBe(8);
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

    test('Video Demo Verification: Archer Ring Row (day4-ex5) play icon opens video modal with YDEuRPiJpuU', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();
        await expect(page.locator('.title-page')).toHaveText('Upper Body Power');

        const archerCard = page.locator('.item-card[data-id="day4-ex5"]');
        await expect(archerCard).toBeVisible();

        // Click header play icon
        const playIcon = archerCard.locator('.item-header .btn-demo-icon');
        await expect(playIcon).toBeVisible();
        await playIcon.click();

        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Archer Ring Row');
        await expect(videoModal.locator('.video-container')).toHaveClass(/format-short/);
        await expect(videoModal.locator('iframe')).toHaveAttribute('src', /YDEuRPiJpuU/);

        // Close modal
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });

    test('Interactive Logging: Expanding Day 4 exercise card allows logging sets', async ({ page }) => {
        // Navigate to Day 4
        await page.locator('.day-card').nth(3).click();

        const ex2Card = page.locator('.item-card[data-id="day4-ex2"]');
        await ex2Card.locator('.item-header').click();
        await expect(ex2Card).toHaveClass(/expanded/);

        // Ex2 is 3 sets
        const setRows = ex2Card.locator('.set-row');
        await expect(setRows).toHaveCount(3);

        // Log set 1
        const checkBtn = setRows.first().locator('.btn-check');
        await checkBtn.click();
        await expect(setRows.first()).toHaveClass(/checked/);
    });
});
