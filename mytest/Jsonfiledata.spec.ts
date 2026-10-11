import {test, expect} from '@playwright/test';
import data from '../testdata/Swaglabsdata.json' with {type:'json'};


test("Json data testing", async ({page})=>{

 await page.goto("https://www.saucedemo.com/");
 //const data = (await import('../testdata/Swaglabsdata.json', { with: { type: 'json' } })).default;
 await page.getByPlaceholder("Username").fill(data.Username);
 await page.getByPlaceholder("Password").fill(data.Password);
 await page.getByRole('button', {name:'Login'}).click();


})