import { test, expect } from '@playwright/test';

test('Drop down test1', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
    //Seelct option dropdown
    await page.locator(`#state`).selectOption({ value: 'Rajasthan' }); // By using value
    await page.waitForTimeout(4000)
    await page.locator(`#state`).selectOption({ index: 2 });  // By using index
    await page.waitForTimeout(2000);
    await page.locator(`#state`).selectOption({ label: 'Haryana' }); //By using label

})

test('Drop down Amazon test2', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    //Seelct option dropdown
    // await page.locator('#searchDropdownBox').selectOption({ value: 'search-alias=alexa-skills' }) //By using value
    // await page.waitForTimeout(4000)
    // await page.locator('#searchDropdownBox').selectOption({ index: 5 }) // By using index
    // await page.waitForTimeout(4000)
    // await page.locator('#searchDropdownBox').selectOption({ label: 'Cell Phones & Accessories' }) //By using label

    //Another approache 

  // const alexaselected = await page.selectOption('#searchDropdownBox', { value: 'search-alias=alexa-skills' }) //By using value
    //await expect(alexaselected).toBeTruthy();
    //InputValue()
    //  const selectionoption =await page.locator('#searchDropdownBox').inputValue();
    //  await expect(selectionoption).toBe("search-alias=alexa-skills");
    // textContent method

/* const selectionoption = await page.locator('#searchDropdownBox option:checked').textContent();
    await expect(selectionoption).toBe("Alexa Skills");
    await page.waitForTimeout(4000)
    await page.selectOption('#searchDropdownBox', { index: 5 }) // By using index
    await page.waitForTimeout(4000)
    await page.selectOption('#searchDropdownBox', { label: 'Cell Phones & Accessories' }) //By using label
    */

   const selectionoption = await page.locator('#searchDropdownBox option:checked').textContent();
   await expect(selectionoption).toBe("All Departments");
   //await page.waitForLoadState("networkidle");
   const suggboxcount = await page.locator('#searchDropdownBox option').count()
  console.log("The Suggest drop down count is :", suggboxcount);
  
 const options = await page.locator('#searchDropdownBox option').allTextContents();
 console.log(options.length);
 expect(options.length).toBe(63);

 for (const text of options) {
  console.log(text.trim());
}
/*
//Example with allInnerTexts()
const texts = await page
  .locator('#searchDropdownBox option')
  .allInnerTexts();

for (const text of texts) {
  console.log(text.trim());
}
 //Example with allTextContents()
const texts = await page
  .locator('#searchDropdownBox option')
  .allTextContents();

for (const text of texts) {
  console.log(text.trim());
} */
 })
 