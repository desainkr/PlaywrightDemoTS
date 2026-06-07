import { test, expect } from "@playwright/test";
import tags from "../mocks/tags.json" with { type: "json" };
//Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' 
// is set to 'NodeNext'.ts(1543) module "c:/Users/desai/Documents/PlaywrightDemoTS/mocks/tags"
test('Mocking API request in playwright', async ({ page }) => {
   await page.route('*/**/api/v1/fruits',async route =>{  //👉 Intercepts request made by the UI
      const json = [   //Fake data (instead of backend)
        { name: 'Strawberry', id: 21 },
        { name: 'Apple', id: 22 },
        { name: 'Banana', id: 23 },
        { name: 'Grape', id: 24 },
      ];
       await route.fulfill({json});
 
   })
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');
  /*
  👉 Page loads
  👉 Page calls /api/v1/fruits
  👉 Your mock intercepts it
  */

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();  //UI shows mocked data
  await expect(page.getByText('Apple')).toBeVisible();       //UI shows mocked data
  await expect(page.getByText('Banana')).toBeVisible();      //UI shows mocked data
  await expect(page.getByText('Grape')).toBeVisible();      //UI shows mocked data
})
/*
THIS is the real use of mocking
Mock API → UI uses it → UI displays data → You validate UI
*/
/*
import tags from "../mocks/tags.json" with { type: "json" };
test('API Key Authentication', async ({ request }) => {

  const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: 'Bothell',
      appid: 'your_api_key'
    }
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  console.log(await response.json());
});  */