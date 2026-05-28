import excelModule from "../modules/module-json-xlsx.js";

console.clear()

console.time('start')
console.log('====================================================');
const holooList = excelModule.readXLSX('./anbargardani-1403-01-31/excel/all-excels','Sheet1')
console.log(holooList[0]);

const app_products = excelModule.readXLSX('./anbargardani-1403-01-31/data/data-from-app',"Sheet1")
console.log(app_products[11]);

console.log('++++++++++++++++++++++++++++++++++++++++++++');

const newList = []
holooList.map(h_product => {
    const productsFound = app_products.filter(app_product => {
        return app_product['کد هلو'] == h_product['كد كالا']
    })
    if(productsFound.length > 0){
        if (productsFound.length > 1){ 
            console.log(productsFound.length);
            const division = h_product['شمارش'] / productsFound.length
            productsFound.forEach( prdct=> {
                prdct['انبارگردانی'] = parseInt(division)
            })
            if(!Number.isInteger(division)){
                productsFound[0]['انبارگردانی'] ++
            }
        }else{
            console.log(productsFound.length);
            productsFound[0]['انبارگردانی'] = h_product['شمارش']
        }
        
        productsFound.map(newP => {
            console.log(newP);
            newList.push(newP)
        })
    }
})

excelModule.writeXLSX("./anbargardani-1403-01-31/data/data-from-app-count-division",newList);

console.timeEnd('start')


