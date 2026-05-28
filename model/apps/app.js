import inquirer from "inquirer";

import invoiceDigiToHoloo from "./invoice-digi-to-holoo.js";
import invoiceDigiToHolooSellerShipping from "./invoice-digi-seller-shipping-to-holoo.js";
import invoiceToDB from "./invoice-to-DB.js";
import behzad from "./modules/module-json-xlsx.js";
import newProduct from "./add-new-product-with-dkpc-to-db.js";
import myDate from "./modules/date-time.js";
import report from "./report-module.js";
import generateProductListFromHoloo from "./generate-product-DB-from-holoolist.js";
import generateProductListFromDigi from "./generate-product-DB-from-digi.js";
import invoiceBuyToHoloo from "./invoice-buy-to-holoo.js";
import fetchDataFromDigikalaAPI from "./digi-api.js";
import invoiceDigiSellerShippingToHoloo_digiexpress_v2 from "./invoice-digi-seller-shipping-to-holoo-digi_express-v2.js";
import invoiceDigiSellerShippingToHoloo_peyk_v3 from "./invoice-digi-seller-shipping-to-holoo-peyk-v3.js";

// import backupDB from './modules/backup-DB.js'
// import setting from './modules/setting.js'

const setting = behzad.readJson("./modules/setting.json");

console.clear();

//backup from database
// const backupAnswer = await inquirer.prompt([
//     {
//         type: "rawlist",
//         name: "action",
//         message: "*** Do You Whant to BackUp From (DATABASE) ? ***",
//         choices: ["Yes", "No"]
//     },
// ]);
// if (backupAnswer === "yes") {
//     console.log(backupAnswer.action);
// } else {
//     console.log(backupAnswer.action);
// }

const answer = await inquirer.prompt([
  {
    type: "rawlist",
    name: "action",
    message: "Choose One of Item?",
    choices: [
      "Faktor Digi to Holoo",
      "Faktor Digi seller shipping to Holoo",
      // "Faktor Digi seller shipping to Holoo V2",
      "Faktor (BUY) to holoo",
      "Faktor to DataBase",
      // "New Product",
      "Faktor Digi seller shipping to Holoo digiexpress V2",
      "Faktor Digi seller shipping to Holoo peyk V3",
      "generate product list from holoo",
      "generate product list from digi",
      "Report",
      "fetchDataFromDigikalaAPI",
    ],
  },
]);
// console.log(answer.action)

