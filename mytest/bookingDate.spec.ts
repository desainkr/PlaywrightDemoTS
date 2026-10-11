import {test,expect} from '@playwright/test';


test('Dynamic Data picker',async ({page}) =>{

 await page.goto("https://www.booking.com/");

 // Wait up to 5 seconds for popup to appear
 const dialog= page.getByRole('dialog');

  try{
  await dialog.waitFor({state:'visible',timeout:5000})
  await page.keyboard.press('Escape');

  } catch{
     // Popup did not appear → continue
  }

 await page.getByTestId("searchbox-dates-container").click();


 //CheckinDate selection
 let checkInYear: string ="2026";
 let checkInMonth: string = "May";
 let checkInDay: string ="18";
while(true){
const currentMonthYear= await page.locator("[id*='bui-calendar-month']").nth(0).innerText();
const currentMonth= currentMonthYear.split(" ")[0];
const currentYear= currentMonthYear.split(" ")[1];
console.log(currentMonth);
console.log(currentYear);


if (currentMonth === checkInMonth && currentYear === checkInYear){
         break;
}else{
    await page.locator('button[aria-label="Next month"]').click();
}}

 //select specific check-in-date
 
 let allDates= await page.locator("[role='grid'] tbody").nth(0).locator('td').all();
   let checkInDateSelected = false;
 for (let date of allDates){
     const daytext= await date.innerText();
       if(daytext === checkInDay){
         await date.click();
        checkInDateSelected = true;
        break;

     }}


//CheckOut Date selection

 let checkOutYear: string ="2026";
 let checkOutMonth: string = "June";
 let checkOutDay: string = "19";


//Navigate to the required check-out month and year
 while(true){
const futurMonthYear= await page.locator("[id*='bui-calendar-month']").nth(1).innerText();
const futurMonth= futurMonthYear.split(" ")[0];
const futurYear= futurMonthYear.split(" ")[1];

if (futurMonth ===checkOutMonth  && futurYear === checkOutYear){
         break;
}else{
    await page.locator('button[aria-label="Next month"]').click();
}}

 //select specific check-out-date
 let allfutureDates= await page.locator("[role='grid'] tbody").nth(1).locator('td').all();
 let checkIoutDateSelected = false;

 for (let dt of allfutureDates){
     const dayouttext= await dt.innerText();
     if(dayouttext === checkOutDay){
        await dt.click();
        checkIoutDateSelected = true;
        break;

     }
}
 // Asseration to confirm check-out date was selected
 await page.waitForTimeout(5000);

});