

// schema : type of response data
// ajv -- node lib for schema validation
//npm install ajv


import {test,expect} from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import fs from 'fs';

const TOKEN = process.env.API_TOKEN!;


let AUTH_HEADER={
    Authorization: `Bearer ${TOKEN}`
};

//setup the AJV:
let ajv = new Ajv();


//define JSON schema

// let userSchema=

//     {
//   "type": "object",
//   "properties": {
//     "id":{
//         "type":"number"
//     },
//     "name": {
//       "type": "string"
//     },
//     "status": {
//       "type": "string"
//     },
//     "gender": {
//       "type": "string"
//     },
//     "email": {
//       "type": "string"
//     }
//   },
//   "required": [
//     "id",
//     "name",
//     "status",
//     "gender",
//     "email"
//   ]
// };

let userArraySchema ={
    "type":"array",
    "items": JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8'))
}

test('@smoke get a user - schema test', async ({apiHelper})=>
    {
    
         //User JS Object:   
        let userData=
        {
            name:'PW API Automation User4',
            email:`pwautomation_${Date.now()}@gmail.com`,
            gender:'male',
            status:'active'
        }
    
    
        let response=await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
        expect((response).status).toBe(201);
        let userId= response.body.id;
        console.log('created user id:',userId);
        expect(userId).toBeDefined();


        //get a user:
        let getUserResponse=await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
                expect((getUserResponse).status).toBe(200);

        //verify the response schema:
        let validate=ajv.compile(JSON.parse(fs.readFileSync('src/schema/userschema.json', 'utf-8'))) ;
        let isSchemaValid=validate(getUserResponse.body);

        if(!isSchemaValid)
        {
            console.log("SCHEMA ERRORS:",validate.errors);
        }
        

        expect(isSchemaValid).toBeTruthy();
});

test('@smoke get all users - schema test', async ({apiHelper})=>
    {
        //get all users:
        let getUsersResponse=await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
                expect((getUsersResponse).status).toBe(200);

        //verify the response schema:
        let validate=ajv.compile(userArraySchema) ;
        let isSchemaValid=validate(getUsersResponse.body);

        if(!isSchemaValid)
        {
            console.log("SCHEMA ERRORS:",validate.errors);
        }
        expect(isSchemaValid).toBeTruthy();
});

