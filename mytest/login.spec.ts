import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 15 Pro Max'],
  headless: false,
});

test('login test @logintest', async ({ page }) => {
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  await page.locator('#input-email').fill('pwtest@gmail.com');
  await page.locator('#input-password').fill('playwright@77');
  await page.locator("input[value='Login']").click();

  await expect(page.locator('h2')).toHaveText('My Account');

  const title = await page.title();
  expect(title).toBe('My Account');

  await page.screenshot({ path: 'screenshots/Myaccountpage.png' });
  await page.screenshot({ path: 'screenshots/Fullpage.png', fullPage: true });

  const logo = page.locator("img[title='naveenopencart']");
  await logo.screenshot({ path: 'screenshots/Logo.png' });

  await page.locator('a:text("Logout")').click();
});
