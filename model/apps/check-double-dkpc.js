import behzad from "./modules/module-json-xlsx.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.clear();

const excelHoloo = behzad.readXLSX(
   path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
   // path.join(__dirname, "../data/invoice/buy/1402-07-14-buy-avvaldore-0-new"),
   "Sheet1"
);
const avvalDore = behzad.readXLSX(
   // path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
   path.join(__dirname, "../data/invoice/buy/1402-07-14-buy-avvaldore-0-new"),
   "Sheet1"
);
// console.log(excelHoloo);

//-------------------------------------------------
function DKPC(list) {
   let i = 0;
   list.map((x) => {
      let exist = 0;
      list.map((y) => {
         if (y === x) {
         // if (y.dkpc === x.dkpc) {
            exist = exist + 1;
         }
      });
      if (exist > 1) {
         i++;
         console.log(x);
         // console.log(x);
      }
   });
   // console.log("i:", i);
   return i
}

//-------------------------------------------------
function listHoloo(list) {
   
   const allDkpc = []
   list.map((x) => {
      // console.log(x['مشخصات فني 1']);
      const dkpc = x['مشخصات فني 1']
      const dkpcSplited = dkpc.split('-')
      // console.log(dkpcSplited);
      dkpcSplited.map(x=>{
         x !== ""? allDkpc.push(x): ""
      })
   });
   // console.log('allDkpc:',allDkpc);
   return allDkpc
}

const result = listHoloo(excelHoloo);
console.log(result);
console.log(DKPC(result));