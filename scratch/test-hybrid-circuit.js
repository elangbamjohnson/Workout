const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:8080');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
    await page.locator('#btn-confirm-swap').click();
    
    // Expand Conditioning Circuit
    const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
    await circCard.locator('.item-header').click();
    
    // Click items
    await circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' }).click();
    await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
    
    let modalVisible = await page.locator('#timer-modal').isVisible();
    console.log('After 2 items, modal visible?', modalVisible);
    
    await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
    await page.waitForTimeout(500);
    modalVisible = await page.locator('#timer-modal').isVisible();
    console.log('After 3 items, modal visible?', modalVisible);
    
    await browser.close();
})();
