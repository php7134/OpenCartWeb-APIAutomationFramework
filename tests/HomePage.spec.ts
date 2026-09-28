import {test,expect} from '@playwright/test';   
import{LoginPage} from '../src/pages/LoginPage';
import{HomePage} from '../src/pages/HomePage';


let loginPage:LoginPage;
let homePage:HomePage;


test.beforeEach(async({page})=>
{
    loginPage=new LoginPage(page);
    //homePage=new HomePage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('daniel.miller@test.com','dan@123');
    homePage=new HomePage(page);

});

test.skip('home page title test', async ()=>{
   let pageTitle = await homePage.getHomePageTitle();
   console.log('Home page title:', pageTitle);
   expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ()=>{
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});

test.skip('home page headers exist test', async ()=>{
   let allHeaders = await homePage.getHomePageHeaders();
   console.log('Home page headers:', allHeaders);
   expect.soft(allHeaders).toHaveLength(4);
   expect.soft(allHeaders).toEqual
   (['My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});
