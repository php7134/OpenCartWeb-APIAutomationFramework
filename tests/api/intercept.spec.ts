 import {test,expect} from "@playwright/test";

 //web app  ---> intercept the network calls and log them.

 test('intercept and log request',async({page})=>{

    await page.route('**/*',async(route) =>{
        console.log(route.request().method(),route.request().url());
        await route.continue(); //url1 --capture, url2 --capture...
    });

    //naviagte to web app:
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

 });


 test('mock search with fake JSON ',async({page})=>{
    //JS
    let fakeproducts = [
        {name:'Fake Macbook pro', price:'$599'},
        {name:'Fake Iphone 18', price:'$5999'},
    ];

    
    await page.route('**/index.php?route=product/search&search=macbook', async (route) =>{
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body: JSON.stringify(fakeproducts)

    });
});

    //naviagte to web app:
    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');

    await page.pause();


 });


 

