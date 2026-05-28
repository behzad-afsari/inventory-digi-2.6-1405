console.clear();

import behzad from "./modules/module-json-xlsx.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const excelHoloo = behzad.readXLSX(
//    path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
   path.join(__dirname, "../data/invoice/buy/1402-07-14-buy-avvaldore-0-new"),
   "Sheet1"
);

// console.log(excelHoloo);

// const arr_1 = [
//    { code: 1, count: 3 },
//    { code: 1, count: 3 },
//    { code: 2, count: 3 },
//    { code: 2, count: 3 },
//    { code: 3, count: 3 },
//    { code: 1, count: 3 },
// ];

// const arr_2 = [];
// for (let x of arr_1) {
//     let exist = false
//    for (let y of arr_2) {
//       if (y.code === x.code) {
//          y.count = y.count + x.count;
//          exist = true
//       }
//    }
//    if (!exist){
//     arr_2.push(x)
//    }
// }

// console.log("arr_1:", arr_1);
// console.log("arr_2:", arr_2);

const newList = [];
for (let x of excelHoloo) {
   let exist = false;
   for (let y of newList) {
      if (x['کد هلو'] === y['کد هلو']) {
         y["تعداد"] = y["تعداد"] + x["تعداد"];
         exist = true;
      }
   }
   if(!exist){
    newList.push(x)
   }
}

// console.log(excelHoloo.length);
console.log(newList);
console.log(newList.length);

behzad.writeXLSX('../data/invoice/buy/1402-07-14-buy-avvaldore-0-new-combineByHolooCode', newList)

