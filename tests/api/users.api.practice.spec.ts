import {test,expect, APIResponse} from "@playwright/test";
import { request } from "node:http";

let AUTH_TOKEN =
{
    Authorization :'Bearer f90871bc3bbff4ccc1ad4a830cf64be4e5cab53365d3e1989d448319625fbbec'
};

test('get user api test', async ({request})=>{
    let response:APIResponse =await request.get('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

})

test('create a user POST api test', async ({request})=>
    {
    //User JS Object:

    let userData=
    {
        name:'PW API Automation User3',
        email:`pwautomation_${Date.now()}@open.com`,
        gender:'male',
        status:'active'
    }
    let response = await request.post('https://gorest.co.in/public/v2/users',
    {

        headers: AUTH_TOKEN,
        data: userData

    });

   let jsonBody = await  response.json();
   console.log(jsonBody);

   console.log(response.status());
   console.log(response.statusText());

    expect(response.status()).toBe(201);
});

test('update a user PUT api test', async ({request})=>
    {
    //User JS Object:

    let userData=
    {
        name:'PW API Automation3 User3',
        email:'pwapi777@automation.com',
        gender:'male',
        status:'inactive'
    }
    let response = await request.put('https://gorest.co.in/public/v2/users/8618648',
    {

        headers: AUTH_TOKEN,
        data: userData

    });

   let jsonBody = await  response.json();
   console.log(jsonBody);

   console.log(response.status());
   console.log(response.statusText());

    expect(response.status()).toBe(200);


});

test('delete a user PUT api test', async ({request})=>
    {
   
    let response = await request.delete('https://gorest.co.in/public/v2/users/8618648',
    {
        headers: AUTH_TOKEN
        
    });

   //let jsonBody = await  response.json();
   //console.log(jsonBody);

   console.log(response.status());
   console.log(response.statusText());

    expect(response.status()).toBe(204);


});

