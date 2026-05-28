import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import behzad from "./modules/module-json-xlsx.js";

// const digiExcel = behzad.readJson(path.join(__dirname,"../data/list-products-from-digi-api/product-list.json"))

// console.log(digiExcel[0]);


 function listPruductsInHoloo() {
    const holooExcel = behzad.readXLSX(
        path.join(__dirname, "../data/list-products-from-holoo/list-holoo"),
        "Sheet1"
     );

    //  console.log("holoo -->", holooExcel[2]);
    return holooExcel
 }

 export default listPruductsInHoloo
