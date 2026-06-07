import { test, expect } from '@playwright/test';

test('Test input box', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByRole('link', { name: 'Text Box' }).click()

    await expect(page).toHaveTitle("Selenium Practice - Text Box")
    await expect(page.getByRole('heading', { name: 'Text Box', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Text Box', level: 1 })).toHaveText("Text Box");
    await page.getByLabel('Full Name :').waitFor({ state: 'visible' });
    await page.getByLabel('Full Name :').fill("Neelkanata");
    await page.getByLabel('Email :').fill("test@gmail.com");
    await page.getByPlaceholder('Currend Address').fill("1234 Bothell WA 98012");
    await page.getByPlaceholder('Password').fill("test123");
    await page.getByRole('button', { name: 'Submit' }).click();


})


test('Test input box- error message', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByRole('link', { name: 'Text Box' }).click()

    await expect(page).toHaveTitle("Selenium Practice - Text Box")
    await expect(page.getByRole('heading', { name: 'Text Box', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Text Box', level: 1 })).toHaveText("Text Box");
    await page.getByLabel('Full Name :').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Submit' }).click();
    //await expect(page.getByLabel("This field is required.").first()).toBeAttached();
    //await expect(page.locator("#address-error")).toHaveText("This field is required.");
   //Approach 1
    const errors = page.locator("label.error");
    await expect(errors).toHaveCount(4);
    await expect(errors).toContainText(["This field is required."]);
     //Approach 2
    
    /* const errors = page.locator("label.error");
    const count = await errors.count();
    for (let i = 0; i < count; i++) {
        await expect(errors.nth(i)).toHaveText("This field is required.");
    } */

})

test('Radio Button', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByRole('link', { name: 'Radio Button' }).click();
    await expect(page.getByRole('heading', { name: 'Radio Button', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Radio Button', level: 1 })).toHaveText("Radio Button");
    //First Radio button
    await expect(page.locator('.form-check-input').first()).not.toBeChecked();
    await page.locator('.form-check-input').nth(0).check();
    await expect(page.locator('.form-check-input').first()).toBeChecked();
    await expect(page.locator('#check')).toHaveText("You have checked Yes")
      //Second Radio button
    await expect(page.locator('.form-check-input').nth(1)).not.toBeChecked();
    await page.locator('.form-check-input').nth(1).check();
    await expect(page.locator('.form-check-input').nth(1)).toBeChecked();
     await expect(page.locator('#check1')).toHaveText("You have checked Impressive")
     await expect(page.locator('#check')).not.toBeVisible();
    //Third Radio button
     await expect(page.locator('.form-check-input').nth(2)).toBeDisabled();
})