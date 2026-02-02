import { test, type Page, expect, chromium, type Browser } from '@playwright/test';
import { describe } from 'node:test';
import type { Context } from 'node:vm';

/*
beforeAll-Run once before all tests-only once
After All-Runs once after all tests -Only once
beforeEach-Runs before each test
afterEach-Runs after each test
*/
let browser: Browser;
let context: Context;
let page: Page;

test.describe('Hooks', () => {

    test.beforeAll(async () => {
        console.log("lanuch the browser");
        browser = await chromium.launch({ headless: false });//launch the browser
        context = await browser.newContext(); //lunch the context 
        page = await context.newPage(); //Open the page
    })

    test.afterAll(async () => {
        console.log("close the  browser");
        await browser.close();

    })

    test.beforeEach(async () => {
        console.log("Launch the url");
        await page.goto("https://www.google.com/");
    })

    test.afterEach(async () => {
     console.log("Test Completed");

    })

   test('Test 1',async ()=>{

    await page.getByRole('combobox', { name: 'Search' }).fill("Playwright Automation");
    await page.keyboard.press('Enter');
    console.log("Test1 execution completed");

   })

  test('Test 2',async ()=>{

    await page.getByRole('combobox', { name: 'Search' }).fill("Selenium Automation");
    await page.keyboard.press('Enter');
    console.log("Test2 execution completed");

   })




})