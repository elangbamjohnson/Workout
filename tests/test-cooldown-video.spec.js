const { test, expect } = require('@playwright/test');

test.describe('Cool-Down Video Demo for Chest + Shoulder Stretch', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Chest + shoulder stretch in Hybrid Boxing renders video demo icon and opens modal with Cka38QWoVeY', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Locate and expand Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await cdCard.locator('.item-header').click();

        // Find Chest + shoulder stretch row
        const row = cdCard.locator('.nested-row').filter({ hasText: 'Chest + shoulder stretch' });
        await expect(row).toBeVisible();

        // Check for video demo icon
        const demoBtn = row.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        await page.screenshot({ path: `${artifactsDir}/chest-shoulder-stretch-card-icon.png` });

        // Click demo button to open modal
        await demoBtn.click();

        // Verify video modal
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Chest + shoulder stretch');

        // Check iframe src contains Cka38QWoVeY
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toBeVisible();
        const src = await iframe.getAttribute('src');
        expect(src).toContain('Cka38QWoVeY');

        await page.screenshot({ path: `${artifactsDir}/chest-shoulder-stretch-video-modal.png` });

        // Close modal
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });

    test('Lat/upper-back stretch in Hybrid Boxing renders video demo icon and opens modal with ExTlW_pfX_s', async ({ page }) => {
        const artifactsDir = '/Users/johnsonelangbam/.gemini/antigravity-ide/brain/22ed050f-5d8e-4b3f-8210-8eac4d1c1e9c';

        // Open Hybrid Boxing
        await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
        const swapBtn = page.locator('#btn-confirm-swap');
        if (await swapBtn.isVisible()) await swapBtn.click();

        // Locate and expand Cool Down card
        const cdCard = page.locator('.item-card[data-id="cooldown-card"]');
        await expect(cdCard).toBeVisible();
        await cdCard.locator('.item-header').click();

        // Find Lat/upper-back stretch row
        const row = cdCard.locator('.nested-row').filter({ hasText: 'Lat/upper-back stretch' });
        await expect(row).toBeVisible();

        // Check for video demo icon
        const demoBtn = row.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        await page.screenshot({ path: `${artifactsDir}/lat-upper-back-stretch-card-icon.png` });

        // Click demo button to open modal
        await demoBtn.click();

        // Verify video modal
        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();
        await expect(videoModal.locator('.video-modal-title')).toHaveText('Lat/upper-back stretch');

        // Check iframe src contains ExTlW_pfX_s
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toBeVisible();
        const src = await iframe.getAttribute('src');
        expect(src).toContain('ExTlW_pfX_s');

        await page.screenshot({ path: `${artifactsDir}/lat-upper-back-stretch-video-modal.png` });

        // Close modal
        await videoModal.locator('.btn-close-modal').click();
        await expect(videoModal).toBeHidden();
    });
});
