import express from "express";

// import Report from "../model/apps/report-module.js";
import Report from "../model/apps/report-module-by-digi-excel.js";
import showInvoice from '../model/apps/show-invoice.js'

const products = Report.getAllProducts();
const saleInvoices = Report.InvoicesList("sale");
const buyInvoices = Report.InvoicesList("buy");
const backOfSaleInvoices = Report.InvoicesList("back_of_sale");
const backOfBuyInvoices = Report.InvoicesList("back_of_buy");
const offlineInvoices = Report.InvoicesList("offline_sale");
const brokenInvoices = Report.InvoicesList("broken");
const subGroups = Report.subGroups();
// const showInvoice = show_invoice()
// console.log('---',products[14]);

const router = express.Router();
+
router.get("/", (req, res) => {
  // res.send("home page.....")
  console.log(req.url,req.method,'ip',req.rawHeaders[1]);

  res.render("index");
});

router.get("/get-all-products", (req, res) => {
  console.log(req.url);
  res.render("get-all-products", { products });
});

router.get("/get-all-products-subgroupe", (req, res) => {
  const subGRP = req.query;
  console.log(req.url, ">>>", subGRP.subgroupe);
  res.render("get-all-products-subgroupe", { products, subGRP });
});

router.get("/product-categories", (req, res) => {
  const subGRP = req.query;
  console.log(req.url);
  res.render("product-categories", { subGroups });
});

router.get("/invoices-list", (req, res) => {
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
  const invoiceName = req.query;
  console.log(req.url);
  // console.log(invoiceName);
  const invoiceDetail = showInvoice(invoiceName.query)
  // console.log(invoiceDetail);
  // res.send(invoiceDetail)
  res.render("show-invoice", { invoiceDetail });
});

router.get("/dkpc-detail", (req, res) => {
  console.log(req.url);
  const urlQuery = req.query;
  const dkpcForDetail = urlQuery.dkpc
  const result = Report.productByDKPCDetail(dkpcForDetail)
  // console.log(result);
  res.render("get-dkpc-detail", { result });
  // res.send(result)

});

router.get("/about-me", (req, res) => {
  // res.sendFile(path.join(__dirname,"views/about-me.html"))
  console.log(req.url);
  res.render("about-me");
});

export default router;
