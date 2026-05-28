import excelModule from "../modules/module-json-xlsx.js";

console.clear();
console.time("start");

console.log("====================================================");
const holooList = excelModule.readXLSX("./anbargardani-1403-01-31/excel-final-counted-products/all-excels","Sheet1");
console.log(holooList[3]);

const dataFromApp = excelModule.readXLSX("./anbargardani-1403-01-31/data/data-from-app-count","Sheet1");
console.log(holooList[3]);

let x = 0;
const newList = [];
holooList.map((item) => {
    const itemFoundInApp = dataFromApp.find( p => item['كد كالا'] == p['کد هلو'])
    let buyPrice = 0
    itemFoundInApp ?  buyPrice = itemFoundInApp['قیمت خرید'] :  buyPrice = 0

  const SPLITES = item["مشخصات فني 1"].toString().split("-");
  const dkpcs = SPLITES.filter((item) => item != "");
  x += dkpcs.length;
  if (dkpcs.length <= 1) {
    //   newList.push(item)
    const newPRDCT = {
      name: item["نام كالا"],
      holoo: item["كد كالا"],
      dkpc: item['مشخصات فني 1'],
      buyPrice : buyPrice,
      count : item['شمارش']
    };
    newList.push(newPRDCT);
  } else {
    let stock = item['شمارش'] / dkpcs.length;
    //   console.log(x++, dkpcs, item["شمارش"], stock);
    let first = true;
    dkpcs.map((dkpc) => {
      const newPRDCT = {
        name: item["نام كالا"],
        holoo: item["كد كالا"],
        dkpc: dkpc,
        buyPrice : buyPrice
      };
      if (Number.isInteger(stock)) {
        newPRDCT.count = stock;
        newPRDCT.shomaresh = item['شمارش']
      } else {
        if (first) {
          first = false;
          newPRDCT.count = parseInt(stock) + 1;
          newPRDCT.shomaresh = item['شمارش']
        } else {
          newPRDCT.count = parseInt(stock);
        }
      }
      newList.push(newPRDCT);
    });
  }
});

console.log("++++++++++++++++++++++++++++++++++++++++++++");
console.log(newList);
console.log("exist dkpcs :", x);

excelModule.writeXLSX("./anbargardani-1403-01-31/excel-final-counted-products/all-excels-devision",newList);

console.timeEnd("start");
