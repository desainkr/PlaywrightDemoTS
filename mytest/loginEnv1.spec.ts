import {test, expect} from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '..', '.envtest')
});

//dotenv.config({path:`.envtest`}) //working this way as well

const baseURL = process.env.baseURL!;
const Username = process.env.uname!;
const Password = process.env.pwd!;

//The ! tells TypeScript:“Trust me, this variable will exist.”This is the most common approach in automation frameworks.
//console.log(process.env);
//console.log("FULL ENV:", process.env);
test('envLogin HRM webtest',async ({page})=>{
console.log("URL is :", baseURL);
console.log('username and password is:',Username,':', Password);
await page.goto(baseURL,{waitUntil: 'domcontentloaded'});
await page.getByPlaceholder("Username").fill(Username);
await page.getByPlaceholder("Password").fill(Password);
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByRole('heading', { name: 'Dashboard',level:6 })).toBeVisible();


})
