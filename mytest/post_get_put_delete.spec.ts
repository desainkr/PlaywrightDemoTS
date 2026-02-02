import { test, expect } from '@playwright/test';
import { log } from 'console';
import fs from 'fs';


function jsonDataPass(filepath: string) {

    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

test('post-get-update-delte test', async ({ request }) => {
    // Create booking(Post)

    const postdata = jsonDataPass('C:/Users/desai/Documents/PlaywrightDemoTS/mytest/post_request_body.json');
    const postreponse = await request.post("/booking", { data: postdata });
    // asserts
    expect(postreponse.status()).toBe(200);
    expect(postreponse.statusText()).toBe("OK");
    expect(postreponse.ok()).toBeTruthy();
    // post reponse body
    const postreponsebody = await postreponse.json();
    console.log("Post reponse body data is :", postreponsebody);

    const bookingid = postreponsebody.bookingid;
    const firstname = postreponsebody.booking.firstname;
    console.log("bookingid is :", bookingid);
    console.log("firstname is :", firstname);

    //Get data based on Booking id

    const getreponse = await request.get(`/booking/${bookingid}`);
    expect(getreponse.status()).toBe(200);
    expect(getreponse.statusText()).toBe("OK");
    expect(getreponse.ok()).toBeTruthy();
    const getreponsebody = await getreponse.json();
    console.log("Get reponse body data is :", getreponsebody);

    // update Booking deatils with put menthod

    const tokendata = jsonDataPass('C:/Users/desai/Documents/PlaywrightDemoTS/mytest/token_request_body.json');
    const posttokendata = await request.post("/auth", { data: tokendata });
    const posttokendatabody = await posttokendata.json();
    //token retrived 
    const token = posttokendatabody.token;
    console.log("The token id  is : ", token);

    // update the booking ID 
    const updatedata = jsonDataPass('C:/Users/desai/Documents/PlaywrightDemoTS/mytest/put_request_body.json');
    const updateresponsedata = await request.put(`/booking/${bookingid}`,
        {
            headers: { 'Cookie': `token=${token}` },
            data: updatedata
        }
    );

    expect(updateresponsedata.status()).toBe(200);
    expect(updateresponsedata.statusText()).toBe("OK");
    expect(updateresponsedata.ok()).toBeTruthy();
    // update body
    const updatereponsebody = await updateresponsedata.json();
    console.log("The response put method is:", updatereponsebody);

    //partial update (patch) the booking id

     const patchdata = jsonDataPass('C:/Users/desai/Documents/PlaywrightDemoTS/mytest/patch_request_body.json');
    const patchresponsedata = await request.patch(`/booking/${bookingid}`,
        {
            headers: { 'Cookie': `token=${token}` },
            data: patchdata
        }
    );

    expect(patchresponsedata.status()).toBe(200);
    expect(patchresponsedata.statusText()).toBe("OK");
    expect(patchresponsedata.ok()).toBeTruthy();
    // update body
    const patchreponsebody = await patchresponsedata.json();
    console.log("The response patch method is:", patchreponsebody);

    // delete method 

    const deleteresponsedata = await request.delete(`/booking/${bookingid}`,
        {
            headers: { 'Cookie': `token=${token}` },
        }
    );

    expect(deleteresponsedata.status()).toBe(201);
    expect(deleteresponsedata.statusText()).toBe("Created");
    console.log("The booking ID deleted successfully")

})


