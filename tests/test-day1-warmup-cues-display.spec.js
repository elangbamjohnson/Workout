const { test, expect } = require('@playwright/test');
const path = require('path');

test('Verify Day 1 warmup displays all 8 exercise cues next to durations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to Day 1
    await page.locator('[data-day-id="1"], [data-day="1"], .day-card').first().click();
    await page.waitForTimeout(500);

    // Expand warmup card
    await page.locator('.item-card').filter({ hasText: /warm.?up/i }).first().click();
    await page.waitForTimeout(400);

    const expectedCues = [
        { name: 'Jump Rope', stat: '3 min', cue: 'Easy pace — this is activation, not cardio' },
        { name: 'Jumping Jacks', stat: '30s', cue: 'Full arm extension overhead on every rep' },
        { name: 'Mountain Climbers', stat: '30s', cue: 'Hips level, drive each knee toward your chest' },
        { name: 'Hip 90/90 Stretch', stat: '1 min', cue: 'Sit tall, press the front shin down, feel the hip open' },
        { name: 'Glute Bridges', stat: '2 × 10', cue: 'Squeeze glutes hard at the top, hold 1 second' },
        { name: 'Arm Circles', stat: '30s', cue: 'Full range — front and back, gradually increasing size' },
        { name: 'Bodyweight Squat', stat: '10 reps slow', cue: 'Pause 2 seconds at the bottom, drive through heels' },
        { name: 'Inchworm', stat: '5 reps', cue: 'Walk hands out to full plank, walk feet back in — slow' }
    ];

    const warmupRows = page.locator('.warmup-hybrid-row');
    await expect(warmupRows).toHaveCount(8);

    for (let i = 0; i < 8; i++) {
        const row = warmupRows.nth(i);
        const nameEl = row.locator('.warmup-hybrid-name');
        const statEl = row.locator('.warmup-hybrid-stat');
        const cueEl = row.locator('.warmup-hybrid-cue');

        await expect(nameEl).toContainText(expectedCues[i].name);
        await expect(statEl).toContainText(expectedCues[i].stat);
        await expect(cueEl).toContainText(expectedCues[i].cue);
        console.log(`[Item ${i + 1}] ${expectedCues[i].name}: ${await statEl.textContent()} • ${await cueEl.textContent()}`);
    }

    // Capture desktop and mobile screenshots
    const outDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';
    await page.screenshot({ path: path.join(outDir, 'day1-warmup-with-cues-desktop.png'), fullPage: true });

    await page.setViewportSize({ width: 375, height: 1600 });
    await page.screenshot({ path: path.join(outDir, 'day1-warmup-with-cues-mobile.png'), fullPage: true });
});
