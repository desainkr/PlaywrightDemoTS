/*
prerequisites
install the required packages
 npm install --save-dev playwright ajv
 AJV is used for JSON schema validation
*/
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
  test.use({ colorScheme: 'light' });
test('validate json schema', async ({ request }) => {

    const getresponse = await request.get("https://mocktarget.apigee.net/json");
    const getresponsebody = await getresponse.json();
    console.log(getresponsebody);

    const schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": ["firstName", "lastName", "city", "state"]
    }

    const ajv = new Ajv();
    const validate = ajv.compile(schema);  //ajv.compile(schema) returns a validator function
    const isvalid = validate(getresponsebody); //validate(data) checks if the response macthes the schema
    expect(isvalid).toBeTruthy();
})