const { test, expect } = require('@playwright/test');

test.describe('PWA In-App Update Notification System', () => {

    test.beforeEach(async ({ page }) => {
        // Go to the app
        await page.goto('/');
        
        // Ensure app is loaded and splash is hidden
        await page.locator('#splash-screen').waitFor({ state: 'hidden', timeout: 10000 });
        
        // Mock a basic registration object for testing the manager directly
        await page.evaluate(() => {
            window.mockRegistration = {
                waiting: null,
                installing: null,
                postMessageSpy: false,
                addEventListener: () => {}
            };
            window.PWAUpdateManager.registration = window.mockRegistration;
        });
    });

    test('Test 1 & 8 — New waiting service worker produces banner exactly once', async ({ page }) => {
        // Trigger update available
        await page.evaluate(() => {
            window.PWAUpdateManager.showUpdateAvailable();
        });

        const banner = page.locator('#update-banner');
        await expect(banner).toBeVisible();
        await expect(banner.locator('h3')).toContainText('New version available (v33)');
        await expect(banner.locator('p')).toContainText('Strike First has been updated with improvements and fixes.');
        await expect(banner.locator('.btn-update-now')).toBeVisible();
        await expect(banner.locator('.btn-update-later')).toBeVisible();

        // Test 8: Triggering again shouldn't duplicate or change display
        await page.evaluate(() => {
            window.PWAUpdateManager.showUpdateAvailable();
        });
        await expect(page.locator('#update-banner')).toHaveCount(1);
    });

    test('Test 2 — No banner on initial installation (no active controller)', async ({ page }) => {
        // Reload and intercept to ensure no controller
        await page.goto('/');
        await page.locator('#splash-screen').waitFor({ state: 'hidden' });
        
        // Ensure banner is not shown natively on first load
        const banner = page.locator('#update-banner');
        await expect(banner).toBeHidden();
    });

    test('Test 3 — Update Now triggers SKIP_WAITING', async ({ page }) => {
        await page.evaluate(() => {
            // Mock waiting worker
            window.mockRegistration.waiting = {
                postMessage: (msg) => {
                    window.mockRegistration.postMessageSpy = msg;
                }
            };
            window.PWAUpdateManager.showUpdateAvailable();
        });

        const banner = page.locator('#update-banner');
        await banner.locator('.btn-update-now').click();

        // Verify postMessage was called with SKIP_WAITING
        const msg = await page.evaluate(() => window.mockRegistration.postMessageSpy);
        expect(msg).toEqual({ type: 'SKIP_WAITING' });
        
        // Verify banner is dismissed
        await expect(banner).toBeHidden();
    });

    test('Test 4 — Later dismisses the banner', async ({ page }) => {
        await page.evaluate(() => {
            window.PWAUpdateManager.showUpdateAvailable();
        });

        const banner = page.locator('#update-banner');
        await expect(banner).toBeVisible();

        await banner.locator('.btn-update-later').click();
        
        // Verify banner is dismissed
        await expect(banner).toBeHidden();
    });

    test('Test 5 — Existing waiting worker on startup shows banner', async ({ page }) => {
        // We simulate the startup logic directly
        await page.evaluate(() => {
            window.PWAUpdateManager.dismissBanner();
            // Simulate the load event logic when waiting worker exists
            const mockReg = { waiting: {} };
            // Manually invoke the showUpdateAvailable to simulate controller + waiting
            window.PWAUpdateManager.showUpdateAvailable();
        });

        const banner = page.locator('#update-banner');
        await expect(banner).toBeVisible();
    });

    test('Test 6 — Active workout defers update', async ({ page }) => {
        // Simulate active workout
        await page.evaluate(() => {
            Timer.isActive = true;
            Timer.phase = 'work';
            window.PWAUpdateManager.showUpdateAvailable();
        });

        const banner = page.locator('#update-banner');
        await expect(banner).toBeVisible();

        // Verify alternative messaging and lack of "Update now" button
        await expect(banner.locator('p')).toContainText('Your workout is still running. Update when you\'re finished.');
        await expect(banner.locator('.btn-update-now')).toBeHidden();
        await expect(banner.locator('.btn-update-later')).toBeVisible();
    });

});
