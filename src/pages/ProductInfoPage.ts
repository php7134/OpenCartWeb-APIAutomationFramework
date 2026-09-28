import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage
{
// private locators:
  private readonly header:Locator;
  private readonly productImages:Locator;
  private readonly productMetaData:Locator;
  private readonly productPricingData:Locator;
  private productInfoMap: Map<string,string|number>;

  


  //const... of the class ....init the locaotors:
  constructor(page:Page)
  {
    super(page);
    this.header=page.locator('#content').getByRole('heading', { level: 1 });
    this.productImages=page.locator('div#content li img');
    this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
    this.productPricingData=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
    this.productInfoMap=new Map<string,string|number>();
  }

  //page actions:
  async getProductHeader():Promise<string>{
    return await this.header.innerText();
  }

  async getProductImagesCount():Promise<number>{
    //await this.productImages.waitFor({state:'visible'});
    return await this.productImages.count();
  }

    async getProductInfo():Promise<Map<string,string|number>>{

    this.productInfoMap.set('productheader',await this.getProductHeader());
    this.productInfoMap.set('productImagesCount',await this.getProductImagesCount());
    await this.getProductMetaData();
    await this.getProductPriceData();
    return this.productInfoMap;
    
  }

  private async getProductMetaData():Promise<void>{
    let metaData=await this.productMetaData.allInnerTexts();
    for(let data of metaData)
    {
      let meta=data.split(':');
      let metaKey=meta[0].trim();
      let metaValue=meta[1].trim();
      this.productInfoMap.set(metaKey,metaValue);
    }
}

private async getProductPriceData():Promise<void>{
    let priceData=await this.productPricingData.allInnerTexts();
    let productPrice=priceData[0].trim();
    let exTaxPrice=priceData[1].split(':')[1].trim();
    this.productInfoMap.set('productPrice',productPrice);
    this.productInfoMap.set('exTaxPrice',exTaxPrice);
  }


} 
