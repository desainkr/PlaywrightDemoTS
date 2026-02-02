import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { log } from 'console';

test('Comparring Methods', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");
    const products: Locator = page.locator(".product-title");
    //1) innerText() Vs textContent()
 /*   const count=await products.count();
    console.log(await products.nth(1).innerText());  //14.1-inch Laptop
    console.log(await products.nth(1).textContent());  //            14.1-inch Laptop
for (let i = 0; i <count ; i++) {
   // const productname:string = await products.nth(i).innerText();//Extracts plan text,eliminates whitespace and line breaks
  //  console.log(productname);
  const productname:string | null = await products.nth(i).textContent()
  //Extracts text including hidden elements. include extra whitespaces,line breaks whitespace and line breaks etc
  //console.log(productname?.trim());
} 
 //2) innerText() Vs textContent()
const productnames:string [] =await products.allTextContents();
console.log("products names captured by allTextContents() :", productnames);

const productnamestrimmed:string []= (await products.allTextContents()).map(text=>text.trim());
console.log("products names after trimmed by allTextContents() :", productnamestrimmed);
*/
// 3.all- convert locator -Locator[] returns array of locators 
   const productslocators:Locator[] =await products.all();
 //console.log(await productslocators[1]?.innerText());

 //For of loop
 /*for (let productloc of productslocators) {
   
    console.log(await productloc.innerText());
     
 } */
// for in loop

  for (let i in productslocators) {
   
    //console.log(await productslocators[i].innerText());
     
 }

})