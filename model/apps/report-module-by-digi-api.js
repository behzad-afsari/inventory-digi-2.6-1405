import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";

import products_2 from './generate-product-DB-from-holoolist-2.js'
// console.log('+++',products_2[14])
import buyPrice from './buy-price.js'
const MIN_BENEFIT = process.env.MIN_BENEFIT
// console.log(MIN_BENEFIT);

let sale,buy,back_of_sale,back_of_buy,offline_sale,broken,digiExcel,digiAPI,discription
// let sale = behzad.readJson(path.join(__dirname, "../data/stock/sale.json"));
// let buy = behzad.readJson(path.join(__dirname, "../data/stock/buy.json"));
// let back_of_sale = behzad.readJson(path.join(__dirname, "../data/stock/back_of_sale.json"));
// let back_of_buy = behzad.readJson(path.join(__dirname, "../data/stock/back_of_buy.json"));
// let offline_sale = behzad.readJson(path.join(__dirname, "../data/stock/offline_sale.json"));
// let broken = behzad.readJson(path.join(__dirname, "../data/stock/broken.json"));
// let digiExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-digi/list-from-digi"),"داده ها");
// let digiAPI = behzad.readJson(path.join(__dirname, "../data/list-products-from-digi-api/product-list.json"));
// let discription  = behzad.readXLSX(path.join(__dirname,'../data/descriptions'),'Sheet1')



// const buyPrices  = behzad.readXLSX(path.join(__dirname,'../data/buy-price'),'Sheet1')


async function updateData(){
   console.log('data updating...');
    sale = await behzad.readJson(path.join(__dirname, "../data/stock/sale.json"));
    buy = await behzad.readJson(path.join(__dirname, "../data/stock/buy.json"));
    back_of_sale = await behzad.readJson(path.join(__dirname, "../data/stock/back_of_sale.json"));
    back_of_buy = await behzad.readJson(path.join(__dirname, "../data/stock/back_of_buy.json"));
    offline_sale = await behzad.readJson(path.join(__dirname, "../data/stock/offline_sale.json"));
    broken = await behzad.readJson(path.join(__dirname, "../data/stock/broken.json"));
   //  digiExcel = await behzad.readXLSX(path.join(__dirname, "../data/list-products-from-digi/list-from-digi"),"داده ها");
    digiAPI = await behzad.readJson(path.join(__dirname, "../data/list-products-from-digi-api/product-list.json"));
    digiAPI.reverse()
    discription  = await behzad.readXLSX(path.join(__dirname,'../data/descriptions'),'Sheet1')
   console.log('data updated !');
}

updateData()

// const products = behzad.readJson(path.join(__dirname, "../data/stock/products-DB.json"));
// console.log('digi -->',digiExcel[0]);

const holooExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),"Sheet1");
// console.log('holoo -->',holooExcel[0])

let aaa = 0;
var iii = 0;

