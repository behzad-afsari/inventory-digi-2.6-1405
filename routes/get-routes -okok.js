import path from "path";
import express from "express";
import bodyParser from "body-parser";

// import Report from "../model/apps/report-module.js";
// import Report from "../model/apps/report-module-by-digi-excel.js";
import Report from "../model/apps/report-module-by-digi-api.js";
import showInvoice from "../model/apps/show-invoice.js";
import orderSubmit from "../model/apps/order-submit.js";
import productsNotExistInDigi from '../model/apps/report-product-isnot-in-digi.js'

import logGeneral from '../model/apps/modules/log-generator.js'
import fetchDataFromDigikalaAPI from'../model/apps/digi-api.js'


// const showInvoice = show_invoice()

function reportofDB() {
   result.result = {};
   result.products = Report.getAllProducts();
   result.saleInvoices = Report.InvoicesList("sale");
   result.buyInvoices = Report.InvoicesList("buy");
   result.backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   result.backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   result.offlineInvoices = Report.InvoicesList("offline_sale");
   result.brokenInvoices = Report.InvoicesList("broken");
   result.subGroups = Report.subGroups();
   result.products = products;
   return result;
   // console.log('---',products[14]);
}

//_____________________________
// const products = Report.getAllProducts();
// const saleInvoices = Report.InvoicesList("sale");
// const buyInvoices = Report.InvoicesList("buy");
// const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
// const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
// const offlineInvoices = Report.InvoicesList("offline_sale");
// const brokenInvoices = Report.InvoicesList("broken");
// const subGroups = Report.subGroups();
//_____________________________

const router = express.Router();

router.use(bodyParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


function log(req,subgroupe = ""){
      logGeneral(`${Date()} ${req.ip} ${req.url} ${subgroupe}`)
      console.log(Date(),req.ip,req.url , subgroupe);
}


// ROUTES ______________________________
router.get("/", (req, res) => {
   // res.send("home page.....")
   // console.log(req);
   console.log(req.url, req.method, req.ip, req.rawHeaders[1]);
   // log(req)
   res.render("index");
});



   
router.get("/get-all-products", (req, res) => {
   const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   console.log(req.url);
   log(req)
   res.render("get-all-products", { products });
});

router.get("/get-all-products-subgroupe", (req, res) => {
   const productsUnOrder = Report.getAllProducts();

   const products = productsUnOrder.sort((a,b)=>{
      if(a.holoo>b.holoo) return 1
      if(a.holoo<b.holoo) return -1
      return 0
  })
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const subGRP = req.query;
   // console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe", { products, subGRP });
});
router.get("/get-all-products-subgroupe-lessthan3", (req, res) => {
   const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-lessthan3", { products, subGRP });
});



// --------------------product-categories-inactive-zeroInDigi-AvailableInStock --------------------
router.get("/product-categories-inactive-zeroInDigi-AvailableInStock", (req, res) => {
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories-inactive-zeroInDigi-AvailableInStock", { subGroups });
});
// --------------------product-categories-inactive-zeroInDigi-AvailableInStock --------------------
router.get("/get-all-products-subgroupe-inactive-zeroInDigi-AvailableInStock", (req, res) => {
   const products = Report.getAllProducts();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-inactive-zeroInDigi-AvailableInStock", { products, subGRP });
});

/////////////////////////////////////////////////



router.get("/get-all-products-subgroupe-benefit", (req, res) => {
   const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-benefit", { products, subGRP });
});

router.get("/get-all-products-subgroupe-order", (req, res) => {
   const productsUnOrder = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   // res.send('hi behzad')
   log(req,subGRP.subgroupe)

   const products = productsUnOrder.sort((a,b)=>{
      if(a.holoo>b.holoo) return 1
      if(a.holoo<b.holoo) return -1
      return 0
  })
//   console.log(products);

   res.render("get-all-products-subgroupe-order", { products, subGRP });
});

router.get("/get-all-products-subgroupe-not-active", (req, res) => {
   const products = Report.getAllProductsNotActive();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)

   res.render("get-all-products-subgroupe-not-active", { products, subGRP });
});

/////___ marjae ___//////////////////////////////////////////++++++++++++++++++++
router.get("/product-categories-marjae", (req, res) => {
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories-marjae", { subGroups });
});

router.get("/get-all-products-subgroupe-marjae", (req, res) => {
   const products = Report.getAllProducts();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)

   res.render("get-all-products-subgroupe-marjae", { products, subGRP });
});

///////////////////////////////////////////////++++++++++++++++++++++



router.get("/product-categories", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories", { subGroups });
});

router.get("/product-categories-for-order", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories-order", { subGroups });
});
router.get("/product-categories-lessthan3", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories-lessthan3", { subGroups });
});


router.get("/product-categories-not-active", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   // const subGRP = req.query;
   console.log(req.url);
   // log(req,subGroups)

   res.render("product-categories-not-active", { subGroups });
});

router.get("/invoices-list", (req, res) => {
   // const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   // console.log(req.url);
   log(req)

   res.render("invoices-list", {
      saleInvoices,
      buyInvoices,
      backOfSaleInvoices,
      backOfBuyInvoices,
      offlineInvoices,
      brokenInvoices,
   });
});

