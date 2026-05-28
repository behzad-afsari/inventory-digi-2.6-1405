import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import excelHandler from "./modules/module-json-xlsx.js";

const holooExcel = excelHandler.readXLSX(path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),"Sheet1");
// console.log(holooExcel[1]);
const excelBuyPrice = excelHandler.readXLSX(path.join(__dirname, "../data/buy-price"),"Sheet1");
// console.log('88888888888',excelBuyPrice[0]);
// const excelBuyPrice = excelHandler.readXLSX('./',"Sheet1");

class BuyPrice {
  constructor() {
    // excelBuyPrice : excelHandler.readXLSX(path.join(__dirname,'../data/buy-price'),'Sheet1')
  }
  static allProducts() {
    return excelBuyPrice;
  }
  static getBuyPriceByDKPC(dkpc) {
    const result = excelBuyPrice.find((item) => item.dkpc == dkpc);
    return result ? result["قیمت خرید"] : 1;
    return result;
  }

  static updateBuyPrice_old(allProducts, dkpc, price) {
    // console.log('holoo >>',holoo);
    if (BuyPrice.getBuyPriceByDKPC(dkpc)) {
      const holoo = BuyPrice.getBuyPriceByDKPC(dkpc).holoo;
      allProducts.forEach((item) => {
        if (item.holoo == holoo) {
          console.log(item);
          const oldPrice = item["قیمت خرید"];
          item["قیمت خرید"] = price;
          const newPrice = item["قیمت خرید"];
          console.log("old price >>", oldPrice, "new price >>", newPrice);
        }
      });
      return allProducts;
    } else {
      allProducts.push({ dkpc: dkpc, "قیمت خرید": price });
      // console.log("DKPC: ", dkpc, " NOT Found");
      return allProducts;
    }
  }
  static saveExcelBuyPrice(data) {
    excelHandler.writeXLSX(path.join(__dirname, "../data/buy-price"), data);
    console.log("FILE { buy-price.excel } Updated!");
  }

  //////////////////////////////////////

  static updateBuyPrice(allProducts, dkpc, price,name) {
    const productFinded = allProducts.find((item) => item.dkpc == dkpc);
    if (productFinded) {
      const holoo = productFinded.holoo;
      allProducts.forEach((item) => {
        item.holoo === holoo ? (item["قیمت خرید"] = price) : "";
      });
    } else {
      let newProduct = {}
      const productInHoloo = holooExcel.find(item => String(item['مشخصات فني 1']).includes(String(dkpc)))
      // console.log(productInHoloo);
      if(productInHoloo){
        newProduct = { dkpc: dkpc, "قیمت خرید": price,"نام کالا": name ,holoo: productInHoloo['كد كالا']}
        allProducts.push(newProduct);
        // allProducts.push({ dkpc: dkpc, "قیمت خرید": price,"نام کالا": name ,holoo: productInHoloo['كد كالا']});
      }else{
        newProduct = { dkpc: dkpc, "قیمت خرید": price,"نام کالا": name}
        allProducts.push(newProduct);
        // allProducts.push({ dkpc: dkpc, "قیمت خرید": price,"نام کالا": name});
      }
      console.log(newProduct);
    }
    return allProducts
  }
}

// console.log(BuyPrice.updateBuyPrice(excelBuyPrice,10000002,1000));
// const test = BuyPrice.updateBuyPrice(excelBuyPrice,222222,1000,'محصول تست')

// BuyPrice.saveExcelBuyPrice(test)
// console.clear();
// console.log('****',BuyPrice.getBuyPriceByDKPC(30832115));

// console.log(">>", BuyPrice.getBuyPriceByDKPC(30832185));
// BuyPrice.updateBuyPrice(,30832185,1000)
// console.log(123 == '0123');

export default BuyPrice;
