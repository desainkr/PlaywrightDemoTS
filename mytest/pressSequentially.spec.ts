import { test, expect, chromium } from '@playwright/test';

test('darg and drop test', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' })
    const page = await browser.newPage();
       await page.goto("https://amazon.com");
       await page.locator("input[id='twotabsearchtextbox']").pressSequentially("Laptop",{delay:100});
       await page.keyboard.press("Enter");
       await page.waitForTimeout(2000);
       

})