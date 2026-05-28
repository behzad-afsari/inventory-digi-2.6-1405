import excelModule from "../modules/module-json-xlsx.js";

console.time('start')
console.log('====================================================');
const holooList = excelModule.readXLSX('./anbargardani-1403-01-31/excel/all-excels','Sheet1')
// console.log(holooList[0]);

const app_products = excelModule.readXLSX('./anbargardani-1403-01-31/data/data-from-app',"Sheet1")
// console.log(app_products[0]);

// data_from_app.forEach(appProduct => {
//     holooList.map( holoo => {
//         if(appProduct['کد هلو'] == holoo['كد كالا']){
//             appProduct['شمارش انبارگردانی'] = holoo['شمارش']
//         }
//     })
// })

const newList = []
holooList.map(h_product => {
    let first = true
    app_products.map(app_product => {
        if(app_product['کد هلو'] == h_product['كد كالا']){
            if (first){
                app_product['انبارگردانی'] = h_product['شمارش']
            }
            first = false;
            newList.push(app_product)
        }
    })    
})

excelModule.writeXLSX("./anbargardani-1403-01-31/data/data-from-app-count",newList);

console.timeEnd('start')


