
import {test,expect} from '../src/fixtures/pagefixtures';   
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginPage})=>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);

});

test('verify search', async ({homePage, searchResultsPage})=>{
   await homePage.doSearch('samsung');
   let resultCount=await searchResultsPage.getSearchResultsCount();
   console.log('Search results count:', resultCount);
   expect (resultCount).toBe(2);

});

//data provider:
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData)
{

test(`verify the search results count - ${row.searchkey} - ${row.productname}`, async ({homePage, searchResultsPage})=>{
    await homePage.doSearch(row.searchkey);
    let actresultCount=await searchResultsPage.getSearchResultsCount();
    console.log('Search results count:', actresultCount);
    expect (actresultCount).toBe(Number(row.resultcount));   
});
}


for(let row of productData)
{
test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({homePage, searchResultsPage, page})=>{

    //testInfo.setTimeout(60000);
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect (await page.title()).toBe(row.productname); 
    //await page.pause();
});
}


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