class Report {
   static productByDKPC(DKPCForReport) {
      let countSale = 0;
      sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countSale += item.count)
               : (countSale += 0);
         });
      });

      let countBuy = 0;
      buy.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBuy += item.count)
               : (countBuy += 0);
         });
      });

      let countBackOfSale = 0;
      back_of_sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBackOfSale += item.count)
               : (countBackOfSale += 0);
         });
      });

      let countBackOfBuy = 0;
      back_of_buy.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBackOfBuy += item.count)
               : (countBackOfBuy += 0);
         });
      });

      let countOfflineSale = 0;
      offline_sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countOfflineSale += item.count)
               : (countOfflineSale += 0);
         });
      });

      let countBroken = 0;
      broken.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBroken += item.count)
               : (countBroken += 0);
         });
      });

      let stockDigiSite = 0;
      digiExcel.map((item) => {
         // console.log(typeof item['کد تنوع']);
         if (parseInt(item["کد تنوع"]) === parseInt(DKPCForReport)) {
            stockDigiSite = item["موجودی نزد فروشنده"];
            // console.log(parseInt(item['کد تنوع']));
            // console.log(iii++)
         }
      });

      let buyPrice = 0
      products_2.map((holooItem) => {
        if (holooItem.dkpc===DKPCForReport) {
      //   if (holooItem["مشخصات فني 1"].includes(DKPCForReport)) {
          // console.log(aaa++, ">>", holooItem["مشخصات فني 1"],holooItem['آخرين في خريد']);
          // PRDCT.buyPrice = holooItem['آخرين في خريد']
          buyPrice = holooItem['آخرين في خريد']
        }
      });
      // let salePrice = 0
      // digiExcel.map((item) => {
      //    if (parseInt(item["کد تنوع"]) === parseInt(DKPCForReport)) {
      //       salePrice = item["(ریال)قیمت فروش"];j
      //    }
      // });

      const productInDigi = {}
      digiExcel.map((item) => {
         if (parseInt(item["کد تنوع"]) === parseInt(DKPCForReport)) {
            productInDigi.salePrice = item["(ریال)قیمت فروش"];
            productInDigi.active = item["فعال"];
            productInDigi.marjae = item["قیمت مرجع"];
            productInDigi.organizationSale = item["فعال در فروش سازمانی"];
         }
      });

      // const buyBox = Report.buyBox(DKPCForReport).item.extra.buy_box.buy_box_price
      // console.log(buyBox);


      const PRDCT = {};
      PRDCT.buy = countBuy;
      PRDCT.sale = countSale;
      PRDCT.backOfSale = countBackOfSale;
      PRDCT.backOfBuy = countBackOfBuy;
      PRDCT.offlineSale = countOfflineSale;
      PRDCT.broken = countBroken;
      
      // PRDCT.stockDigiSite = stockDigiSite;
      // PRDCT.salePrice = productInDigi.salePrice
      // PRDCT.active = productInDigi.active
      // PRDCT.marjae = productInDigi.marjae
      // PRDCT.organizationSale = productInDigi.organizationSale


      // console.log(DKPCForReport,'>',PRDCT);

      return PRDCT;
   }

   static transactionsByDKPC(DKPCForReport) {
      // updateData()
      let countSale = 0;
      sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countSale += item.count)
               : (countSale += 0);
         });
      });

      let countBuy = 0;
      buy.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBuy += item.count)
               : (countBuy += 0);
         });
      });

      let countBackOfSale = 0;
      back_of_sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBackOfSale += item.count)
               : (countBackOfSale += 0);
         });
      });

      let countBackOfBuy = 0;
      back_of_buy.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBackOfBuy += item.count)
               : (countBackOfBuy += 0);
         });
      });

      let countOfflineSale = 0;
      offline_sale.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countOfflineSale += item.count)
               : (countOfflineSale += 0);
         });
      });

      let countBroken = 0;
      broken.map((invoices) => {
         invoices.invoice.map((item) => {
            parseInt(item.dkpc) === parseInt(DKPCForReport)
               ? (countBroken += item.count)
               : (countBroken += 0);
         });
      });


      let buyPrice = 0
      products_2.map((holooItem) => {
        if (holooItem.dkpc===DKPCForReport) {
          buyPrice = holooItem['آخرين في خريد']
        }
      });

      const PRDCT = {};
      PRDCT.buy = countBuy;
      PRDCT.sale = countSale;
      PRDCT.backOfSale = countBackOfSale;
      PRDCT.backOfBuy = countBackOfBuy;
      PRDCT.offlineSale = countOfflineSale;
      PRDCT.broken = countBroken;
      // console.log(DKPCForReport,'===>>',PRDCT);
      return PRDCT;
   }
   static productFromHolooByDKPC(DKPC){
      const found = holooExcel.find(item=>{
         return item['مشخصات فني 1'].includes(DKPC.toString())
      })
      // console.log(found);
      return found
   }

   static lastBuyPrice(DKPC){
      let lastBuyPrice = 0
      buy.map((faktor) => {
         faktor.invoice.map(item=>{
            if (parseInt(item.dkpc) === parseInt(DKPC)) {
               lastBuyPrice = item.price
               // console.log(DKPC,item.dkpc,lastBuyPrice);
            }
         })
      });
      return lastBuyPrice
   }


   //_____get Description from excel Digi_____________
   static getAllProducts_FROM_EXCEL_DIGI() {
      updateData()
      const DATA = [];
      let countAllProducts = 0
      let countHolooProducts = 0
      // products_2.map((item) => {
      // products.map((item) => {
      digiExcel.map((item) => {
         const newItem = {};
         countAllProducts++
         // const x = Report.productByDKPC(item['کد تنوع']);
         const x = Report.transactionsByDKPC(item['کد تنوع']);
         const itemInHoloo= Report.productFromHolooByDKPC(item['کد تنوع'])
         // const itemInHoloo = holooExcel.find(holooPRDCT=>{
         //    return holooPRDCT['مشخصات فني 1'].includes(item['کد تنوع']) 
         // })
         if (itemInHoloo != null){
            countHolooProducts++
            newItem.productName = itemInHoloo['نام كالا'];
            newItem.holoo = itemInHoloo['كد كالا'];
            newItem.mainGroupe = itemInHoloo["گروه اصلي"];
            newItem.subGroupe = itemInHoloo["گروه فرعي"];
         }

         
         // newItem.avgBuyPrice = item["ميانگين خريد"];
         // newItem.lastBuyPrice = item["آخرين في خريد"];
         // newItem.holooStock = itemFromHoloo['موجودی'];
         newItem.productName = item['عنوان تنوع کالا'].split('|')[0];
         newItem.dkp = item['کد محصول'];
         newItem.dkpc = item['کد تنوع'];
         // newItem.firstCount = 0;
         newItem.salePrice = item['(ریال)قیمت فروش'];
         newItem.sumBuy = x.buy;
         newItem.sumsale = x.sale;
         newItem.sumBackOfSale = x.backOfSale;
         newItem.sumBackBuy = x.backOfBuy;
         newItem.sumOfflineSale = x.offlineSale;
         newItem.broken = x.broken;
         newItem.stockDigiSite = item['موجودی نزد فروشنده'];
         newItem.active = item['فعال'];
         newItem.marjae = item['قیمت مرجع'];
         newItem.organizationSale = item['فعال در فروش سازمانی'];
         // newItem.lastBuyPrice = Report.lastBuyPrice(item['کد تنوع'])  // آخرین قیمت خرید
         newItem.lastBuyPrice = buyPrice.getBuyPriceByDKPC(newItem.dkpc)
         // console.log(buyPrice.getBuyPriceByDKPC(newItem.dkpc));
         // newItem.stock =newItem.firstCount +newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.stock =newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
         // newItem.description = Report.getDes(item['کد تنوع']) ? 'description' : "";
         newItem.describe = Report.getDes(item['کد تنوع']) ? newItem.description = Report.getDes(item['کد تنوع']).describe : ''

         newItem.isBuyBox = Report.buyBox(item['کد تنوع']).extra.buy_box.is_buy_box_winner  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
         newItem.buyBox = Report.buyBox(item['کد تنوع']).extra.buy_box.buy_box_price  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
         // item['کد تنوع']== 47165610 ? console.log(Report.getDes(item['کد تنوع'])) : ''

         DATA.push(newItem);
         // console.log(newItem);
      });
      // console.log(DATA[20]);
      // console.log(DATA);
      return DATA;
   }





