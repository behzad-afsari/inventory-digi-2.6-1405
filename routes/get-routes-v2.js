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
      console.log('log:',Date(),req.ip,req.url , subgroupe);
}


// ROUTES ______________________________
router.get("/", (req, res) => {
   // res.send("home page.....")
   // console.log(req);
   console.log('home:',req.url, req.method, req.ip, req.rawHeaders[1]);
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
   console.log('get all products',req.url);
   log(req)
   res.render("get-all-products", { products });
});

router.get("/get-all-products-subgroupe", (req, res) => {
   const products = Report.getAllProducts();
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
   console.log('brand:',req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-lessthan3", { products, subGRP });
});

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
   console.log('benefit :',req.url, ">>>", subGRP.subgroupe);
   log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-benefit", { products, subGRP });
});

router.get("/get-all-products-subgroupe-order", (req, res) => {
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
   // res.send('hi behzad')
   log(req,subGRP.subgroupe)
   
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
   console.log('category:',req.url);
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
   console.log('order :',req.url);
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
   console.log('lessthan3 :',req.url);
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
   console.log('ot active :',req.url);
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
   console.log('invoie detail :',req.url);
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
   console.log('not exist in digi :',req.url);
   log(req)

   res.render("get-all-products-not-exist-in-digi",{result});
});


router.post("/order-submited", (req, res) => {
   // res.sendFile(path.join(__dirname,"views/about-me.html"))
   // const orderSubmited = orderSubmit
   // console.log(orderSubmited);
   console.log('submited :',req.url);
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
   console.log('user:',user);
   console.log(req.query.adminuser);
   console.log(req.query.test);
   // const order = req.query.order
   // const marjae = req.query.marjae
   // console.log('(brand:',brand,') - (admin:',admin,') - (order:',order,') - (marje: ',marjae,') - (path: ',path,")");
   console.log('(path: ' , path, ") - (brand:" ,brand , ') - (user:' , user,')');
   // console.log(req.url, ">>>", subGRP.subgroupe);
   // log(req,subGRP.subgroupe)
   res.render("get-all-products-subgroupe-v2", { products,path,brand,user});
   // res.send(brand+admin+order+marjae)
});

router.get("/product-categories-v2", (req, res) => {
   const brands = Report.subGroups();
   const path = req.query.path
   // console.log('path :',path);
   console.log('url :',req.url);

   res.render("product-categories-v2", { brands,path });
});

export default router;
