import { test, expect, chromium } from '@playwright/test';

test('mouse click events', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' })
    const page = await browser.newPage();
    //mouse hover
    await page.goto("https://www.amazon.com/");
    await page.locator("//span[@class='nav-line-2 ']").hover();
    await page.getByText("Account").first().click();
    await page.waitForTimeout(2000);

    //Doubleclick 
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
    await page.locator("//button[normalize-space()='Double-Click Me To See Alert']").dblclick();
    await page.waitForTimeout(2000);
    // Right click 
    await page.locator("//span[@class='context-menu-one btn btn-neutral']").click({ button: 'right' })
    await page.waitForTimeout(2000);
    //Shift+click

    await page.goto("https://the-internet.herokuapp.com/shifting_content");
    await page.locator("//a[normalize-space()='Example 1: Menu Element']").click({ modifiers: ["Shift"] });
    await page.waitForTimeout(2000);
})