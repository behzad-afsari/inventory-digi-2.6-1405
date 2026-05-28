import behzad from "./modules/module-json-xlsx.js";

// import path from "path";
// import { fileURLToPath } from "url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const excelDigi = behzad.readXLSX([path.join(__dirname,'../data/list-products-from-digi/list-from-digi',"داده ها")])
// console.log(excelDigi[0])

const digiExcel = behzad.readXLSX(
   "../data/list-products-from-digi/list-from-digi",
   "داده ها"
);
console.log("digiExcel", digiExcel[0]);
const excelAnbaresh = behzad.readXLSX("../data/انبارش_بلک_فرایدی", "Sheet1");
console.log("excelAnbaresh", excelAnbaresh[0]);

const newData = excelAnbaresh.map((item) => {
   const dkp = "";
   digiExcel.map((x) => {
      // return x["کد تنوع"] === item.dkpc ? x["کد محصول"] : "";
      if (parseInt(x["کد تنوع"]) == parseInt(item.dkpc)) {
         item.dkp = x['کد محصول'];
        //  console.log(item);
         // console.log(x["کد تنوع"]);
      }
   });
   return item;
});

console.log(newData);
// behzad.writeXLSX("../data/list_for_anbaresh", newData)
