import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage
{
// private locators:
 private readonly searchResults:Locator;
  


  //const... of the class ....init the locaotors:
  constructor(page:Page)
  {
    super(page);
    this.searchResults=page.locator('div.product-layout');
    
  };

  //page actions:
  async getSearchResultsCount():Promise<number>
  {
    return await this.searchResults.count();
  }

  async selectProduct(productName:string):Promise<void>
  {
    console.log('product name: ', productName);
    let productLink=this.page.getByRole('link', { name: productName, exact: true }).first();
    await productLink.click();
  }
}