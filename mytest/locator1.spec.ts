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
           await page.locator("#input-confirm").fill("Testing@123");

           //Locator Class
           await page.locator(".img-responsive").isVisible();
           await page.locator("[class='form-control input-lg']").fill("Mac");
          
           //Locator Text
              console.log(await page.locator("text=Register Account").isVisible());
              console.log(await page.locator('text=Continue').isEnabled());
              
              //Locator CSS
              await page.locator("input[placeholder='First Name']").fill("Neel");
              await page.locator("input[placeholder='Last Name']").fill("Desai");
              await page.locator("[type='email']").fill("Desai@gmail.com");
              await page.locator("[name='telephone']").fill("1234567890");

              //Xpath 

              await page.locator("(//input[@type='radio'])[2]").click();
              await page.locator("//button[@type='button' and @class='btn btn-default btn-lg']").click();
          
            await page.waitForTimeout(10000);
          //browser.close();









})





