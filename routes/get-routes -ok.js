import path from "path";
import express from "express";
import bodyParser from "body-parser";

// import Report from "../model/apps/report-module.js";
import Report from "../model/apps/report-module-by-digi-excel.js";
import showInvoice from "../model/apps/show-invoice.js";
import orderSubmit from "../model/apps/order-submit.js";

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

router.get("/", (req, res) => {
   // res.send("home page.....")
   console.log(req);
   console.log(req.url, req.method, "ip", req.rawHeaders[1]);

   res.render("index");
});

router.get("/get-all-products", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   console.log(req.url);
   res.render("get-all-products", { products });
});

router.get("/get-all-products-subgroupe", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   res.render("get-all-products-subgroupe", { products, subGRP });
});
router.get("/get-all-products-subgroupe-lessthan3", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   res.render("get-all-products-subgroupe-lessthan3", { products, subGRP });
});

router.get("/get-all-products-subgroupe-benefit", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   res.render("get-all-products-subgroupe-benefit", { products, subGRP });
});

router.get("/get-all-products-subgroupe-order", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   // res.send('hi behzad')
   res.render("get-all-products-subgroupe-order", { products, subGRP });
});

router.get("/get-all-products-subgroupe-not-active", (req, res) => {
   const products = Report.getAllProductsNotActive();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url, ">>>", subGRP.subgroupe);
   res.render("get-all-products-subgroupe-not-active", { products, subGRP });
});

router.get("/product-categories", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url);
   res.render("product-categories", { subGroups });
});

router.get("/product-categories-for-order", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url);
   res.render("product-categories-order", { subGroups });
});
router.get("/product-categories-lessthan3", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url);
   res.render("product-categories-lessthan3", { subGroups });
});
router.get("/product-categories-not-active", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const subGRP = req.query;
   console.log(req.url);
   res.render("product-categories-not-active", { subGroups });
});

router.get("/invoices-list", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   console.log(req.url);
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
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   const invoiceName = req.query;
   // console.log(invoiceName);
   const invoiceDetail = showInvoice(invoiceName.query);
   // console.log(invoiceDetail);
   // res.send(invoiceDetail)
   res.render("show-invoice", { invoiceDetail });
});

router.get("/dkpc-detail", (req, res) => {
   const products = Report.getAllProducts();
   const saleInvoices = Report.InvoicesList("sale");
   const buyInvoices = Report.InvoicesList("buy");
   const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
   const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
   const offlineInvoices = Report.InvoicesList("offline_sale");
   const brokenInvoices = Report.InvoicesList("broken");
   const subGroups = Report.subGroups();
   console.log(req.url);
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
   res.render("about-me");
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
   res.send({ result: req.body });
   // res.render("order-submited");
   // res.redirect('/order-submited')
});

export default router;
