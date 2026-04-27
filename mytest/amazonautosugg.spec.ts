
import { test, expect } from "@playwright/test";

test('Set example', async ({ page }) => {

    await page.goto("https://www.amazon.com/");
    await page.getByRole('searchbox', { name: 'Search Amazon' }).fill("book");
    await page.waitForSelector(".left-pane-results-container");
    await expect(page.locator(".left-pane-results-container")).toBeVisible();

    //await page.waitForTimeout(4000)
    const suggBooks = page.locator("[id*='sac-suggestion-row']");  //  another way xpath//div[contains(@id, 'sac-suggestion-row')]
    //*= → "contains" operator (matches if the value has this text anywhere inside)
    //It selects every HTML element whose id attribute contains the substring "sac-suggestion-row" anywhere inside it (the *= means "contains").
    await suggBooks.first().waitFor({ state: "visible" });
    const booksugcount = await suggBooks.count();
    console.log("Total suggestion count are:", booksugcount);
    expect(await page.locator("[id*='sac-suggestion-row']")).toHaveCount(22);
    //print all 
    const optionsText = await page.locator("[id*='sac-suggestion-row']").allTextContents();
    //console.log("The books content is :",optionsText);
    //without loop

    //await expect(page.locator("[id*='sac-suggestion-row']", { hasText: 'book case' }).first()).toBeVisible();
    // await page.locator("[id*='sac-suggestion-row']", { hasText: 'book case' }).first().click();
    await page.waitForTimeout(2000);
    //looping

    const options = await page.locator("[id*='sac-suggestion-row']").all();
    for (const option of options) 
    {
        const text = await option.textContent();
      //  if (text && text.includes('book case')) 
      if (text ==='book case')
            {
            await option.click();
            break;
            }
    }
    page.close();

})


