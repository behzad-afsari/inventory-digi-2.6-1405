import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";

import products_2 from './generate-product-DB-from-holoolist-2.js'
// console.log('+++',products_2[14])
let sale,buy,back_of_sale,back_of_buy,offline_sale,broken,digiExcel,digiAPI,discription,holooExcel

function updateData(){
   console.log('data updating...');
    sale = behzad.readJson(path.join(__dirname, "../data/stock/sale.json"));
    buy = behzad.readJson(path.join(__dirname, "../data/stock/buy.json"));
    back_of_sale =  behzad.readJson(path.join(__dirname, "../data/stock/back_of_sale.json"));
    back_of_buy = behzad.readJson(path.join(__dirname, "../data/stock/back_of_buy.json"));
    offline_sale = behzad.readJson(path.join(__dirname, "../data/stock/offline_sale.json"));
    broken = behzad.readJson(path.join(__dirname, "../data/stock/broken.json"));
    digiExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-digi/list-from-digi"),"داده ها");
    discription  = behzad.readXLSX(path.join(__dirname,'../data/descriptions'),'Sheet1')
    console.log('data updated !');
    //  digiAPI = behzad.readJson(path.join(__dirname, "../data/list-products-from-digi-api/product-list.json"));
    //  digiAPI.reverse()
    holooExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),"Sheet1");
    // console.log('holoo -+++++->',holooExcel[0])
    //  console.log('sale -->',sale[0])
   }
   // const holooExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),"Sheet1");
updateData()
// console.log('sale -+++++->',sale[0])

// console.log('holoo -->',holooExcel[0])
// console.log('holoo -->',holooExcel)

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
         }
      });

      let buyPrice = 0
      products_2.map((holooItem) => {
        if (holooItem.dkpc===DKPCForReport) {
      //   if (holooItem["مشخصات فني 1"].includes(DKPCForReport)) {
          // console.log(">>", holooItem["مشخصات فني 1"],holooItem['آخرين في خريد']);
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

   static getAllProducts() {
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
            newItem.lastBuyPrice = itemInHoloo["آخرين في خريد"]
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
         // newItem.marjae = item['قیمت مرجع'];
         newItem.marjae = item['قیمت مرجع']!==null ? item['قیمت مرجع'] : 1;
         newItem.organizationSale = item['فعال در فروش سازمانی'];
         // newItem.lastBuyPrice = Report.lastBuyPrice(item['کد تنوع'])
         // newItem.stock =newItem.firstCount +newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.stock =newItem.sumBuy -newItem.sumsale + newItem.sumBackOfSale -newItem.sumBackBuy - newItem.sumOfflineSale -newItem.broken;
         newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
         // newItem.description = Report.getDes(item['کد تنوع']) ? 'description' : "";
         Report.getDes(item['کد تنوع']) ? newItem.description = Report.getDes(item['کد تنوع']).describe : ''
         // item['کد تنوع']== 47165610 ? console.log(Report.getDes(item['کد تنوع'])) : ''
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
}
// Report.getAllProducts();
export default Report;