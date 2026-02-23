import { test, expect,Page } from "./fixturelogintest.js";


test('fixture login tets demo', async ({ loggedInPage }) => {
    await loggedInPage.waitForLoadState("load");
    await expect(loggedInPage).toHaveTitle('My Account');
     //const heading = LoginPage.locator('h2');

  // await expect(heading).toHaveText('My Account');
    await expect(loggedInPage.locator('h2').first()).toHaveText('My Account');

})

