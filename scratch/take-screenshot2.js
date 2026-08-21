const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8000');
    await page.locator('.qs-card:has-text("Upper Body Power")').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/upper-body-qs.png' });
    await browser.close();
})();
