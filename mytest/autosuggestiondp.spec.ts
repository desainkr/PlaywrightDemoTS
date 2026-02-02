import { test, expect } from "@playwright/test";

test('Autosuggest', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    //await page.goto("https://www.google.com/");
    await page.locator("input[name='q']").fill("smart"); //Search text
    //await page.locator("textarea[title='Search']").fill("smart"); //Search text
    //await page.waitForTimeout(5000);
    //Get all the suggested option--> ctrl+Shift+p  on DOM -->emulate focused page 
    //const suggestions = page.locator("ul>li");

    // await expect(page.getByRole('listitem').first()).toBeVisible();
    const suggestions = page.getByRole('listitem')
    //const suggestions = page.getByRole('option');
    await suggestions.first().waitFor({ state: 'visible' });
    /*
       Use one of these instead of hard waits:
       locator.waitFor({ state: 'visible' })
       locator.first().waitFor({ state: 'visible' })
       expect(locator).toBeVisible()
       page.waitForSelector()
    */

    //const suggestions = page.getByRole('list').getByRole('listitem');
    //const suggestions = page.locator("form[action='/search'] ul").locator("li");
    //const suggestions = page.locator("li:has-text('smart')");
    //const suggestions = page.locator("form[action='/search']").locator("a"); //THIS is the best “works everywhere” approach
    //const suggestions = page.locator("a").filter({ hasText: 'smart' }); 
    //const suggestions = page.getByRole('option'); //Google suggestions
    /*
  await page.goto('https://www.google.com');
  await page.getByRole('combobox', { name: /search/i }).fill('smart');
  const suggestions = page.getByRole('option');
  await expect(suggestions).toHaveCount(10);
  await suggestions.first().click();
    */
    const count = await suggestions.count();
    console.log("total number of suggestions are :", count);
    const suggestionstext = await suggestions.allTextContents();
    //const suggestionstext1 = await suggestions.allInnerTexts();
    // const suggestionstext2 = await suggestions.allTextContents();
    // console.log("The suggestions text1 are :", suggestionstext1);
    //console.log("The suggestions text2 are :", suggestionstext2);
    //console.log("The suggestions text for fifth :", await suggestions.nth(5).innerText());
    //  await suggestions.first().click();

    for (let i = 0; i < count; i++) {
        console.log(await suggestions.nth(i).innerText());
        //console.log(await suggestions.nth(i).textContent());

    }

    for (let i = 0; i < count; i++) {
        const text = await suggestions.nth(i).innerText();
        if (text === 'smartphone') {
            await suggestions.nth(i).click();
            break;
        }

    }
    await page.waitForTimeout(4000);

})