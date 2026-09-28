
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';
import { test, expect } from '../src/fixtures/pagefixtures';
import * as allure from "allure-js-commons";
import { meta, log, testData } from 'reporting-labs';
import { BasePage } from '../src/pages/BasePage';


test.beforeEach(async ({ loginPage, page, browser, request }) => {

  await loginPage.goToLoginPage();
});

test('login page title test', async ({ loginPage }) => {
  meta({ priority: 'P2', severity: 'minor', owner: 'php automation', story: 'US101', epic: 'ep007', feature: 'F30', issue: '09' })

  let pageTitle = await loginPage.getPageTitle();
  console.log('Login page title:', pageTitle);

  await log('Login page title:', pageTitle);
  expect(pageTitle).toBe('Account Login');

});

test('forgot password link exist test', async ({ loginPage }) => {

  meta({ priority: 'P2', severity: 'critical', owner: 'tony', story: 'US101', epic: 'ep007', feature: 'F31', issue: '09' })

  expect(await loginPage.isForgottenPwdLinkExists()).toBeTruthy();


});

test('user is able to login  to  application test', async ({ loginPage, homePage }) => {

  meta({ priority: 'P1', severity: 'blocker', owner: 'tom', story: 'US101', epic: 'ep007', feature: 'F31', issue: '09' })
  await testData({ username: ' process.env.USERNAME', password: 'process.env.PASSWORD' }, 'Login');


  await allure.suite("Login Tests");
  await allure.severity("critical");
  await allure.feature("Authentication");
  await allure.story("Valid Login");
  await allure.description("Verify user can login with valid credentials");


  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error('USERNAME and PASSWORD must be defined in the selected environment file.');
  }


  await allure.step("Login with valid creds", async () => {
    await loginPage.doLogin(username, password);

  });

  await allure.step("Verify logout link is visible", async () => {
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();

  });

  await allure.step("Verify home page title is visible", async () => {
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

  });

});


//DD_0: using test data from fixtures :sequence of test execution is important here, first the fixture will be executed and then the test method will be executed

test(`user should not be able to login to app with invalid credentials with fixture data test`, async ({ loginPage, testData }) => {
  for (let row of testData) {

    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  }
});





//DD_1: read csv data directly from csv file and loop the test method rowise
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCSVData) {

  test(`user should not be able to login to app with invalid credentials with csv data test - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
    meta({ priority: 'P2', severity: 'major', owner: 'vijay', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
    await testData(testCSVData, 'Invalid Login Data');


    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });

};

//DD_2: read xlsx data directly from the excel file and loop the test method row wise
let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'login');
for (let row of testExcelData) {
  test(`user should not be able to login to app with invalid credentials with excel data test - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

    meta({ priority: 'P2', severity: 'major', owner: 'vijay', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
    await testData(testExcelData, 'Invalid Login Data');


    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
};

//DD_3: read JOSN data directly from the JSON file and loop the test method row wise
let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
for (let row of testJSONData) {
  test(`user should not be able to login to app with invalid credentials with json data test - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

    meta({ priority: 'P2', severity: 'major', owner: 'vijay', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
    await testData(testJSONData, 'Invalid Login Data');

    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
};


//common features test:

test('App logo exists on Login Page', async({basePage})=>{
    expect (await basePage.isLogoVisible()).toBeTruthy();
});


test('Search Box exists on Login Page', async({basePage})=>{
    expect (await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart exists on Login Page', async({basePage})=>{
    expect (await basePage.isCartButtonVisible()).toBeTruthy();
});

test('Footers exists on Login Page', async({basePage})=>{
    expect (await basePage.getPageFootersCount()).toBe(16);
});




