import { test, expect } from "@playwright/test";
import tags from "../mocks/tags.json" with { type: "json" };
//Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' 
// is set to 'NodeNext'.ts(1543) module "c:/Users/desai/Documents/PlaywrightDemoTS/mocks/tags"

test('Mocking API request in playwright', async ({ page }) => {

   await page.route('*/**/api/v1/fruits',async route =>{

      const json = [
        { name: 'Strawberry', id: 21 },
        { name: 'Apple', id: 22 },
        { name: 'Banana', id: 23 },
        { name: 'Grape', id: 24 },

      ];
      
      await route.fulfill({json});
  
  
   })
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
  await expect(page.getByText('Apple')).toBeVisible();
  await expect(page.getByText('Banana')).toBeVisible();
  await expect(page.getByText('Grape')).toBeVisible();
})