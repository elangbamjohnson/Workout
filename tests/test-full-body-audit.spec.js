const { test, expect } = require('@playwright/test');

test.describe('Full-Body Workout Streamlining Audit (quick-full-body-explosive)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#splash-screen')).toBeHidden();
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Data Model Verification: Exactly 15 exercises, Block 5 has 2, Block 6 has 3, duration ~45 min', async ({ page }) => {
        const fullBodyData = await page.evaluate(() => {
            return window.quickWorkouts.find(q => q.id === 'quick-full-body-explosive');
        });

        expect(fullBodyData).toBeDefined();
        expect(fullBodyData.duration).toBe('~45 min');

        // Total exercises across exercise blocks (Blocks 2, 3, 4, 5, 6)
        const exerciseBlocks = fullBodyData.blocks.filter(b => b.type === 'exercises');
        const allExercises = exerciseBlocks.flatMap(b => b.data.exercises);
        expect(allExercises.length).toBe(15);

        // Block 2: Explosive Power (3 exercises, including Landmine Rotational Press)
        const blk2 = fullBodyData.blocks.find(b => b.data.id === 'fb-blk2');
        expect(blk2.data.exercises.length).toBe(3);
        const blk2Names = blk2.data.exercises.map(e => e.name);
        expect(blk2Names).toContain('Landmine Rotational Press');

        // Block 5: Full-Body Athletic Conditioning (2 exercises: Kettlebell Swings, Burpees)
        const blk5 = fullBodyData.blocks.find(b => b.data.id === 'fb-blk5');
        expect(blk5.data.exercises.length).toBe(2);
        expect(blk5.data.exercises[0].name).toBe('Kettlebell Swings');
        expect(blk5.data.exercises[0].id).toBe('fb-blk5-1');
        expect(blk5.data.exercises[0].restSeconds).toBe(0);
        expect(blk5.data.exercises[0].cue).toBe('Good set. Move to Burpees.');
        expect(blk5.data.exercises[0].notes).not.toContain('Dumbbell Thrusters');
        expect(blk5.data.exercises[0].notes).not.toContain('Reverse Lunges');

        expect(blk5.data.exercises[1].name).toBe('Burpees');
        expect(blk5.data.exercises[1].id).toBe('fb-blk5-2');
        expect(blk5.data.exercises[1].restSeconds).toBe(45);
        expect(blk5.data.exercises[1].cue).toBe('Good set. Breathe. Rest 45 seconds before the next round.');
        expect(blk5.data.exercises[1].notes).toContain('Rest 45 seconds after this exercise');

        // Block 6: Rotational Core (3 exercises: Hanging Knee Raises, Ring Plank, Russian Twists)
        const blk6 = fullBodyData.blocks.find(b => b.data.id === 'fb-blk6');
        expect(blk6.data.exercises.length).toBe(3);
        expect(blk6.data.exercises[0].name).toBe('Hanging Knee Raises');
        expect(blk6.data.exercises[0].id).toBe('fb-blk6-1');
        expect(blk6.data.exercises[0].cue).toBe('Good set. Move to ring plank.');
        expect(blk6.data.exercises[0].notes).toContain('all 3 exercises');

        expect(blk6.data.exercises[1].name).toBe('Ring Plank');
        expect(blk6.data.exercises[1].id).toBe('fb-blk6-2');
        expect(blk6.data.exercises[1].cue).toBe('Good set. Move to Russian twists.');

        expect(blk6.data.exercises[2].name).toBe('Russian Twists');
        expect(blk6.data.exercises[2].id).toBe('fb-blk6-3');
        expect(blk6.data.exercises[2].restSeconds).toBe(30);
        expect(blk6.data.exercises[2].cue).toBe('Good set. Breathe. Rest 30 seconds. Core block complete.');
        
        // Confirm no Landmine Rotations in Block 6
        const blk6Names = blk6.data.exercises.map(e => e.name);
        expect(blk6Names).not.toContain('Landmine Rotations');
    });

    test('UI Verification: Renders cards, correct duration pill, Block 5 and 6 exercises visible upon expansion', async ({ page }) => {
        // Navigate to Full-Body Workout
        await page.locator('.qs-card').filter({ hasText: 'Full-Body Workout' }).click();
        if (await page.locator('#btn-confirm-swap').isVisible()) {
            await page.locator('#btn-confirm-swap').click();
        }
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Verify title & duration
        await expect(page.locator('.title-page')).toHaveText('Full-Body Workout');
        await expect(page.locator('.session-duration-stat')).toContainText('~45 min');

        // Expand Block 5 (Full-Body Athletic Conditioning)
        const blk5Card = page.locator('.item-card').filter({ hasText: 'Full-Body Athletic Conditioning' });
        await expect(blk5Card).toBeVisible();
        await blk5Card.locator('.item-header').click();
        await expect(blk5Card).toHaveClass(/expanded/);

        // Verify Block 5 contains only Kettlebell Swings and Burpees
        await expect(blk5Card).toContainText('Kettlebell Swings');
        await expect(blk5Card).toContainText('Burpees');
        await expect(blk5Card).not.toContainText('Dumbbell Thrusters');
        await expect(blk5Card).not.toContainText('Alternating Reverse Lunges');

        // Expand Block 6 (Rotational Core)
        const blk6Card = page.locator('.item-card').filter({ hasText: 'Rotational Core' });
        await expect(blk6Card).toBeVisible();
        await blk6Card.locator('.item-header').click();
        await expect(blk6Card).toHaveClass(/expanded/);

        // Verify Block 6 contains Hanging Knee Raises, Ring Plank, Russian Twists, and NOT Landmine Rotations
        await expect(blk6Card).toContainText('Hanging Knee Raises');
        await expect(blk6Card).toContainText('Ring Plank');
        await expect(blk6Card).toContainText('Russian Twists');
        await expect(blk6Card).not.toContainText('Landmine Rotations');

        // Verify Block 2 (Explosive Power) contains Landmine Rotational Press
        const blk2Card = page.locator('.item-card').filter({ hasText: 'Explosive Power' });
        await expect(blk2Card).toBeVisible();
        await blk2Card.locator('.item-header').click();
        await expect(blk2Card).toHaveClass(/expanded/);
        await expect(blk2Card).toContainText('Landmine Rotational Press');

        // Verify Warm-up & Mobility (WU) card styling & badge visibility
        const wuCard = page.locator('.item-card').filter({ hasText: 'Warm-up & Mobility' });
        await expect(wuCard).toBeVisible();
        await expect(wuCard).toHaveClass(/type-strength/);
        const wuBadge = wuCard.locator('.num-badge');
        await expect(wuBadge).toHaveText('WU');
        const wuBadgeBg = await wuBadge.evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(wuBadgeBg).not.toBe('rgba(0, 0, 0, 0)');
        expect(wuBadgeBg).toBe('rgb(238, 108, 63)'); // --strength-accent

        // Verify Mobility & Recovery (RC) card styling & badge visibility
        const rcCard = page.locator('.item-card').filter({ hasText: 'Mobility & Recovery' });
        await expect(rcCard).toBeVisible();
        await expect(rcCard).toHaveClass(/type-rest/);
        const rcBadge = rcCard.locator('.num-badge');
        await expect(rcBadge).toHaveText('RC');
        const rcBadgeBg = await rcBadge.evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(rcBadgeBg).not.toBe('rgba(0, 0, 0, 0)');
        expect(rcBadgeBg).toBe('rgb(139, 143, 163)'); // --rest-accent (#8b8fa3)
    });

    test('Mobile Viewport (375px): Full-Body Workout cards and nested exercise rows render cleanly', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.locator('.qs-card').filter({ hasText: 'Full-Body Workout' }).click();
        if (await page.locator('#btn-confirm-swap').isVisible()) {
            await page.locator('#btn-confirm-swap').click();
        }
        await expect(page.locator('#app-container')).not.toHaveClass(/is-home/);

        // Check cards render without page horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

        // Expand Conditioning and Core cards on mobile
        const blk5Card = page.locator('.item-card').filter({ hasText: 'Full-Body Athletic Conditioning' });
        await blk5Card.locator('.item-header').click();
        await expect(blk5Card).toHaveClass(/expanded/);

        const blk6Card = page.locator('.item-card').filter({ hasText: 'Rotational Core' });
        await blk6Card.locator('.item-header').click();
        await expect(blk6Card).toHaveClass(/expanded/);

        // Confirm no overflow after expanding cards
        const expandedScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(expandedScrollWidth).toBeLessThanOrEqual(clientWidth);
    });
});
