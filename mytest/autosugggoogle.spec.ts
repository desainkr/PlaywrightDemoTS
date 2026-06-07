import { test, expect } from "@playwright/test";

test('Autosuggest', async ({ page }) => {
    
  await page.goto('https://www.google.com');
  await page.getByRole('combobox', { name: 'Search' }).fill('smart');
  const suggestions = page.locator("ul[role='listbox'] li");
  const count = await suggestions.count();
  console.log("total number of suggestions are :", count);
  await expect(suggestions).toHaveCount(10);
  await suggestions.first().click();
  
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