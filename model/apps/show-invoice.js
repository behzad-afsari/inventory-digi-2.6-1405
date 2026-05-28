import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";
// import Report from './report-module.js'

const holooExcel = behzad.readXLSX(
   path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
   "Sheet1"
);
// console.log(holooExcel[0]);

const invoiceDetail = (invoiceToFind) => {
   const parts = invoiceToFind.split("-");
   const invoiceType = parts[3];
   //    console.log(invoiceToFind);
   //    console.log(invoiceType);
   //    const invoices = behzad.readJson("../data/stock/" + invoiceType + ".json");
   const invoices = behzad.readJson(
      path.join(__dirname, "../data/stock/" + invoiceType + ".json")
   );

   //    console.log(invoices);
   const invoice = invoices.find((item) => {
      //   console.log(item.invoiceName);
      return item.invoiceName == invoiceToFind;
   });
   // console.log('+++++++++++++++++++++++++++++',invoice.invoice);
   invoice.invoice.forEach(item=>{
      // console.log('item >>>',item);
      holooExcel.find(h=>{
         if(h['مشخصات فني 1'].includes(item.dkpc.toString().trim())){
            item.holoo = h['كد كالا']
            // console.log(item);
         }
      })
   })
   return invoice;
};

// invoiceDetail("1402-08-20-buy-omid-325-new");
// invoiceDetail("1402-08-06-sale-zibavash-6144421281023001");
export default invoiceDetail;
