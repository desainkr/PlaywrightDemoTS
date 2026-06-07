import { test, expect, devices } from '@playwright/test';



test.describe ('Data driven test with new data 13', () =>{

  const users=[{email:'pwtest@gmail.com',password:'playwright@77'},
               {email:'pwtest13@gmail.com',password:'playwright@777'}]

  for (const user of users){
    test(`login test for ${user.email}`, async ({ page }) => {
     

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
  await page.locator('#input-email').fill(user.email);
  await page.locator('#input-password').fill(user.password);
  await page.locator("input[value='Login']").click();
  await expect(page.locator('h2').first()).toBeVisible();
  await expect(page.locator('h2').first()).toHaveText('My Account');



 }) }

 
});