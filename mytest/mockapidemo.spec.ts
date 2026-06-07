import { test, expect } from "@playwright/test";
import tags from "../mocks/tags.json" with { type: "json" };
//Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' 
// is set to 'NodeNext'.ts(1543) module "c:/Users/desai/Documents/PlaywrightDemoTS/mocks/tags"

test('Mocking API', async ({ page }) => {

    await page.route('**/*/api/tags', async route =>
    {    if (route.request().method().includes("Get")) 
        {
        await route.fulfill({
        body: JSON.stringify(tags)
        })
    } else 
    {
        await route.continue()
    }


    })

    await page.goto("https://conduit.bondaracademy.com/");

    await expect(page.locator('.tag-list').first()).toContainText("qa career");




})