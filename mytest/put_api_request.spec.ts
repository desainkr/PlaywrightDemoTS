import { test, expect, request } from '@playwright/test';
import { ok } from 'assert';
import fs from 'fs';


// utility function returns json file data
function readJson(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

test('update booking(put)', async ({ request }) => {

   // Create a booking(post) --BookingID
    const requestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/post_request_body.json");
    const createresponse= await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});
    //console.log(createresponse);
    console.log(await createresponse.json());
    expect(createresponse.ok()).toBeTruthy();

     const responseBody= await createresponse.json();
     const bookingid =responseBody.bookingid;
     console.log("Booking id =======>", bookingid)

   // update a booking(put) //required token
     //token creation
    const tokenrequestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/token_request_body.json");
    const tokenresponse= await request.post('/auth', {data:tokenrequestBody});
    expect(tokenresponse.ok()).toBeTruthy();

    const tokenresponsebody = await tokenresponse.json();
    const token= tokenresponsebody.token;
    console.log(token);

    //Sending update(put)

    const putrequestBody= readJson("C:/Users/desai/Documents/PlaywrightDemoTS/mytest/put_request_body.json");
    const putresponse= await request.put(`/booking/${bookingid}`, 
                                {
                                headers:{"Cookie":`token=${token}`},
                                data:putrequestBody
                                } 
                                       );
                                       
    expect(putresponse.ok()).toBeTruthy();
    expect(putresponse.status()).toBe(200);
    expect(putresponse.statusText()).toBe("OK");
    const putreponsebody= await putresponse.json();
    console.log(putrequestBody);
    console.log("Booking details updated successfully");


  
})

    


