import excelModule from "../modules/module-json-xlsx.js";

// const products = excelModule.readXLSX("../../data/anbargardani-1403-01-31/data/data-from-app","Sheet1");
const products = excelModule.readXLSX("./anbargardani-1403-01-31/data/data-from-app","Sheet1");

console.log(products[0]);

console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
let a = 1;
const uniqProcucts = [];
products.map((product) => {
  const found = uniqProcucts.find(x => x.holoo == product["کد هلو"]);
  console.log('found >>>>>',found);
  if (found == undefined) {
    const newProduct = {}
    newProduct.name = product['نام کالا']
    newProduct.holoo = product["کد هلو"]
    newProduct.dkpc = product.dkpc
    newProduct.anbar = product['انبار']
    // console.log('new >    ',product);
    uniqProcucts.push(newProduct);
  }else{
    uniqProcucts.forEach(UP=>{
      if(UP.holoo == found.holoo){
        UP.anbar +=product['انبار']
      }
    })
  }
  console.log('------------------------------');
});

console.log(uniqProcucts);
console.log('length: ',uniqProcucts.length);

// excelModule.writeXLSX("../../data/anbargardani-1403-01-31/data/data-from-app-new",uniqProcucts);
excelModule.writeXLSX("./anbargardani-1403-01-31/data/data-from-app-new",uniqProcucts);
