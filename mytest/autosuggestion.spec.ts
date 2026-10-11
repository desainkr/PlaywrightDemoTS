import { test, expect } from '@playwright/test';

test('autosuggestion demo', async ({ page }) => {

    await page.goto("https://www.amazon.com/");
    await page.getByPlaceholder("Search Amazon").fill("Books");
    //await page.waitForSelector(".left-pane-results-container");
    await page.waitForSelector("//div[contains(@id,'sac-suggestion-row')]"); //[id*='sac-suggestion-row']
    await expect(page.locator("//div[contains(@id,'sac-suggestion-row')]").first()).toBeVisible();
    const suggResults = page.locator("//div[contains(@id,'sac-suggestion-row')]");
    const bookscount = await suggResults.count();
    console.log("Auto populated Books count is :", bookscount);
    expect(bookscount).toBe(22);
    //  const allbooks = await suggResults.allTextContents();
    //  console.log("Auto populated Books are :",allbooks);
    //Validate book on sale from auto suggest
    await expect(page.locator("[id*='sac-suggestion-row']", { hasText: 'books on sale' }).first()).toBeVisible();
   // await page.locator("[id*='sac-suggestion-row']",{hasText:'books on sale'}).first().click();
    //await page.waitForTimeout(3000);
    const allbooks = await page.locator("[id*='sac-suggestion-row']").all();
    for (const option of allbooks) {

        const text = await option.textContent();
        //console.log(text);
        
        if (text && text.includes("bookshelves")) {
            await option.click();
            break;
        }
    }
    await page.waitForTimeout(3000);

})