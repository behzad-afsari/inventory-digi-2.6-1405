import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";

// const digiExcel = behzad.readXLSX(
//    path.join(__dirname, "../data/list-products-from-digi/list-from-digi"),
//    "داده ها"
// );
// console.log("digi -->", digiExcel[0]);

const digiExcel = behzad.readJson(path.join(__dirname,"../data/list-products-from-digi-api/product-list.json"))
// console.log(digiExcel[0]);

const holooExcel = behzad.readXLSX(
   path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
   "Sheet1"
);
// console.log("holoo -->", holooExcel[0]);

function getProductsNotInDigi() {
   const arr = [];
   holooExcel.map((h) => {
      const dkpc = h["مشخصات فني 1"].split("-");
      // console.log(h["مشخصات فني 1"],'===', dkpc);
      dkpc.map((code) => {
         if (code !== "") {
            const res = digiExcel.find((d) => {
               // console.log(d.id,'--',code);
               
               return parseInt(d.id) === parseInt(code);
               // return parseInt(d["کد تنوع"]) === parseInt(code);
            });
            if (res === undefined) {
               arr.push(h);
            }
         }else{
            // console.log(h,'code:',code);
            
         }
      });
   });
   return arr;
}


// console.log(getProductsNotInDigi());

export default getProductsNotInDigi;
