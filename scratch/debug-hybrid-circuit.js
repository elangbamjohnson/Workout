const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.clock.install();
    await page.goto('http://127.0.0.1:8080');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
    await page.locator('#btn-confirm-swap').click();
    
    const circCard = page.locator('.item-card').filter({ hasText: 'Conditioning Circuit' });
    await circCard.locator('.item-header').click();
    
    await circCard.locator('.nested-row').filter({ hasText: 'Kettlebell Swings' }).click();
    await page.waitForTimeout(50);
    await circCard.locator('.nested-row').filter({ hasText: 'Burpees' }).click();
    await page.waitForTimeout(50);
    await circCard.locator('.nested-row').filter({ hasText: 'Squat Jumps' }).click();
    await page.waitForTimeout(50);
    
    console.log('Class before FF:', await page.locator('#timer-modal').getAttribute('class'));
    
    for (let i = 0; i < 46; i++) {
        await page.clock.fastForward('00:01');
        await page.waitForTimeout(10);
    }
    
    console.log('Class after FF:', await page.locator('#timer-modal').getAttribute('class'));
    const isHidden = await page.locator('#timer-modal').isHidden();
    console.log('Is hidden?', isHidden);
    
    await browser.close();
})();
