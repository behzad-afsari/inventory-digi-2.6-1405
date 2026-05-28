import behzad from "../modules/module-json-xlsx.js"


const excelDigiApi = behzad.readJson('../../data/list-products-from-digi-api/product-list.json')
// console.log("🚀 ~ excelDigiApi:", excelDigiApi[0])

const excelDigi = behzad.readXLSX('../../data/list-products-from-digi/list-from-digi', "داده ها")
// console.log("🚀 ~ excelDigi:", excelDigi[0])

const data = []

excelDigiApi.map(pApi => {
    const found = excelDigi.find(p => {
        return p['کد تنوع'] == pApi.id
    })
    const newP = {
        dkpc: pApi.id,
        title : pApi.product.title,
        newPrice : pApi.price.selling_price,
        oldPrice : found? found['(ریال)قیمت فروش']: null,
        defrence: found ? pApi.price.selling_price - found['(ریال)قیمت فروش'] : null
    }
    data.push(newP)
})

console.log(data);

behzad.writeXLSX('./defrence', data)

