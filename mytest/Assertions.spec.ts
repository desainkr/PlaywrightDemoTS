import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // Title Assert
    await expect(page).toHaveTitle("Swag Labs");
    // URL Assert
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    // Visible Assert
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    //Enabled Assert
    await expect(page.getByPlaceholder("Username")).toBeEnabled();
    await expect(page.getByPlaceholder("Password")).toBeEnabled();
    //ToHaveText Assert- exact text
    const headingText = page.getByRole('heading', { name: 'Accepted usernames are:', level: 4 });
    await expect(headingText).toHaveText("Accepted usernames are:");
    // tocontainText Assert -specific text
    const headdingText2 = page.getByRole('heading', { name: 'Password for all users:', level: 4 });
    await expect(headdingText2).toContainText("users:");
    //toHaveAttribute Assert
    const attributeValue= page.locator("#user-name");
    await expect(attributeValue).toHaveAttribute('placeholder','Username');
    
    //toHaveClass assert
    const className= page.getByPlaceholder("Username");
    await expect(className).toHaveClass('input_error form_input');





})