switch (answer.action) {
  case "Faktor Digi to Holoo":
    const faktor_Name = await inquirer.prompt([
      {
        type: "input",
        name: "faktorName",
        message: "Enter File Name (Without Extention): ",
      },
    ]);
    invoiceDigiToHoloo(faktor_Name.faktorName);
    break;

  case "Faktor Digi seller shipping to Holoo":
    const faktor_Name_Seller_Shipping = await inquirer.prompt([
      {
        type: "input",
        name: "faktorName",
        message: "Enter File Name (Without Extention): ",
      },
    ]);
    invoiceDigiToHolooSellerShipping(faktor_Name_Seller_Shipping.faktorName);
    break;

  case "Faktor Digi seller shipping to Holoo digiexpress V2":
    const faktor_name_seller_digiexpress_v2 = await inquirer.prompt([
      {
        type: "input",
        name: "faktorName",
        message: "Enter File Name (Without Extention): ",
      },
    ]);
    invoiceDigiSellerShippingToHoloo_digiexpress_v2(
      faktor_name_seller_digiexpress_v2.faktorName,
    );
    break;

  case "Faktor Digi seller shipping to Holoo peyk V3":
    const faktor_Name_Seller_Shipping_peyk_V3 = await inquirer.prompt([
      {
        type: "input",
        name: "faktorName",
        message: "Enter File Name (Without Extention): ",
      },
    ]);
    invoiceDigiSellerShippingToHoloo_peyk_v3(
      faktor_Name_Seller_Shipping_peyk_V3.faktorName,
    );
    break;

  case "Faktor (BUY) to holoo":
    const faktor_Name_buy = await inquirer.prompt([
      {
        type: "input",
        name: "faktorNameBuy",
        message: "Enter File Name (Without Extention): ",
      },
    ]);
    invoiceBuyToHoloo(faktor_Name_buy.faktorNameBuy);
    console.log(`your buy faktor is ${faktor_Name_buy.faktorNameBuy}-new.xlsx`);
    break;

  case "Faktor to DataBase":
    // const setting = behzad.readJson('./modules/setting.json')
    const newFaktorAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "faktorName",
        message: "faktorName : ",
      },
    ]);

    const newInvoice = invoiceToDB(newFaktorAnswer.faktorName);
    const typeOfInvoice = newInvoice.typeOfInvoice;
    const dataBase = behzad.readJson(
      "../data/stock/" + typeOfInvoice + ".json",
    );
    dataBase.push(newInvoice.invoiceData);
    // console.log(dataBase);
    // console.log(newInvoice.invoiceData);
    console.log(newInvoice);
    behzad.writeJson("../data/stock/" + typeOfInvoice + ".json", dataBase);
    break;

  case "New Product":
    // backupDB()
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "dkp",
        message: "dkp : ",
      },
      {
        type: "input",
        name: "dkpc",
        message: "DKPC : ",
      },
      {
        type: "input",
        name: "name",
        message: "name : ",
      },
      {
        type: "input",
        name: "holoo",
        message: "holoo : ",
      },
      {
        type: "input",
        name: "stock",
        message: "holoo : ",
      },
      // {
      //     type: "rawlist",
      //     name: "dkpc",
      //     message: "What Type Of Invoice Is?",
      //     choices: ["sale", "buy", "backOfSale", "backOfBuy", "offlineSale"]
      // },
    ]);
    // newProduct()
    // console.log(newProduct(answer.dkp, answer.dkpc, answer.name, answer.holoo));
    const newPR = newProduct(
      answer.dkp,
      answer.dkpc,
      answer.name,
      answer.holoo,
      answer.stock,
    );
    if (newPR) {
      const DB = behzad.readJson("../data/stock/products-DB.json");
      console.log(DB);
      console.log(newPR);
      DB.push(newPR);
      behzad.writeJson("../data/stock/products-DB.json", DB);
    } else {
      console.log("product was exist...");
    }
    break;

  case "Report":
    const answerReport = await inquirer.prompt([
      {
        type: "rawlist",
        name: "typeOfReport",
        message: "What Type Of Invoice Is?",
        choices: [
          "All-Product",
          "DKPC",
          "Holoo",
          "Invoices-List",
          "excel-digi",
          "subGroups",
          "product-by-dkpc-detail",
        ],
        // choices: ["All-Product", "DKPC", "Holoo", "Invoices-List", "Report one invoice"]
      },
      //  {
      //     type: 'input',
      //     name: 'role',
      //     message: 'Enter ROLE You Whant to Report for: ',
      // },
      // {
      //     type: "rawlist",
      //     name: "role",
      //     message: "Enter ROLE You Whant to Report for: ",
      //     choices: [1, 2, 3, 4, 5]
      // }
    ]);

    const fileName = myDate();
    // console.log(fileName);
    // console.log(answerReport.typeOfReport, ' > ', answerReport.role)
    switch (answerReport.typeOfReport) {
      case "All-Product":
        const answerRoleReportAll = await inquirer.prompt([
          {
            type: "rawlist",
            name: "role",
            message: "Enter ROLE You Whant to Report for: ",
            choices: [1, 2, 3, 4, 5],
          },
        ]);
        // console.log(report.getAllProducts(answerReport.role))
        behzad.writeXLSX(
          "../data/reports/" + fileName,
          report.getAllProducts(answerRoleReportAll.role),
        );
        console.log("\nreport created...");
        break;

      case "DKPC":
        const answerRoleDKPC = await inquirer.prompt([
          {
            type: "rawlist",
            name: "role",
            message: "Enter ROLE You Whant to Report for: ",
            choices: [1, 2, 3, 4, 5],
          },
        ]);
        const dkpcReport = await inquirer.prompt([
          {
            type: "input",
            name: "dkpc",
            message: "Enter DKPC for Report: ",
          },
        ]);

        console.log(report.productByDKPC(dkpcReport.dkpc, answerRoleDKPC.role));

        break;

      case "Holoo":
        const holooReport = await inquirer.prompt([
          {
            type: "input",
            name: "holooCode",
            message: "Enter ( Holoo Code) for Report: ",
          },
        ]);
        console.log(
          report.productByHolooCode(holooReport.holooCode, answerReport.role),
        );

        break;
      case "Invoices-List":
        // console.log("Report All Invoices");
        const answerReport = await inquirer.prompt([
          {
            type: "rawlist",
            name: "typeOfReport",
            message: "What Type Of Invoice Is?",
            choices: setting.typeOfInvoice,
          },
        ]);
        // console.log(report.InvoicesList(answerReport.typeOfReport));
        report.InvoicesList(answerReport.typeOfReport).map((item, i) => {
          // console.log(i,item.invoiceName,item.count,item.sum)
          console.log(i, item.date, item.client, item.count, item.sum);
          // console.log(i,item.invoiceName,item.client)
          // console.log(i,item)
        });

        break;

      //////////////////////////// excel digi
      case "excel-digi":
        console.log(report.digidata());
        break;

      case "subGroups":
        console.log(">>>", report.subGroups());
        break;

      case "product-by-dkpc-detail":
        const dkpcDetailTransaction = await inquirer.prompt([
          {
            type: "input",
            name: "dkpc",
            message: "Enter DKPC for Report: ",
          },
        ]);
        console.log(
          ">>>",
          report.productByDKPCDetail(parseInt(dkpcDetailTransaction.dkpc)),
        );
        console.log(dkpcDetailTransaction);

        break;

      // case "Report one invoice":
      //     console.log('Report one invoice');
      //     break;
    }

    break;

  case "generate product list from holoo":
    generateProductListFromHoloo();
    break;
  case "generate product list from digi":
    generateProductListFromDigi();
    break;
  case "fetchDataFromDigikalaAPI":
    await fetchDataFromDigikalaAPI();
  // const res = await fetchDataFromDigikalaAPI()
  // if (res){
  //    console.log(res);
  // }
  // default:
  //     text = "Looking forward to the Weekend";
  //     break;
}

/// برای سوال در مورد رول برای گزارش گیری یک ماژول یا کلاس نوشته شود و در قسمت ماژول ها قرارگیرد
// // سیستم لاگ برای همه قسمتها کامل شود
// بک آپ دیتابیس قبل از هر کاری گرفته شود. با ترتیب زمانی