//_____get Description from API Digi_____________
   static getAllProducts() {
      // console.log('---------',digiAPI[0]);
      // console.log(digiAPI[0].product.title);
      // console.log(digiAPI[0].id);
      // console.log(digiAPI[0].product.id);
      updateData()
      const DATA = [];
      let countAllProducts = 0
      let countHolooProducts = 0
      digiAPI.map((item) => {
         const newItem = {};
         countAllProducts++
         const x = Report.transactionsByDKPC(item.id);
         const itemInHoloo= Report.productFromHolooByDKPC(item.id)
         if (itemInHoloo != null){
            countHolooProducts++
            newItem.productName = itemInHoloo['نام كالا'];
            newItem.holoo = itemInHoloo['كد كالا'];
            newItem.mainGroupe = itemInHoloo["گروه اصلي"];
            newItem.subGroupe = itemInHoloo["گروه فرعي"];
            newItem.lastBuyPrice = itemInHoloo["آخرين في خريد"];
         }
         // newItem.avgBuyPrice = item["ميانگين خريد"];
         // newItem.lastBuyPrice = item["آخرين في خريد"];
         // newItem.holooStock = itemFromHoloo['موجودی'];
         newItem.productName = item.product.title //['عنوان تنوع کالا'].split('|')[0];
         newItem.dkp = item.product.id  //['کد محصول'];
         newItem.dkpc = item.id  //['کد تنوع'];
         // newItem.firstCount = 0;

         // console.log('dkpc:',item.id);
         
         newItem.salePrice = item.price!=null && item.price.selling_price ? item.price.selling_price : 1;  //['(ریال)قیمت فروش'];
         newItem.sumBuy = x.buy;
         newItem.sumsale = x.sale;
         newItem.sumBackOfSale = x.backOfSale;
         newItem.sumBackBuy = x.backOfBuy;
         newItem.sumOfflineSale = x.offlineSale;
         newItem.broken = x.broken;
         newItem.stockDigiSite = item.stock.seller_stock  //['موجودی نزد فروشنده'];
         newItem.active = item.is_active  //['فعال'];
         // newItem.marjae = item.price.reference_price   //['قیمت مرجع'];
         newItem.marjae = item.price && item.price.reference_price ? item.price.reference_price : 1; //['قیمت مرجع'];
         newItem.organizationSale = item.extra.b2b_params.is_b2b_active    //['فعال در فروش سازمانی'];
         newItem.fulfilment_and_delivery_cost = item.fulfilment_and_delivery_cost
         
         // newItem.lastBuyPrice = Report.lastBuyPrice(item['کد تنوع'])  // آخرین قیمت خرید
         // newItem.lastBuyPrice = parseInt(buyPrice.getBuyPriceByDKPC(newItem.dkpc))
         // newItem.lastBuyPrice = parseInt(buyPrice.getBuyPriceByDKPC(newItem.dkpc))
         // newItem.totalCost = parseInt(newItem.lastBuyPrice + item.fulfilment_and_delivery_cost + (newItem.salePrice*10)/100)--------------------
         newItem.totalCost = parseInt(newItem.lastBuyPrice + item.fulfilment_and_delivery_cost + ((item.fulfilment_and_delivery_cost)*10)/100) + ((newItem.salePrice*10)/100)
         // newItem.benefit = parseInt(item.price.selling_price - newItem.totalCost)
         newItem.benefit = parseInt(newItem.salePrice - newItem.totalCost)
         newItem.benefitPercent = parseInt((newItem.benefit*100)/newItem.salePrice)
         // newItem.minSalePrice = newItem.totalCost+((parseInt(newItem.lastBuyPrice + item.fulfilment_and_delivery_cost + (newItem.salePrice*10)/100))*10)/100
         newItem.minSalePrice = newItem.totalCost+(newItem.totalCost*MIN_BENEFIT)/100
         // console.log(buyPrice.getBuyPriceByDKPC(newItem.dkpc));
         // newItem.stock =newItem.firstCount +newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.stock =newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
         
         newItem.describe = Report.getDes(item.id) ? newItem.description = Report.getDes(item.id).describe : ''

         // newItem.isBuyBox = Report.buyBox(item['کد تنوع']).extra.buy_box.is_buy_box_winner  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
         newItem.isBuyBox = item.extra.buy_box.is_buy_box_winner  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
         newItem.buyBox = item.extra.buy_box.buy_box_price  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
         newItem.selling_stock = item.stock.selling_stock // موجودی قابل فروش
         newItem.is_in_buy_box_challenge = item.extra.buy_box.is_in_buy_box_challenge // کاهش هوشمند قیمت
         DATA.push(newItem);
         // console.log(newItem);
      });
      // console.log(DATA[20]);
      // console.log(DATA);
      return DATA;
   }


