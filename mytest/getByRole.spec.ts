import {test, expect} from '@playwright/test';
import { log } from 'node:console';
import {webkit,chromium,firefox} from 'playwright';

test('Locator test', async()=>{

          const browser = await chromium.launch({headless: false, channel:'chrome'});
          const page =await browser.newPage();
          await page.goto("https://practice.sdetunicorns.com/my-account/");
          // getByRole
          await page.getByRole('textbox',{name: 'Username or email address'}).fill("Test@123");
          await page.getByRole('button', {name:'Log in'}).click();

          await page.getByRole('heading', {name:'Register'}).isVisible();
          await page.getByRole('link',{name:'IFrame Sample'}).first().isVisible();

          //browser.close();









})





