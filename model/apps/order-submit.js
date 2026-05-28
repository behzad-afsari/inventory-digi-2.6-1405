import fs from "fs";

import behzad from "./modules/module-json-xlsx.js";

function orderSubmit(data) {
   const time = Date.now();
   // const fileName = Date.prototype.toString()

   // let fileName = Date.now();
   const invoiceDetail = data.data.invoiceDetail;
   const fileName = data.data.fileName != "" ? data.data.fileName + '-' + time : time; //Date.now();
   console.log("my order SUBMITED :)", data);
   console.log("fileName >>", fileName);
   console.log("invoiceDetail >.", invoiceDetail);
   //   fs.writeFileSync("./model/data/new-order/1.json", JSON.stringify(data), "utf8");
   //    fs.writeFileSync("1.json", JSON.stringify(data), "utf8");
   behzad.writeXLSX("./model/data/invoice/new-order/" + fileName, invoiceDetail);
}

export default orderSubmit;