router.get("/invoice-detail", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   const invoiceName = req.query;
   console.log(req.url);
   log(req)

   // console.log(invoiceName);
   const invoiceDetail = showInvoice(invoiceName.query);
   // console.log(invoiceDetail);
   // res.send(invoiceDetail)
   res.render("show-invoice", { invoiceDetail });
});

router.get("/dkpc-detail", (req, res) => {
   // const products = Report.getAllProducts();
   // const saleInvoices = Report.InvoicesList("sale");
   // const buyInvoices = Report.InvoicesList("buy");
   // const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   // const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   // const offlineInvoices = Report.InvoicesList("offline_sale");
   // const brokenInvoices = Report.InvoicesList("broken");
   // const subGroups = Report.subGroups();
   console.log(req.url);
   log(req)

   const urlQuery = req.query;
   const dkpcForDetail = urlQuery.dkpc;
   const result = Report.productByDKPCDetail(dkpcForDetail);
   // console.log(result);
   res.render("get-dkpc-detail", { result });
   // res.send(result)
});

router.get("/about-me", (req, res) => {
   // res.sendFile(path.join(__dirname,"views/about-me.html"))
   console.log(req.url);
   log(req)

   res.render("about-me");
});

router.get("/ProductsAreNotInDigi", (req, res) => {
   // res.sendFile(path.join(__dirname,"views/about-me.html"))
   const result = productsNotExistInDigi()
   // console.log(result);
   console.log(req.url);
   log(req)

   res.render("get-all-products-not-exist-in-digi",{result});
});


router.post("/order-submited", (req, res) => {
   // res.sendFile(path.join(__dirname,"views/about-me.html"))
   // const orderSubmited = orderSubmit
   // console.log(orderSubmited);
   console.log(req.url);
   console.log("55555555555");
   // console.log('url.body >',req.url.body);
   // console.log('body >',req.body.data);
   orderSubmit(req.body);
   log(req)

   res.send({ result: req.body });
   // res.render("order-submited");
   // res.redirect('/order-submited')
});



// _________________V2______________________________

router.get("/get-all-products-subgroupe-v2", (req, res) => {
   const products = Report.getAllProducts();
   // console.log(req.url);
   // console.log(req.query);
   const path = req.query.path
   const brand = req.query.brand;
   const user = req.query.user;
   // const order = req.query.order
   // const marjae = req.query.marjae
   // console.log('(brand:',brand,') - (admin:',admin,') - (order:',order,') - (marje: ',marjae,') - (path: ',path,")");
   console.log('(path: ' , path, ") - (brand:" ,brand , ') - (user:' , user);
   // console.log(req.url, ">>>", subGRP.subgroupe);
   // log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-v2", { products,path,brand,user});
   // res.send(brand+admin+order+marjae)
});

router.get("/product-categories-v2", (req, res) => {
   const brands = Report.subGroups();
   const path = req.query.path
   console.log('path :',path);
   console.log(req.url);

   res.render("product-categories-v2", { brands,path });
});

router.get("/update-digi-api", (req, res) => {
   const result = async()=>{
      console.log('updating data...');
      const fetched = await fetchDataFromDigikalaAPI()
      if (fetched){
         // res.send('اطلاعات محصولات بروز شد.')
         // res.sendFile('digiapiupdate-success.html')
         res.send(`<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <style>
         .main {
           display: flex;
           align-items: center;
           justify-content: center;
           flex-direction: column;
           direction: rtl;
         }
         .box {
           width: 500px;
           height: 300px;
           text-align: center;
         }
         .message{
           background-color: rgb(255, 240, 171);
           border-radius: 10px;
           padding: 10px;
         }
         .btn {
           background-color: rgb(255, 217, 135);
           border-radius: 10px;
           padding: 10px;
           width: 50px;
           color: white;
           margin: auto;
         }
       </style>
     </head>
     <body>
       <div class="main">
         <div class="box">
           <div class="message">
             <h1>اطلاعات محصولات بروز شد.</h1>
             <h3 class="btn"><a href="/">بازگشت</a></h3>
           </div>
         </div>
       </div>
     </body>
   </html>
   `)
      }else{
         // res.send('خطا در بروز رسانی ...')
         res.sendFile('digiapiupdate-fail.html')
         res.send(`<!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="UTF-8" />
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
             <title>Document</title>
             <style>
               .main {
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 flex-direction: column;
                 direction: rtl;
               }
               .box {
                 width: 500px;
                 height: 300px;
                 text-align: center;
               }
               .message{
                 background-color: rgb(255, 167, 146);
                 border-radius: 10px;
                 padding: 10px;
               }
               .btn {
                 background-color: rgb(255, 106, 100);
                 border-radius: 10px;
                 padding: 10px;
                 width: 50px;
                 color: white;
                 margin: auto;
               }
             </style>
           </head>
           <body>
             <div class="main">
               <div class="box">
                 <div class="message">
                   <h1>خطا در بروز رسانی</h1>
                   <h3 class="btn"><a href="/">بازگشت</a></h3>
                 </div>
               </div>
             </div>
           </body>
         </html>
         `)
      }
   }
   result()
});


export default router;
