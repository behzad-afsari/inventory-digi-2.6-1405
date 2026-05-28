// const axios = require('axios');
import axios from "axios";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// import { fileURLToPath } from "url";
// import path from "path";


// import jsonHandlerClass from "../components/json_handler.js";
// import behzad from "./modules/module-json-xlsx.js";

// import fileNameTime from "../components/file_name_time.js";

// const jsonHandler = new jsonHandlerClass();


// console.clear();
// console.log("\n_______________START____________________");

// __________Get Product Data From Digi______________
function getProductDataFromDigi(dkpc) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    baseURL: "https://seller.digikala.com/api/v1/",
    url: `variants/?search[id]=${dkpc}`,
    headers: {
      Authorization:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MTQ3MTEsInBheWxvYWQiOm51bGx9.Vi_CAPYWhNgnr1RZm-yiCiEcZp9RK-fFR4lyMMSG75SpuWgyyyiSkaH-Y1HtkF3z",
      Cookie:
        "PHPSESSID=cpgok3e2c91tljlata1o4o2g2k; TS018d011a=01023105916249956badce9f20dbb6dc036a151107aa9e1082336ac75728ea90a8f330a5cfe89bafe093a8d0b7a8c0c30ff0bd443c1a7a7942d3c02e0bf3977856c9686a81f4cd9e5801905259faac6db630d89c1bf6faeed9e451d52cb6edf788c4478ce9; tracker_glob_new=6tcEir6; tracker_session=hlabEtX",
    },
  };

  axios
    .request(config)
    .then((response) => {
      //  console.log(JSON.stringify(response.data));
      console.log(">>>>", response.data.data.items[0]); //ok
      console.log("===>", response.data.data.items[0].extra.selling_channels.product_selling_channel); //ok
      console.log("===>", response.data.data.items[0].extra.selling_channels.variant_selling_channel); //ok
      // console.log("selling_price >>>>", response.data.data.items[0].price.selling_price);//ok
      // console.log("dkpc >>>>", response.data.data.items[0].id); //ok
      // console.log("dkp >>>>", response.data.data.items[0].product.id); //ok
      // console.log("name >>>>", response.data.data.items[0].product.title); //ok
      // console.log('selling_channels >>>',response.data.data.items[0].extra.selling_channels.product_selling_channel)
      // console.log('selling_channels >>>',response.data.data.items[0].extra.selling_channels.variant_selling_channel)
      console.log("__________________________________");
      return response;
    })
    .catch((error) => {
      console.log('error');
    });
}


getProductDataFromDigi(53976936)

console.log('finish');

// function fetch_1 (){

// }

