import { test, expect} from "@playwright/test";
import { log } from "console";
import path from 'path';
//import {Env} from '../utils/env.js';
  /*
     steps to work with .env files
  1.We have to install dotenv package - npm intsall dotenv
  2. create a .env file in your project
  3. inside the config file we can call the dotenv.config({path:"path of the .env"}) method to load 
     the environment variables from the .env file into process .env
  4.(optional step)create a env object to access the environment variables in a structured way
  5.Inport the ENV object in the test files where you want use environment variables 
  6.we can access the environment variables using ENV object like ENV.baseURL,ENV,username etc

  */
const { BASE_URL, EMAIL, PASSWORD } = process.env;

if (!BASE_URL || !EMAIL || !PASSWORD) {
    throw new Error('Required environment variables are missing');
}
test (`All env login test ${EMAIL}`, async ({ page }) => {
    console.log("URL is :", BASE_URL);
    console.log('username and password is:',EMAIL,':', PASSWORD);
    await page.goto(BASE_URL);
    await page.getByPlaceholder("E-Mail Address").fill(EMAIL);
    await page.getByPlaceholder("Password").fill(PASSWORD);
    await page.getByRole("button", { name: 'Login' }).click();
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'My Account' }).first()).toBeVisible({timeout: 5000});
    //await expect(page.locator("//h2[normalize-space()='My Account']")).toBeVisible({timeout: 3000});
})


test.skip(`env login test ${process.env.EMAIL}`, async ({ page }) => {
    console.log("URL is :", process.env.BASE_URL);
    console.log('username and password is:',process.env.EMAIL,':', process.env.PASSWORD);
    await page.goto(process.env.BASE_URL!);
    await page.getByPlaceholder("E-Mail Address").fill(process.env.EMAIL!);
    await page.getByPlaceholder("Password").fill(process.env.PASSWORD!);
    await page.getByRole("button", { name: 'Login' }).click();
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'My Account' }).first()).toBeVisible({timeout: 5000});
    //await expect(page.locator("//h2[normalize-space()='My Account']")).toBeVisible({timeout: 3000});
})
