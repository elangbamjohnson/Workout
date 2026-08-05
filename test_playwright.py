import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('file:///Users/johnsonelangbam/Projects/Workout-Plan/index.html')
        
        # Click Day 2
        await page.click('text=Day 2')
        await page.wait_for_timeout(500)
        
        # Click the first round to start timer
        await page.click('.nested-row.interactive')
        await page.wait_for_timeout(500)
        
        # Check if modal is visible
        modal_visible = await page.is_visible('#timer-modal')
        print(f"Modal visible after start: {modal_visible}")
        
        # Click End Round Early
        await page.click('text=End Round Early')
        await page.wait_for_timeout(500)
        
        # Check if modal is visible
        modal_visible_after = await page.is_visible('#timer-modal')
        print(f"Modal visible after cancel: {modal_visible_after}")
        
        await browser.close()

asyncio.run(main())
