console.clear();


// const axios = require('axios');
import axios from "axios";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { fileURLToPath } from "url";
import path from "path";

// import jsonHandlerClass from "../components/json_handler.js";
// import behzad from "./modules/module-json-xlsx.js";

// import fileNameTime from "../components/file_name_time.js";

// const jsonHandler = new jsonHandlerClass();

// console.clear();
// console.log("\n_______________START____________________");

// __________Get Product Data From Digi______________
/* 
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
      // console.log(">>>>", response.data.data.items[0]); //ok
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
      console.log(error);
    });
}
// const products = [47445192,47165610,47123878,46631127,46631103,46631063,46631036,46631001,45755675]
// const products = [47445192]
// const products = [47445192, 47165610, 45755675];
// products.map((item) => getProductDataFromDigi(item));
 */
// _____________GET List of variants__________________________

const errPage = [];
let allProducts = [];
let totalProducts = 0;
function listOfVariants(page, count) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MTQ3MTEsInBheWxvYWQiOm51bGx9.Vi_CAPYWhNgnr1RZm-yiCiEcZp9RK-fFR4lyMMSG75SpuWgyyyiSkaH-Y1HtkF3z"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const products = fetch(
    // fetch(
    // "https://seller.digikala.com/api/v1/variants/?search[id]&search[product_id]&search[category_ids]&search[brand_ids]&search[has_warehouse_stock]&search[shipping_type]&search[is_active]&search[is_archived]&search[is_buy_box_winner]&search[is_in_promotion]&search[is_in_competition]&search[supplier_code]&search[active_b2b]",
    // "https://seller.digikala.com/api/v1/variants/",
    `https://seller.digikala.com/api/v1/variants/?page=${page}&size=${count}`,
    // "https://seller.digikala.com/api/v1/variants/?search[id]=46201377",
    // "https://seller.digikala.com/api/v1/variants/?search[active_b2b]=true",
    requestOptions
  )
    // .then((response) => response.text())
    .then((response) => response.json())
    .then((result) => {
      console.log("line 89 :",page, " ===========>>", result);
      // console.log('++++',result.data.pager.total_rows);
      totalProducts = result.data.pager.total_rows;
      // const res = JSON.parse(result);
      // console.log(res.data.pager.total_page ,' >>>',res);
      // console.log(res.data.pager);
      // console.log(res.data);
      // console.log(res.data.items[0]);
      const products = result.data;
      // const products = JSON.parse(result).data;
      // console.log(products.items);
      return products.items;
      // allProducts = allProducts.concat(products.items);
      // console.log('++++++++++++',products.items[0].extra.buy_box);
      // console.log(products.items[49].product.title);
      // return {"totalPages" : res.data.pager.total_page , "products":products.items}
    })
    .catch((error) => {
      // console.log("error", error);
      errPage.push(page);
      throw new Error(error);
    });
  // console.log(xxx++);
  return products;
}

//______________OK____OK_______________
async function fetchDataFromDigikalaAPI() {
  const productPerPage = 10;
  await listOfVariants(1, 3);
  let totalPages = totalProducts / productPerPage;
  console.log('***** >>>',totalPages);
  console.log('*****',parseInt(totalPages+1));
  totalPages = parseInt(totalPages+1)
  for (let i = 1; i <= totalPages ; i++) {
    const products = await listOfVariants(i, productPerPage);
    allProducts = allProducts.concat(products);
  }

  // console.log("<<<<>>>>>", allProducts);
  // console.log("errPages >>", errPage);
  // console.log("count:", allProducts.length);
  ///// here need a dowdile untile the function dont run for first time and there is no error in date fetetched from API...
  // const now = Date.now()
  // const timeNow = new fileNameTime();
  // const now = Date.getTime();
  // const now = Date();
  // const jsonHandler = new jsonHandlerClass();
  // jsonHandler.writeJson(`../data/digikala_data/all_products_from_digi_${now}.json`,allProducts);
  if (errPage.length === 0) {
    // if (true){
    // console.log('allProducts :', allProducts.length);  //ok
    // behzad.writeJson(path.join(__dirname, "../data/list-products-from-digi-api/product-list.json"), allProducts);
    allProducts = [];
    // console.log('done');
    // console.log(__dirname);
    return true;
  } else {
    allProducts = [];
    console.log("err >>>", errPage);
    return false;
  }
}

fetchDataFromDigikalaAPI();
console.log(Date());

// const js_test = jsonHandler.readJson(`../data/digikala_data/all_products_from_digi-1.json`)
// console.log(js_test);

// const digiJSON = behzad.readJson(path.join(__dirname, "../data/list-products-from-digi-api/product-list.json"));
// console.log(digiJSON);

export default fetchDataFromDigikalaAPI;

