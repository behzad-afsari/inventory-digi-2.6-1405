import behzad from './modules/module-json-xlsx.js'
import BuyPrice from './buy-price.js'
// BuyPriceExcel = BuyPrice.updateBuyPrice(BuyPriceExcel,30832185,1350000)
// console.log(BuyPriceExcel);

let typeOfInvoice = ""

const invoiceToDB = ((invoiceFile) => {
    let BuyPriceExcel = BuyPrice.allProducts()
    // const typeOfInvoice = invoiceFile.split('-')[3]
    typeOfInvoice = invoiceFile.split('-')[3]
    const invoice = behzad.readXLSX('../data/invoice/' + typeOfInvoice + '/' + invoiceFile, "Sheet1")
    console.log('+',invoice[0]);
    let count = 0
    let sumInvoice = 0
    const newInvoice = invoice.map(item => {
        const newItem = {}
        newItem.name = item["نام کالا"]
        newItem.dkpc = item.dkpc
        newItem.count = item["تعداد"]
        newItem.price = item["فی"]
        // console.log(newItem.price)
        count += newItem.count
        if(newItem.price && newItem.count){
            sumInvoice += newItem.count * newItem.price
        }
        // console.log(newItem.dkpc,sumInvoice)
        // newItem.count !== 0 || parseInt(newItem.price) !== 0 ? sumInvoice += parseInt(newItem.count) * parseInt(newItem.price)  : sumInvoice +=0
        if(typeOfInvoice=='buy'){
            BuyPriceExcel = BuyPrice.updateBuyPrice(BuyPriceExcel,newItem.dkpc,newItem.price,newItem.name)
        }
        return newItem
    })
    console.log('++',newInvoice[0]);
    const invoiceData = {}
    invoiceData.invoiceName = invoiceFile
    invoiceData.date = invoiceFile.slice(0, 10)
    invoiceData.type = typeOfInvoice
    invoiceData.client = invoiceFile.split('-')[4]
    invoiceData.count = count
    invoiceData.sumInvoice=sumInvoice
    invoiceData.invoice = newInvoice
    if(typeOfInvoice=='buy'){
        BuyPrice.saveExcelBuyPrice(BuyPriceExcel)
    }
    return ({invoiceData,typeOfInvoice})
})

// const newInvoice = invoiceToDB("1402-01-31-sale-zibavash-6144421210423001")
// const dataBase = behzad.readJson('../data/stock/' + typeOfInvoice + '.json')
// dataBase.push(newInvoice.invoiceData)
// console.log(dataBase);
// behzad.writeJson('../data/stock/' + typeOfInvoice + '.json', dataBase)

// BuyPrice.saveExcelBuyPrice(BuyPriceExcel)

export default invoiceToDB