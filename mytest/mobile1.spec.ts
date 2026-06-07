import { test, devices,expect,Locator,Page } from '@playwright/test';

test('Mobile UI test without geolocation Demo2', async ({ browser }) => {
  const context = await browser.newContext({
    ...devices['iPhone 15 Pro Max']
  });

  const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('textbox', { name: 'Username' }).fill("standard_user");
    await page.getByRole('textbox', { name: 'Password' }).fill("secret_sauce");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();


})


export class loginPage{
   private readonly page: Page;
   //locators
   private readonly usename: Locator;
   private readonly password: Locator;
   private readonly login: Locator;
constructor(page:Page)
{
   this.page= page;
   this.usename= page.locator("");
   this.password= page.locator("");
   this.login= page.locator("");

}

  async loginPage(usename:string,password: string)
 {
      await this.usename.fill(usename);
      await this.password.fill(password);
      await this.login.click();

 }










}