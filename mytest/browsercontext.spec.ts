import { test, expect } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';
import path from 'path';
import fs from 'fs';
test('login test', async () => {

  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  //BrowserContext1
  const BrowserContext1 = await browser.newContext();
  const page1 = await BrowserContext1.newPage();
  //Browser1 login
  await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  await page1.locator("#input-email").fill("pwtest@gmail.com");
  await page1.locator("#input-password").fill("playwright@77");
  //const screenshotDir = path.join(__dirname, '../screenshots');
  //await page1.screenshot({path: 'C:/Users/desai/Documents/PlaywrightDemoTS/screenshots/BrowserContext1Fullpage.png', fullPage: true})
  await page1.locator("input[value='Login']").click();
  await page1.screenshot({path: 'C:/Users/desai/Documents/PlaywrightDemoTS/screenshots/BrowserContext1Fullpage.png', fullPage: true})

 
  //BrowserContext2
  const BrowserContext2 = await browser.newContext();
  const page2 = await BrowserContext2.newPage();
  await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  await page2.locator("#input-email").fill("userpw@pw.com");
  await page2.locator("#input-password").fill("Test@123");
  await page2.locator("input[value='Login']").click();
  await page2.screenshot({path: 'C:/Users/desai/Documents/PlaywrightDemoTS/screenshots/BrowserContext2Fullpage.png', fullPage: true})
  
   // await page2.screenshot({
   // path: path.join('../screenshots', 'user2-login.png'),fullPage: true});
  
  await BrowserContext1.close();
  await BrowserContext2.close();
  browser.close();
  

})





