import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('link', { name: 'Amazon Basics', exact: true }).click();
  await page.getByRole('button', { name: 'Featured' }).click();
  await page.getByRole('link', { name: 'Daily Wellness' }).click();
  await page.getByRole('link', { name: 'Amazon Basics Clarifying Pink Grapefruit Body Wash, 2% Salicylic Acid Acne Treatment, Dermatologist Tested, 8.5 Fluid Ounces, Pack of 1', exact: true }).click();
});