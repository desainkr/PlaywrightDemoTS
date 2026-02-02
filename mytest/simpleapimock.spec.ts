
import { test, expect } from "@playwright/test";

test ('simple API mock', async ({ page }) => {

  await page.route('**/api/v1/fruits/', async route => {
    await route.fulfill({
      status: 200,
      json: [
        { name: 'Orange', id: 21 },
        { name: 'Strawberry', id: 22 },
        { name: 'Banana', id: 23 },
        { name: 'Lime', id: 24 },
      ]
    });
  });

  // Go to the page AFTER setting up the route
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assertions
  await expect(page.getByText('Orange')).toBeVisible();
  await expect(page.getByText('Strawberry')).toBeVisible();
  await expect(page.getByText('Banana')).toBeVisible();
  await expect(page.getByText('Lime')).toBeVisible();

});

/*

*/

