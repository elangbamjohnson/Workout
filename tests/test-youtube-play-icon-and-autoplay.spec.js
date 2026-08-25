const { test, expect } = require('@playwright/test');

test.describe('YouTube-Style Play Icon & Video Autoplay', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await expect(page.locator('#splash-screen')).toBeHidden();
    });

    test('Demo icon is styled as a YouTube play button with red badge and white play triangle', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();
        await expect(page.locator('.title-page')).toHaveText('Lower Body Power');

        // Expand warmup section if collapsed
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const jumpRopeRow = warmupCard.locator('.warmup-hybrid-row').filter({ hasText: 'Jump Rope' });
        const demoBtn = jumpRopeRow.locator('.btn-demo-icon');
        await expect(demoBtn).toBeVisible();

        // Verify background color is YouTube red (rgb(255, 0, 0))
        const btnBg = await demoBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(btnBg).toBe('rgb(255, 0, 0)');

        // Verify border-radius is rounded rectangle
        const borderRadius = await demoBtn.evaluate(el => window.getComputedStyle(el).borderRadius);
        expect(borderRadius).toBe('4px');

        // Verify play triangle color is white
        const iconColor = await demoBtn.evaluate(el => window.getComputedStyle(el).color);
        expect(iconColor).toBe('rgb(255, 255, 255)');
    });

    test('Tapping play button opens video modal with autoplay configured in iframe', async ({ page }) => {
        // Open Day 1
        await page.locator('.day-card').first().click();

        // Expand warmup section
        const warmupCard = page.locator('.item-card').first();
        if (!await warmupCard.evaluate(el => el.classList.contains('expanded'))) {
            await warmupCard.locator('.item-header').click();
        }

        const jumpRopeRow = warmupCard.locator('.warmup-hybrid-row').filter({ hasText: 'Jump Rope' });
        const demoBtn = jumpRopeRow.locator('.btn-demo-icon');

        // Click play button
        await demoBtn.click();

        const videoModal = page.locator('#videoModalOverlay');
        await expect(videoModal).toBeVisible();

        // Verify iframe exists and has autoplay parameters
        const iframe = videoModal.locator('iframe');
        await expect(iframe).toBeVisible();

        const iframeSrc = await iframe.getAttribute('src');
        expect(iframeSrc).toContain('autoplay=1');
        expect(iframeSrc).toContain('enablejsapi=1');
        expect(iframeSrc).toContain('mute=1');
        expect(iframeSrc).toContain('playsinline=1');

        const allowAttr = await iframe.getAttribute('allow');
        expect(allowAttr).toContain('autoplay');
    });
});
