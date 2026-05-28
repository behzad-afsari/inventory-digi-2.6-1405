import behzad from "./modules/module-json-xlsx.js";
// import inquirer from 'inquirer'
import log from "./modules/log-generator.js";

const invoiceDigiSellerShippingToHoloo_digiexpress_v2 = (faktorName) => {
  console.clear();

  console.log("\n...START...\n");

  // const excelDigi = behzad.readXLSX('../data/list-products-from-digi/BatchUpload_614442_1402_04_17_11_06', "داده ها")
  const excelDigi = behzad.readXLSX(
    "../data/list-products-from-digi/list-from-digi",
    "داده ها",
  );
  // console.log(excelDigi[0])

  const excelHoloo = behzad.readXLSX(
    "../data/list-products-from-holoo/list-holoo",
    "Sheet1",
  );
  // console.log(excelHoloo[0]);

  const faktor = behzad.readXLSX(
    "../data/invoice/sale-invoices-from-digikala/" + faktorName,
    "Sheet1",
  );
  console.log(faktor);
  // console.log('+++',faktor[0])
  // return
  let holooCodeFound = 0;
  const newFaktor = [];
  faktor.map((itemFaktor) => {
    const newItem = {};
    // excelDigi.map((digi) => {
    //     if (itemFaktor['کد تنوع'] === digi['کد تنوع']) {
    //         newItem.فی = digi['(ریال)قیمت فروش']
    //     }
    // })
    //#dkpc
    excelHoloo.map((itemHoloo) => {
      
    const title = itemFaktor["عنوان تنوع"];
    // const title = itemFaktor['عنوان']
    newItem["نام کالا"] = title.split("|")[0];
    newItem.dkpc = itemFaktor["کد تنوع"];
    newItem.dkp = itemFaktor["کد محصول"];
    newItem.فی = itemFaktor["قیمت فروش"];
    // newItem.فی = itemFaktor['قیمت واحد']
    newItem["تعداد"] = itemFaktor["تعداد سفارش"];
    // newItem['تعداد'] = itemFaktor['تعداد']
    if (
      itemHoloo["مشخصات فني 1"]
        .toString()
        .includes(itemFaktor["کد تنوع"].toString())
    ) {
      // newItem['کد کالا'] = itemHoloo['كد كالا']
      newItem["کد هلو"] = itemHoloo["كد كالا"];
      // console.log(itemHoloo);
      holooCodeFound++;
    }
  });
    newFaktor.push(newItem);
    console.log(newItem);
  });
  behzad.writeXLSX("../data/invoice/sale/" + faktorName, newFaktor);
  // log("Convert Digi Invoice to Holoo - "+faktorType.type + " - " + faktorData.faktorName + " - " + faktorData.date)
  log("Convert Digi Invoice to Holoo - " + faktorName);

  console.log(newFaktor);
  console.log(".................");
  // console.log('\n')
  console.log("Faktor Count      :", faktor.length);
  console.log("New Faktor Fount  :", newFaktor.length);
  console.log("Holoo Code Found  :", holooCodeFound);
  console.log("New File          :", faktorName + ".xlsx");

  console.log("\n...FINISHED...\n");
  /*
   */
};

// invoiceDigiSellerShippingToHoloo("1402-12-21-sale-zibavash-post")
export default invoiceDigiSellerShippingToHoloo_digiexpress_v2;
