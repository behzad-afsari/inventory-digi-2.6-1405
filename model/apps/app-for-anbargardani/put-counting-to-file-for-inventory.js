import excelModule from "../modules/module-json-xlsx.js";

console.log('====================================================');
const holooList = excelModule.readXLSX('./anbargardani-1403-01-31/excel/all-excels','Sheet1')
console.log(holooList[0]);

const data_from_app = excelModule.readXLSX('./anbargardani-1403-01-31/data/data-from-app',"Sheet1")
console.log(data_from_app[0]);

data_from_app.forEach(appProduct => {
    holooList.map( holoo => {
        if(appProduct['کد هلو'] == holoo['كد كالا']){
            appProduct['شمارش انبارگردانی'] = holoo['شمارش']
        }
    })
})

excelModule.writeXLSX("./anbargardani-1403-01-31/data/data-from-app-count",data_from_app);




