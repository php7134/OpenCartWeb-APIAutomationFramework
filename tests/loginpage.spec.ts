import {test,expect} from '@playwright/test';   
import{LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page})=>{

  loginPage=new LoginPage(page);
  await loginPage.goToLoginPage();
  homePage=new HomePage(page);
})

test.skip('login page title test', async ()=>{

  let pageTitle=await loginPage.getLoginPageTitle();
  console.log('Login page title:',pageTitle);
  expect(pageTitle).toBe('Account Login');

});

test.skip('forgot password link exist test', async ()=>{

  expect (await loginPage.isForgottenPwdLinkExists()).toBeTruthy();


});

test.skip('user is able to login  to  application test', async ()=>{
  await loginPage.doLogin('daniel.miller@test.com','dan@123');
  expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
  expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

