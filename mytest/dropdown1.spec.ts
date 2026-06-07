import { test, expect, devices} from '@playwright/test';

//const iphone = devices ['iphone 13 pro']
test.use({
 //...iphone
 ...devices ['iphone 13 pro']
})
test('verifying dropdown sorting order',{ tag: '@field' }, async ({ page }) => {
  
   await page.goto("https://testautomationpractice.blogspot.com/");
      // scroll window with java script 
    await page.locator('#country').scrollIntoViewIfNeeded();
    const rowvalues = await page.locator("#country>option").allTextContents();
    const dpvalues =rowvalues.map(text => text.trim())
    console.log(dpvalues);
    
    // scroll window with java script 
    await page.evaluate(() => { window.scrollBy(0, 500); });
    
    
    await page.waitForTimeout(2000);
    // remove duplicates
    const dups = new Set(dpvalues);
    console.log(dups);
    
    // 3 dots.. convert to array
 const dupsarray = [...new Set(dpvalues)];
    console.log(dupsarray);

    // multiple  selection
    const colorsdp = await page.locator("#colors").selectOption(["red", "blue","green"]);
  

})