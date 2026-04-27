import { test, expect, chromium } from '@playwright/test';

test('darg and drop test', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' })
    const page = await browser.newPage();
    //mouse hover
    await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");
     //Single
    await page.locator('#draggable').dragTo(page.locator('#droppable'));
    await page.waitForTimeout(2000);
// multiple commands
    await page.locator('#draggable').hover();
    await page.mouse.down();
    await page.locator('#droppable').hover();
    await page.mouse.up();
    await page.waitForTimeout(2000); 
    // another approach 
  //  await page.dragAndDrop('#draggable','#droppable');
})