import excelModule from "../modules/module-json-xlsx.js";
console.time('start')

console.clear()
console.log('====================================================');
const holooList = excelModule.readXLSX('./anbargardani-1403-01-31/excel/all-excels','Sheet1')
console.log(holooList[0]);

const divisionList = excelModule.readXLSX('./anbargardani-1403-01-31/data/data-from-app-count-division',"Sheet1")
console.log(divisionList[11]);
let all = 0
let x,y = 0
const newList = []
holooList.map(anbargardani => {
    const filterd = divisionList.filter(div=>{
        return anbargardani['كد كالا'] == div['کد هلو']
    })
    // console.log(filterd);
    let filterdCount = 0
    filterd.map(item=>{
        filterdCount = filterdCount + item['انبارگردانی']
    })
    if (filterdCount != anbargardani['انبارگردانی']){
        y++
        console.log(anbargardani);
        anbargardani.count = filterdCount
        newList.push(anbargardani)
    }
    if(filterd.length == 0) x++ 
    // console.log(all++, '--------------------');
})
console.log(x,y);

excelModule.writeXLSX("./anbargardani-1403-01-31/data/defrence",newList);
console.timeEnd('start')
