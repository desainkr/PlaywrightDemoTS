import { test, expect, chromium } from '@playwright/test';
/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.

page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
test('Verify playwright locators', async ({ }) => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
   await page.goto("https://demo.nopcommerce.com/", { timeout: 1000 });
    //1.page.getByRole() to locate by explicit and implicit accessibility attributes. //for img
    await expect(page.getByAltText("nopCommerce demo store")).toBeVisible();

    //2.page.getByText() to locate by text content.//non interactive elements 

    await expect(page.getByText('Welcome to our store', { exact: true })).toBeVisible(); //provided full string
    await expect(page.getByText('Welcome to')).toBeVisible(); //provided substring/partial test
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible(); //regular experession/ Mix cases

    //3.page.getByRole() to locate by explicit and implicit accessibility attributes.

     //await page.getByRole('link', { name:'Register' }).click()
     await page.waitForTimeout(2000);

   // await expect(page.getByRole('heading', { name: 'Register', level: 1 })).toBeVisible(); 

  //4.page.getByLabel() to locate a form control by associated label's text.

  /*await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2F", { timeout: 1000 });

  await page.getByLabel("First name:").fill("Neel")

  await page.getByLabel("Last name:").fill("Desai");
  await page.getByLabel("Email:").fill("Desai@gmail.com"); */

   //5.page.getByPlaceholder() to locate an input by placeholder.

    await page.getByPlaceholder('Search store').fill("Phone");


    //6.page.getByTitle() to locate an element by its title attribute.


    

})
