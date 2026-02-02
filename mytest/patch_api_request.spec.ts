import { test, expect, request } from '@playwright/test';
import { ok } from 'assert';
import fs from 'fs';


// utility function returns json file data
function readJson(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

test('partial update booking(patch)', async ({ request }) => {

   // Create a booking(post) --BookingID
    const requestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/post_request_body.json");
    const createresponse= await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});
    //console.log(createresponse);
    console.log(await createresponse.json());
    expect(createresponse.ok()).toBeTruthy();

     const responseBody= await createresponse.json();
     const bookingid =responseBody.bookingid;
     console.log("Booking id =======>", bookingid)

   // partial update a booking(patch) //required token
     //token creation
    const tokenrequestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/token_request_body.json");
    const tokenresponse= await request.post('/auth', {data:tokenrequestBody});
    expect(tokenresponse.ok()).toBeTruthy();

    const tokenresponsebody = await tokenresponse.json();
    const token= tokenresponsebody.token;
    console.log(token);

    //Sending  partial update(patch)

    const patchrequestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/patch_request_body.json");
    const patchresponse= await request.patch(`/booking/${bookingid}`, 
                                {
                                headers:{"Cookie":`token=${token}`},
                                data:patchrequestBody
                                } 
                                       );
                                       
    expect(patchresponse.ok()).toBeTruthy();
    expect(patchresponse.status()).toBe(200);
    expect(patchresponse.statusText()).toBe("OK");
    const patchreponsebody= await patchresponse.json();
    console.log(patchreponsebody);
    console.log("Booking details updated successfully");


  
})

    


