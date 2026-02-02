/*
Test: create booking
Request type: Post
request body: static

*/
import { test, expect, request } from '@playwright/test';
import { log } from 'node:console';
import fs from 'fs';
import { isUtf8 } from 'node:buffer';
import requestBody from '../mytest/post_request_body.json'with { type: 'json' };

test('create post request using Json body', async ({ request }) => {
   // read data from json(request body)

  // const jsonfile="C:/Users/desai/Documents/PlaywrightDemoTS/mytest/post_request_body.json";
   //const requestBody= JSON.parse(fs.readFileSync(jsonfile,'utf-8'));
    

    //send post request 
    const response = await request.post("https://restful-booker.herokuapp.com/booking",
        { data: requestBody });
    const responsebody = await response.json();  //Extracted response
    console.log(responsebody);

    //validate status 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    //validate response body attributes 
    expect(responsebody).toHaveProperty("bookingid");
    expect(responsebody).toHaveProperty("booking");
    expect(responsebody).toHaveProperty("booking.additionalneeds");

    //Validate booking details 
    const booking=responsebody.booking;


    expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice:requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds
  });
  //Booking dates cls
expect(booking.bookingdates).toMatchObject
({checkin: requestBody.bookingdates.checkin, 
  checkout: requestBody.bookingdates.checkout
 });

})