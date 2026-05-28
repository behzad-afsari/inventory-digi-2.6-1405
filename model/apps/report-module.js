import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";

import products_2 from './generate-product-DB-from-holoolist-2.js'
// console.log('+++',products_2[14])

const sale = behzad.readJson(path.join(__dirname, "../data/stock/sale.json"));
const buy = behzad.readJson(path.join(__dirname, "../data/stock/buy.json"));
const back_of_sale = behzad.readJson(path.join(__dirname, "../data/stock/back_of_sale.json"));
const back_of_buy = behzad.readJson(path.join(__dirname, "../data/stock/back_of_buy.json"));
const offline_sale = behzad.readJson(path.join(__dirname, "../data/stock/offline_sale.json"));
const broken = behzad.readJson(path.join(__dirname, "../data/stock/broken.json"));
const digiExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-digi/list-from-digi"),"داده ها");
const products = behzad.readJson(path.join(__dirname, "../data/stock/products-DB.json"));
// console.log(products);

const holooExcel = behzad.readXLSX(path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),"Sheet1");
// console.log(holooExcel[12])

let aaa = 0;
var iii = 0;

class report {
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

      
      const PRDCT = {};
      PRDCT.buy = countBuy;
      PRDCT.sale = countSale;
      PRDCT.backOfSale = countBackOfSale;
      PRDCT.backOfBuy = countBackOfBuy;
      PRDCT.offlineSale = countOfflineSale;
      PRDCT.broken = countBroken;
      PRDCT.stockDigiSite = stockDigiSite;
      PRDCT.salePrice = productInDigi.salePrice
      PRDCT.active = productInDigi.active
      PRDCT.marjae = productInDigi.marjae
      PRDCT.organizationSale = productInDigi.organizationSale


      // console.log(DKPCForReport,'>',PRDCT);

      return PRDCT;
   }

   static getAllProducts() {
      const DATA = [];
      // products_2.map((item) => {
      products.map((item) => {
         // digiExcel.map((item) => {
         const newItem = {};
         const x = report.productByDKPC(item.dkpc);
         newItem.productName = item["نام كالا"];
         newItem.holoo = item["كد هلو"];
         newItem.dkpc = item.dkpc;
         newItem.mainGroupe = item["گروه اصلي"];
         newItem.subGroupe = item["گروه فرعي"];
         newItem.avgBuyPrice = item["ميانگين خريد"];
         newItem.lastBuyPrice = item["آخرين في خريد"];
         newItem.holooStock = item['موجودی'];
         newItem.firstCount = 0;
         newItem.sumBuy = x.buy;
         newItem.sumsale = x.sale;
         newItem.salePrice = x.salePrice;
         newItem.sumBackOfSale = x.backOfSale;
         newItem.sumBackBuy = x.backOfBuy;
         newItem.sumOfflineSale = x.offlineSale;
         newItem.broken = x.broken;
         newItem.stockDigiSite = x.stockDigiSite;
         newItem.active = x.active;
         newItem.marjae = x.marjae;
         newItem.organizationSale = x.organizationSale;
         newItem.stock =
            newItem.firstCount +
            newItem.sumBuy -
            newItem.sumsale +
            newItem.sumBackOfSale -
            newItem.sumBackBuy -
            newItem.sumOfflineSale -
            newItem.broken;
         newItem.deffrenceDigi_Anbar = newItem.stock - newItem.stockDigiSite;
         DATA.push(newItem);
         // console.log(newItem);
      });
      return DATA;
   }

   static InvoicesList(type) {
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
            back_of_sale.map((item) => {});
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

export default report;