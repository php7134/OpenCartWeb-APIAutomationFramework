# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.practice.spec.ts >> update a user PUT api test
- Location: tests/api/users.api.practice.spec.ts:57:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | import {test,expect, APIResponse} from "@playwright/test";
  2   | import { request } from "node:http";
  3   | 
  4   | let userId:number;
  5   | 
  6   | // Run tests in order, and skip the rest if one fails
  7   | test.describe.configure({ mode: 'serial' });
  8   | 
  9   | let AUTH_TOKEN =
  10  | {
  11  |     Authorization :'Bearer f90871bc3bbff4ccc1ad4a830cf64be4e5cab53365d3e1989d448319625fbbec'
  12  | };
  13  | 
  14  | test('get user api test', async ({request})=>{
  15  |     let response:APIResponse =await request.get('https://gorest.co.in/public/v2/users',{
  16  |         headers: AUTH_TOKEN
  17  |     });
  18  | 
  19  |     //console.log(response);
  20  |     let jsonBody = await response.json();
  21  |     console.log(jsonBody);
  22  |     console.log(response.status());
  23  |     console.log(response.statusText());
  24  | 
  25  |     expect(response.status()).toBe(200);
  26  | 
  27  | })
  28  | 
  29  | test('create a user POST api test', async ({request})=>
  30  |     {
  31  |     //User JS Object:
  32  | 
  33  |     let userData=
  34  |     {
  35  |         name:'PW API Automation User3',
  36  |         email:`pwautomation_${Date.now()}@open.com`,
  37  |         gender:'male',
  38  |         status:'active'
  39  |     }
  40  |     let response = await request.post('https://gorest.co.in/public/v2/users',
  41  |     {
  42  | 
  43  |         headers: AUTH_TOKEN,
  44  |         data: userData
  45  | 
  46  |     });
  47  | 
  48  |    let jsonBody = await  response.json();
  49  |    console.log(jsonBody);
  50  | 
  51  |    console.log(response.status());
  52  |    console.log(response.statusText());
  53  | 
  54  |     expect(response.status()).toBe(201);
  55  | });
  56  | 
  57  | test('update a user PUT api test', async ({request})=>
  58  |     {
  59  |     //User JS Object:
  60  | 
  61  |     let userData=
  62  |     {
  63  |         name:'PW API Automation3 User3',
  64  |         email:'pwapi777@automation.com',
  65  |         gender:'male',
  66  |         status:'active'
  67  |     }
  68  |     let response = await request.put('https://gorest.co.in/public/v2/users/${userId}',
  69  |     {
  70  | 
  71  |         headers: AUTH_TOKEN,
  72  |         data: userData
  73  | 
  74  |     });
  75  | 
  76  |    let jsonBody = await response.json();
  77  |    console.log(jsonBody);
  78  | 
  79  |    console.log(response.status());
  80  |    console.log(response.statusText());
  81  | 
> 82  |     expect(response.status()).toBe(200);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  83  | 
  84  | 
  85  | });
  86  | 
  87  | test('delete a user PUT api test', async ({request})=>
  88  |     {
  89  |    
  90  |     let response = await request.delete('https://gorest.co.in/public/v2/users/${userId}',
  91  |     {
  92  |         headers: AUTH_TOKEN
  93  |         
  94  |     });
  95  | 
  96  |    //let jsonBody = await  response.json();
  97  |    //console.log(jsonBody);
  98  | 
  99  |    console.log(response.status());
  100 |    console.log(response.statusText());
  101 | 
  102 |     expect(response.status()).toBe(204);
  103 | 
  104 | 
  105 | });
  106 | 
  107 | 
```