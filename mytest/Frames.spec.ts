import {test,expect} from "@playwright/test";

test('Handling frames', async ({page})=>{

    await page.goto("https://testpages.eviltester.com/pages/embedded-pages/frames/");

    //Numeerof frames:    page.frames
const noofframes= page.frames();
const frame3= noofframes[4];
await expect(frame3.locator("h1")).toHaveText("Right")

/*
console.log(`No of frames present are : ${noofframes.length}`);

// Approach 1 Using name 

const frame1= page.frame({name:'left'});
 if(frame1)
 {
 await frame1.waitForSelector("h1",{state:'visible'});
 const text=frame1.locator("h1");
 await expect(text).toHaveText("Left")

 }else{
  console.log("The left named frame is not present on the page");
  
 }

// Interacting with URL

const frame2= page.frame({url:'/frame-includes/middle.html'});

noofframes.forEach(frame =>
{
 console.log(frame.url());
 
})

if(frame2)
 {
 await frame2.waitForSelector("h1",{state:'visible'});
 const text2=frame2.locator("h1");
 await expect(text2).toHaveText("Middle")

 }else{
  console.log("The middle named frame is not present on the page");
  
 }

*/

})

test.only('nested frames', async ({page})=>{

 await page.goto("https://play1.automationcamp.ir/frames.html");

const OuterFrame= page.frameLocator("#frame1"); 
const innerFrame= OuterFrame.frameLocator("#frame2"); 
await innerFrame.getByRole('button', { name: 'Click Me 2' }).click(); 
await expect(innerFrame.getByRole('button', { name: 'Clicked' })).toHaveText("Clicked"); 

const parent= page.frameLocator("#frame1"); 
const OuterFrame1= parent.frameLocator("#frame3"); 
const innerFrame1= OuterFrame1.frameLocator("#frame4"); 
await innerFrame1.getByRole('button', { name: 'Click Me 4' }).click(); 
await expect(innerFrame1.getByRole('button', { name: 'Clicked' })).toHaveText("Clicked"); 


 /*
 const OuterFrame= page.frameLocator("#frame1");
 const innerFrame= OuterFrame.frameLocator("#frame2");
 const clickbutton = innerFrame.locator("#Click Me 2");
 await clickbutton.click();
await expect(clickbutton).toHaveText('Clicked');
await expect(clickbutton).toContainText('Clicked');
*/
})