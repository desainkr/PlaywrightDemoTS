import { test, expect, chromium } from '@playwright/test';
import type { Page } from '@playwright/test'
import { log } from 'node:console';
import { text } from 'node:stream/consumers';

test('verify dropdown contains duplicate', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const colorsdropdown = page.locator("#animals>option");// not having duplicates
      //const colorsdropdown = page.locator("#colors>option"); //having duplicates
      const colordptext= (await colorsdropdown.allTextContents()).map(text => text.trim());
    
      const myset = new Set<string>(); //Set- duplicates not allowed
      const duplicates:string[] = [];  //array- duplicates allowed
for (const text of colordptext) {

     if(myset.has(text))
      {
              duplicates.push(text);
      }else
      {
               myset.add(text)
      }
  
    
}
       console.log("Duplicates options are  : ==> ", duplicates);
      //console.log("No duplicates  options found : ==> " + myset);
      if(duplicates.length>0)
      {
        console.log("Duplicate options found",duplicates );
        
      }else{
        console.log("No Duplicate options found");
      }
    
      
 expect(duplicates.length).toBe(0);
    
}
)