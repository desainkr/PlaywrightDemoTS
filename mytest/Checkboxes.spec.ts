import { test, expect } from '@playwright/test';

test('Test checkbox box', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByRole('link', { name: 'Check Box' }).click()

    await expect(page).toHaveTitle("Selenium Practice - Check Box")
    await page.locator("#bs_1 .plus").first().click();
    await expect (page.locator(`#c_bs_1`)).not.toBeChecked();
    await expect (page.locator(`#c_bf_1`)).not.toBeChecked();
    await expect (page.locator(`#c_bf_2`)).not.toBeChecked();
    await page.waitForTimeout(3300)
    //Check main checkbox
    await page.locator(`#c_bs_1`).check();
    await expect (page.locator(`#c_bf_1`)).toBeChecked();
    await expect (page.locator(`#c_bf_2`)).toBeChecked();
    // uncheck fist checkbox
    await page.locator(`#c_bf_1`).uncheck()
    await expect (page.locator(`#c_bs_1`)).not.toBeChecked();


    // Second Checkbox section

    await page.locator("#bs_2 .plus").first().click();

    await expect (page.locator(`#c_bs_2`)).not.toBeChecked();
    await expect (page.locator(`#c_bf_3`)).not.toBeChecked();
    await expect (page.locator(`#c_bf_4`)).not.toBeChecked();
    await page.waitForTimeout(3300)
    //Check main checkbox
    await page.locator(`#c_bs_2`).check();
    await expect (page.locator(`#c_bf_3`)).toBeChecked();
    await expect (page.locator(`#c_bf_4`)).toBeChecked();
    // uncheck fist checkbox
    await page.locator(`#c_bf_3`).uncheck()
    await expect (page.locator(`#c_bs_2`)).not.toBeChecked();

})

test('Amazon checkbox box', async ({ page }) => {

    await page.goto('https://www.amazon.com/');
    await page.getByRole('searchbox', { name: 'Search Amazon' }).fill("book");
    //await page.keyboard.press("Enter");
    await page.locator('#nav-search-submit-button').click();
    await page.waitForTimeout(3000)


});