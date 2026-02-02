import { test, expect } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';


test('auth test', async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  //BrowserContext
  const Context = await browser.newContext(
    { httpCredentials: { username: 'admin', password: 'admin' } }
  );
  const page = await Context.newPage();
  
  /*const username='admin';
  const password='admin';
  const authHeader='Basic' +btoa(username+':'+password);
  page.setExtraHTTPHeaders({Authorization : authHeader})*/

  /*
    Approach 1-Directly pass login along with the url
   
  await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
  //await page.waitForLoadState();
   await expect(page.locator("div[class='example']>p")).toBeVisible();
   await page.waitForLoadState(); */

  //Approach 2: directly pass login with url

  await page.goto("https://the-internet.herokuapp.com/basic_auth");
  await page.waitForLoadState();
  await expect(page.locator("div[class='example']>p")).toBeVisible();
  await page.waitForLoadState();


})