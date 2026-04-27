import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
   //toHaveValue Assertion 
    await page.getByLabel('Name:').fill("Neelkanata");
    await expect(page.getByLabel('Name:')).toHaveValue("Neelkanata");
    await page.getByLabel('Email:').fill("test@gmail.com");
    await expect(page.getByLabel('Email:')).toHaveValue("test@gmail.com");

    //toBechedked Assertion -Radio button
    await expect(page.locator("#gender")).toBeVisible();
    await page.locator("#gender").check();
    await expect(page.locator("#gender")).toBeChecked();

    //toBechedked Assertion -Checkbox
    await expect(page.locator("#hobbies")).toBeVisible();
    await page.locator("#hobbies").check();
    await expect(page.locator("#hobbies")).toBeChecked();
    await page.waitForTimeout(3000); 

    //Nagative Assertion
      
    await expect(page.getByLabel('Name:')).not.toHaveValue("Neelkanata111");
    await expect(page.getByLabel('Email:')).not.toHaveValue("test@gmail111.com");

    await expect(page.locator("#gender")).toBeVisible();
    await page.locator("#gender").check();
    await expect(page.locator("#gender")).not.toBeChecked();


    await expect(page.locator("#hobbies")).toBeVisible();
    await page.locator("#hobbies").check();
    await expect(page.locator("#hobbies")).not.toBeChecked();
    await page.waitForTimeout(3000);

    //Soft Assertions - will termanite 


     //await page.locator("#hobbies").check();

    await page.getByLabel('Name:').fill("Neelkanata");
    await expect.soft(page.getByLabel('Name:')).toHaveValue("Neelkanata");
    await page.getByLabel('Email:').fill("test@gmail.com");
    await expect.soft(page.getByLabel('Email:')).toHaveValue("test@gmail.com");






})