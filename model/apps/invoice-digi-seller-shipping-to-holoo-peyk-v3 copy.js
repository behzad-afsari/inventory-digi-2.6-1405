import behzad from "./modules/module-json-xlsx.js";
// import inquirer from 'inquirer'
import log from "./modules/log-generator.js";

const invoiceDigiSellerShippingToHoloo_peyk_v3 = (faktorName) => {
  console.clear();

  console.log("\n...START...\n");

  // const excelDigi = behzad.readXLSX('../data/list-products-from-digi/BatchUpload_614442_1402_04_17_11_06', "داده ها")
  const excelDigi = behzad.readXLSX(
    "../data/list-products-from-digi/list-from-digi",
    "داده ها",
  );

  const excelHoloo = behzad.readXLSX(
    "../data/list-products-from-holoo/list-holoo",
    "Sheet1",
  );

  const faktor = behzad.readXLSX(
    "../data/invoice/sale-invoices-from-digikala/" + faktorName,
    "Sheet1",
  );
  // console.log(faktor[0]);

  const allSellerShippingData = behzad.readXLSX(
    "../data/all-seller-shipping-from-digi/all-seller-shipping-from-digi",
    "Sheet1",
  );
  // console.log("allSellerShippingData:", allSellerShippingData[0]);

  let holooCodeFound = 0;
  const newFaktor = [];
  faktor.forEach((itemFaktor) => {
    let counter = 0;
    // allSellerShippingData.forEach((item) => {
    while (allSellerShippingData.length > counter) {
      // console.log("-->", item["کد تنوع"], "---", itemFaktor["شماره سفارش"]);
      // if (item["شماره مرسوله"] === itemFaktor["شماره مرسوله"]) {
      // console.log(
      //   ">>>>>>>>>",
      //   allSellerShippingData[counter]["شماره مرسوله"],
      //   counter,
      // );
      if (
        allSellerShippingData[counter]["شماره مرسوله"] ===
        itemFaktor["شماره مرسوله"]
      ) {
        const newItem = {};
        newItem["نام کالا"] =
          allSellerShippingData[counter]["عنوان تنوع"].split("|")[0];
        newItem.dkpc = allSellerShippingData[counter]["کد تنوع"];
        newItem.dkp = allSellerShippingData[counter]["کد محصول"];
        newItem.فی = allSellerShippingData[counter]["قیمت فروش"];
        newItem["تعداد"] = allSellerShippingData[counter]["تعداد سفارش"];
        newItem["شماره مرسوله"] =
          allSellerShippingData[counter]["شماره مرسوله"];

        excelHoloo.map((itemHoloo) => {
          if (
            itemHoloo["مشخصات فني 1"]
              .toString()
              .includes(newItem.dkpc.toString())
          ) {
            // newItem['کد کالا'] = itemHoloo['كد كالا']
            newItem["کد هلو"] = itemHoloo["كد كالا"];
            // console.log(itemHoloo);
            holooCodeFound++;
          }
        });

        newFaktor.push(newItem);
        break;
      }
      counter++;
    }
    // });

    // excelHoloo.map((itemHoloo) => {
    //   if (
    //     itemHoloo["مشخصات فني 1"].toString().includes(newItem.dkpc.toString())
    //   ) {
    //     // newItem['کد کالا'] = itemHoloo['كد كالا']
    //     newItem["کد هلو"] = itemHoloo["كد كالا"];
    //     // console.log(itemHoloo);
    //     holooCodeFound++;
    //   }
    // });

    // newFaktor.push(newItem);
    // console.log(newItem);
  });
  behzad.writeXLSX("../data/invoice/sale/" + faktorName, newFaktor);
  console.log("Convert Digi Invoice to Holoo - " + faktorName);

  console.log("newFaktor:", newFaktor);
  console.log(".................");
  console.log("Faktor Count      :", faktor.length);
  console.log("New Faktor Fount  :", newFaktor.length);
  console.log("Holoo Code Found  :", holooCodeFound);
  console.log("New File          :", faktorName + ".xlsx");

  console.log("\n...FINISHED...\n");
};

// invoiceDigiSellerShippingToHoloo("1402-12-21-sale-zibavash-post")
export default invoiceDigiSellerShippingToHoloo_peyk_v3;
