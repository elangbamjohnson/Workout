const { test, expect } = require('@playwright/test');

test('Quick Session Play Icons and Video IDs Check', async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    // Open Upper Body Power quick session and confirm swap modal
    const upperCard = page.locator('.qs-card:has-text("Upper Body Power")');
    await upperCard.click();
    await page.locator('#btn-confirm-swap').click();

    // 1. Check Warmup items with demo videos
    const warmupCard = page.locator('.item-card[data-id="warmup-card"]');
    await warmupCard.locator('.item-header').click();

    const expectedWarmupVideos = [
        { name: 'Hip 90/90 Stretch', videoId: 'fDC2KC1XqY8' },
        { name: 'Glute Bridges', videoId: 'GI5BtRDTuyc' },
        { name: 'Inchworm', videoId: '7jeW4v_oaes' }
    ];

    for (const item of expectedWarmupVideos) {
        const row = page.locator(`.warmup-hybrid-row:has-text("${item.name}"), .nested-row:has-text("${item.name}")`);
        const btn = row.locator('.btn-demo-icon');
        await expect(btn).toBeVisible();
        
        // Click and assert specific video modal content
        await btn.click();
        const modal = page.locator('#videoModalOverlay');
        await expect(modal).toBeVisible();
        
        const iframe = modal.locator('iframe');
        await expect(iframe).toHaveAttribute('src', new RegExp(item.videoId));
        
        const fallbackLink = modal.locator('.video-modal-footer a');
        await expect(fallbackLink).toHaveAttribute('href', `https://www.youtube.com/shorts/${item.videoId}`);
        
        // Close modal
        await modal.locator('.btn-close-modal').click();
        await expect(modal).not.toBeVisible();
    }

    // 2. Check all 8 Main Exercises with demo videos
    const expectedExercises = [
        { id: 'day4-ex1', name: 'Plyometric Push-ups', videoId: 'iO0sT5FDgj4' },
        { id: 'day4-ex2', name: 'Landmine Rotational Clean and Press', videoId: 'kYj_kuUCla4' },
        { id: 'day4-ex3', name: 'Landmine Single-Arm Push Press', videoId: 'eXD70Z14c34' },
        { id: 'day4-ex4', name: 'Ring Rows (Explosive Pull)', videoId: 'pyhQJuxxskk' },
        { id: 'day4-ex5', name: 'Archer Ring Row', videoId: 'YDEuRPiJpuU' },
        { id: 'day4-ex6', name: 'Single-arm Kettlebell Swings', videoId: 'N9iGxOKl38A' },
        { id: 'day4-ex7', name: 'Dumbbell Woodchoppers', videoId: 'rgjHOnCgkuk' },
        { id: 'day4-ex8', name: 'Hanging Leg Raises', videoId: 'XgTlyPzuKmQ' }
    ];

    for (const ex of expectedExercises) {
        const card = page.locator(`.item-card[data-id="${ex.id}"]`);
        const btn = card.locator('.btn-demo-icon');
        await expect(btn).toBeVisible();
        
        // Click and assert specific video modal content
        await btn.click();
        const modal = page.locator('#videoModalOverlay');
        await expect(modal).toBeVisible();
        
        const iframe = modal.locator('iframe');
        await expect(iframe).toHaveAttribute('src', new RegExp(ex.videoId));
        
        const fallbackLink = modal.locator('.video-modal-footer a');
        await expect(fallbackLink).toHaveAttribute('href', `https://www.youtube.com/shorts/${ex.videoId}`);
        
        // Close modal
        await modal.locator('.btn-close-modal').click();
        await expect(modal).not.toBeVisible();
    }
});
