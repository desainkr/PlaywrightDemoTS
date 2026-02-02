import {test, expect} from '@playwright/test';
import { log } from 'node:console';
import {webkit,chromium,firefox} from 'playwright';

test('Locator test', async()=>{

          const browser = await chromium.launch({headless: false, channel:'chrome'});
          const page =await browser.newPage();
          await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
          //Create a web Element(locator) + perform action in it

          //Locator ID

           await page.locator("#input-password").fill("Testing@123");
           //await page.locator("#input-confirm").fill("Testing@123");
           const value= await page.locator("#input-password").inputValue();
            if (value !== ""){
              console.log("Input alreaddy as a value");
              
            }
            await page.waitForTimeout(2000);
            await expect(page.locator("#input-password")).toHaveValue("Testing@123");

            await page.frameLocator









})





