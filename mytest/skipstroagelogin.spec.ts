import{test, expect} from '@playwright/test';

test('Skip login',async ({page})=>{


await page.goto("https://tutorialsninja.com/demo/index.php?route=account/account")


})