//_____get Description_____________
static getDes(dkpc){
   const found = discription.find( res => {
      // console.log('**',res);
      return res.dkpc.toString().trim() == dkpc.toString().trim()
   })
   return found
}
//_____all product not active_____________
static getAllProductsNotActive() {
   updateData()
      const DATA = [];
      let countAllProducts = 0
      let countHolooProducts = 0
      digiAPI.map((item) => {
         if(!item.is_active){
            const newItem = {};
            countAllProducts++
            const x = Report.transactionsByDKPC(item.id);
            const itemInHoloo= Report.productFromHolooByDKPC(item.id)
            if (itemInHoloo != null){
               countHolooProducts++
               newItem.productName = itemInHoloo['نام كالا'];
               newItem.holoo = itemInHoloo['كد كالا'];
               newItem.mainGroupe = itemInHoloo["گروه اصلي"];
               newItem.subGroupe = itemInHoloo["گروه فرعي"];
            }
            // newItem.avgBuyPrice = item["ميانگين خريد"];
            // newItem.lastBuyPrice = item["آخرين في خريد"];
            // newItem.holooStock = itemFromHoloo['موجودی'];
            newItem.productName = item.product.title //['عنوان تنوع کالا'].split('|')[0];
            newItem.dkp = item.product.id  //['کد محصول'];
            newItem.dkpc = item.id  //['کد تنوع'];
            // newItem.firstCount = 0;
            newItem.salePrice = item.price.selling_price  //['(ریال)قیمت فروش'];
            newItem.sumBuy = x.buy;
            newItem.sumsale = x.sale;
            newItem.sumBackOfSale = x.backOfSale;
            newItem.sumBackBuy = x.backOfBuy;
            newItem.sumOfflineSale = x.offlineSale;
            newItem.broken = x.broken;
            newItem.stockDigiSite = item.stock.seller_stock  //['موجودی نزد فروشنده'];
            newItem.active = item.is_active  //['فعال'];
            // newItem.marjae = item.price.reference_price   //['قیمت مرجع'];
            newItem.marjae = item.price.reference_price ?   item.price.reference_price : 0; //['قیمت مرجع'];
            newItem.organizationSale = item.extra.b2b_params.is_b2b_active    //['فعال در فروش سازمانی'];
            newItem.fulfilment_and_delivery_cost = item.fulfilment_and_delivery_cost
            
            // newItem.lastBuyPrice = Report.lastBuyPrice(item['کد تنوع'])  // آخرین قیمت خرید
            newItem.lastBuyPrice = parseInt(buyPrice.getBuyPriceByDKPC(newItem.dkpc))
            newItem.totalCost = parseInt(newItem.lastBuyPrice + item.fulfilment_and_delivery_cost + (newItem.salePrice*10)/100)
            newItem.benefit = parseInt(item.price.selling_price - newItem.totalCost)
            newItem.benefitPercent = parseInt((newItem.benefit*100)/item.price.selling_price)
            newItem.minSalePrice = newItem.totalCost+((parseInt(newItem.lastBuyPrice + item.fulfilment_and_delivery_cost + (newItem.salePrice*10)/100))*10)/100
            // console.log(buyPrice.getBuyPriceByDKPC(newItem.dkpc));
            // newItem.stock =newItem.firstCount +newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
            newItem.stock =newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
            newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
            
            newItem.describe = Report.getDes(item.id) ? newItem.description = Report.getDes(item.id).describe : ''

            // newItem.isBuyBox = Report.buyBox(item['کد تنوع']).extra.buy_box.is_buy_box_winner  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
            newItem.isBuyBox = item.extra.buy_box.is_buy_box_winner  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
            newItem.buyBox = item.extra.buy_box.buy_box_price  // != null ? Report.buyBox(item['کد تنوع']).item.extra.buy_box.buy_box_price : ''
            newItem.selling_stock = item.stock.selling_stock // موجودی قابل فروش
            newItem.is_in_buy_box_challenge = item.extra.buy_box.is_in_buy_box_challenge // کاهش هوشمند قیمت
            DATA.push(newItem);
      }
         // console.log(newItem);
      });
      // console.log(DATA[20]);
      // console.log(DATA);
      return DATA;

}
//_____all product not active_____________
static getAllProductsNotActive_old() {
   updateData()
   const DATA = [];
   let countAllProducts = 0
   let countHolooProducts = 0
   // products_2.map((item) => {
   // products.map((item) => {
   digiExcel.map((item) => {
      const newItem = {};
      countAllProducts++
      // const x = Report.productByDKPC(item['کد تنوع']);
      const x = Report.transactionsByDKPC(item['کد تنوع']);
      const itemInHoloo= Report.productFromHolooByDKPC(item['کد تنوع'])
      // const itemInHoloo = holooExcel.find(holooPRDCT=>{
      //    return holooPRDCT['مشخصات فني 1'].includes(item['کد تنوع']) 
      // })
      if (itemInHoloo != null){
         countHolooProducts++
         newItem.productName = itemInHoloo['نام كالا'];
         newItem.holoo = itemInHoloo['كد كالا'];
         newItem.mainGroupe = itemInHoloo["گروه اصلي"];
         newItem.subGroupe = itemInHoloo["گروه فرعي"];
      }
      
      // newItem.avgBuyPrice = item["ميانگين خريد"];
      // newItem.lastBuyPrice = item["آخرين في خريد"];
      // newItem.holooStock = itemFromHoloo['موجودی'];
      newItem.productName = item['عنوان تنوع کالا'].split('|')[0];
      newItem.dkp = item['کد محصول'];
      newItem.dkpc = item['کد تنوع'];
      // newItem.firstCount = 0;
      newItem.salePrice = item['(ریال)قیمت فروش'];
      newItem.sumBuy = x.buy;
      newItem.sumsale = x.sale;
      newItem.sumBackOfSale = x.backOfSale;
      newItem.sumBackBuy = x.backOfBuy;
      newItem.sumOfflineSale = x.offlineSale;
      newItem.broken = x.broken;
      newItem.stockDigiSite = item['موجودی نزد فروشنده'];
      newItem.active = item['فعال'];
      newItem.marjae = item['قیمت مرجع'];
      newItem.organizationSale = item['فعال در فروش سازمانی'];
      newItem.lastBuyPrice = Report.lastBuyPrice(item['کد تنوع'])
      // newItem.stock =newItem.firstCount +newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
      newItem.stock =newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
      newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
      Report.getDes(item['کد تنوع']) ? newItem.description = Report.getDes(item['کد تنوع']).describe : ''

      if (!newItem.active){
         DATA.push(newItem);
      }
      // console.log(newItem);
   });
   // console.log(DATA);
   return DATA;
}
//__________________
   static InvoicesList(type) {
      updateData()
      const result = [];
      let i = 0;
      switch (type) {
         case "sale":
            // console.log("sale...");
            sale.map((item) => {
               result.push(item);
            });
            break;
         case "buy":
            // console.log("buy...");
            buy.map((item) => {
               result.push(item);
            });
            break;
         case "back_of_sale":
            // console.log("back_of_sale...");
            back_of_sale.map((item) => {
               result.push(item);
            });
            break;
         case "back_of_buy":
            // console.log("back_of_buy...");
            back_of_buy.map((item) => {
               result.push(item);
            });
            break;
         case "offline_sale":
            // console.log("offline_sale...");
            offline_sale.map((item) => {
               result.push(item);
            });
            break;
         case "broken":
            // console.log("broken...");
            broken.map((item) => {
               result.push(item);
            });
            break;
      }
      // result.reverse()
      return result;
   }
   static subGroups() {
      const subGroupe = [];
      products_2.map((item) => {
         if (!subGroupe.includes(item["گروه فرعي"])) {
            subGroupe.push(item["گروه فرعي"]);
         }
      });
      return subGroupe;
   }
   static productByDKPCDetail(dkpc){
      updateData()
      // console.log(dkpc);
      const result = [];
      buy.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })

      sale.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })
      back_of_sale.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })
      back_of_buy.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })
      offline_sale.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })
      broken.map(fktr=>{
         // console.log(fktr.invoiceName);
         fktr.invoice.map(prdct=>{
            if(parseInt(dkpc)===parseInt(prdct.dkpc)){
               const found = {}
               // console.log(fktr.invoiceName);
               // found.date = fktr.invoiceName
               found.date = fktr.date
               found.type = fktr.type
               found.client = fktr.client
               found.count = prdct.count
               // console.log(found);
               result.push(found)
            }
         })
      })

      return result
   }
   static buyBox(dkpc){
      updateData()
      let i =1
      // digiAPI.map(item=>{
      //    // console.log(i++,item.id,'Active:',item.is_active,'selling_price:',item.price.selling_price,'is_buy_box_winner',item.extra.buy_box.is_buy_box_winner,'buy_box_price:',item.extra.buy_box.buy_box_price);
      //    if(item.is_active==true&&item.extra.buy_box.is_buy_box_winner ==false){
      //       console.log(i++,item.id,'Active:',item.is_active,'selling_price:',item.price.selling_price,'is_buy_box_winner',item.extra.buy_box.is_buy_box_winner,'buy_box_price:',item.extra.buy_box.buy_box_price);
      //    }
      
      // })
      const result = digiAPI.find(item => {
         // console.log(i++,'buyBox');
         return item.id == dkpc
      })
      return result
   }
}
// Report.getAllProducts();
// console.log(Report.buyBox(47445075));
// console.log(Report.getAllProducts());
// Report.getAllProducts()
export default Report;

// console.log(Report.getAllProducts());