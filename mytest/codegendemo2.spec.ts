import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('link', { name: 'Amazon Basics', exact: true }).click();
  await page.getByRole('link', { name: 'Best Sellers' }).click();
  await page.getByRole('link', { name: 'Registry' }).click();
  await page.getByRole('link', { name: 'Registry' }).click();
});