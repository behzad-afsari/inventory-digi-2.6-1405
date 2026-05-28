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

  const uniqAllSellerShippingData = [
    ...new Map(
      allSellerShippingData.map((item) => [
        `${item["شماره مرسوله"]}-${item["کد تنوع"]}`,
        item,
      ]),
    ).values(),
  ];
  console.log(
    "🚀 ~ invoiceDigiSellerShippingToHoloo_peyk_v3 ~ uniqAllSellerShippingData:",
    // uniqAllSellerShippingData,
    // uniqAllSellerShippingData,
    // typeof uniqAllSellerShippingData,
    uniqAllSellerShippingData.length,
  );

  let holooCodeFound = 0;
  const newFaktor = [];
  faktor.forEach((itemFaktor) => {
    let counter = 0;
    uniqAllSellerShippingData.forEach((item) => {
      // console.log("-->", item["کد تنوع"], "---", itemFaktor["شماره سفارش"]);
      // if (item["شماره مرسوله"] === itemFaktor["شماره مرسوله"]) {
      // console.log(
      //   ">>>>>>>>>",
      //   allSellerShippingData[counter]["شماره مرسوله"],
      //   counter,
      // );
      if (item["شماره مرسوله"] === itemFaktor["شماره مرسوله"]) {
        const newItem = {};
        newItem["نام کالا"] = item["عنوان تنوع"].split("|")[0];
        newItem.dkpc = item["کد تنوع"];
        newItem.dkp = item["کد محصول"];
        newItem.فی = item["قیمت فروش"];
        newItem["تعداد"] = item["تعداد سفارش"];
        newItem["شماره مرسوله"] = item["شماره مرسوله"];

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
      }
      counter++;
    });

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
