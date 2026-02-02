import { test, expect } from "@playwright/test";

test('map example', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    await page.getByPlaceholder('Search for products, brands and more').fill("laptop");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(4000)
    // Get product count
    const productcards = await page.locator(".k7wcnx");
    const count = await productcards.count()
    console.log("Total product count is : " + count)

    // Get product name and price

    const productMap = new Map<string, string>();

    for (let i = 0; i < count; i++) {
        const card = productcards.nth(i);
        const laptopname = card.locator(".RG5Slk");
        const laptopprice = card.locator(".hZ3P6w.DeU9vF");
        const laptopnameText = (await laptopname.textContent())?.trim().split(' ')[0];
        const laptoppriceText = (await laptopprice.textContent())?.trim();


        if (laptopnameText && laptoppriceText) {
            productMap.set(laptopnameText, laptoppriceText);

        }

        console.log('product Map is', productMap);
        const someProduct="DELL";
        if(productMap.has(someProduct))
        {

            console.log(`${someProduct} price is ${productMap.get(someProduct)}`);
            
        }
     for(const[product,price] of productMap)
     {
        console.log(`product ; ${product},price : ${price}`);
        
     }


    }



})

