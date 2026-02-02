import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('laptop');
  await page.getByRole('button', { name: 'laptop', exact: true }).click();
});