import behzad from './modules/module-json-xlsx.js'
import inquirer from 'inquirer'
import log from './modules/log-generator.js'


const invoiceDigiToHoloo = (faktorName) => {

    console.clear()

    console.log("\n...START...\n")
    // const faktor_Name = await inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'faktorName',
    //         message: 'Enter File Name (Without Extention): ',
    //     },
    // ]);
    // const faktorName = faktor_Name.faktorName

    // const excelDigi = behzad.readXLSX('../data/list-products-from-digi/BatchUpload_614442_1402_04_17_11_06', "داده ها")
    const excelDigi = behzad.readXLSX('../data/list-products-from-digi/list-from-digi', "داده ها")
    console.log(excelDigi[0])
    const excelDigiApi = behzad.readJson('../data/list-products-from-digi-api/product-list.json')
    // console.log(excelDigiApi[0])

    const excelHoloo = behzad.readXLSX('../data/list-products-from-holoo/list-holoo', 'Sheet1')
    // console.log(excelHoloo[0]);

    // const faktor = behzad.readXLSX('../data/invoice-sales/digikala-invoice/1402-03-01-a', "Sheet2")
    // console.log("*******")
    // console.log(faktorName)
    const faktor = behzad.readXLSX('../data/invoice/sale-invoices-from-digikala/' + faktorName, "Sheet1")
    // console.log(faktor[0])

    const buyPriceExcel = behzad.readXLSX('../data/buy-price', "Sheet1")


    let holooCodeFound = 0
    const newFaktor = []
    faktor.map((itemFaktor) => {
        //#price
        // console.log(itemFaktor);
        const newItem = {}
        const buyPriceFound = buyPriceExcel.find(BP => {
            return BP.dkpc === itemFaktor['کد تنوع']
        })
        // excelDigiApi.map((digi) => {
        //     if (itemFaktor['کد تنوع'] === digi.id) {
        //         // newItem.فی = digi['(ریال)قیمت فروش']
        //         newItem.فی = digi.price.selling_price
        //         newItem.buy_price = buyPriceFound ? buyPriceFound['قیمت خرید'] : 0;
        //         newItem.profit = buyPriceFound ? digi.price.selling_price-buyPriceFound['قیمت خرید'] : 0;
        //         newItem.digiPofit = buyPriceFound ? ((digi.price.selling_price-buyPriceFound['قیمت خرید'])*20)/100 : 0;
        //         newItem.purePofit = buyPriceFound ? (digi.price.selling_price-buyPriceFound['قیمت خرید']) - (((digi.price.selling_price-buyPriceFound['قیمت خرید'])*20)/100) : 0
        //     }
        // })
        excelDigi.map((digi) => {
            if (itemFaktor['کد تنوع'] === digi['کد تنوع']) {
                console.log('+++++++++++++++',digi);
                newItem.فی = digi['(ریال)قیمت فروش']
                // newItem.فی = digi.price.selling_price
                newItem.buy_price = buyPriceFound ? buyPriceFound['قیمت خرید'] : 0;
                newItem.profit = buyPriceFound ? digi['(ریال)قیمت فروش']-buyPriceFound['قیمت خرید'] : 0;
                newItem.digiPofit = buyPriceFound ? ((digi['(ریال)قیمت فروش']-buyPriceFound['قیمت خرید'])*20)/100 : 0;
                newItem.purePofit = buyPriceFound ? (digi['(ریال)قیمت فروش']-buyPriceFound['قیمت خرید']) - (((digi['(ریال)قیمت فروش']-buyPriceFound['قیمت خرید'])*20)/100) : 0
            }
        })
        //#dkpc
        excelHoloo.map((itemHoloo) => {
            if (itemHoloo['مشخصات فني 1'].toString().includes(itemFaktor['کد تنوع'].toString())) {
                // newItem['کد کالا'] = itemHoloo['كد كالا']
                newItem['کد هلو'] = itemHoloo['كد كالا']
                // console.log(itemHoloo);
                holooCodeFound++
            }
        })
        const title = itemFaktor.عنوان
        newItem['نام کالا'] = title.split('|')[0]
        // newItem['کد تنوع'] = itemFaktor['کد تنوع']
        newItem.dkpc = itemFaktor['کد تنوع']
        newItem['تعداد'] = itemFaktor['تعداد ارسالی']
        newFaktor.push(newItem)
    })

    behzad.writeXLSX('../data/invoice/sale/' + faktorName, newFaktor)
    // log("Convert Digi Invoice to Holoo - "+faktorType.type + " - " + faktorData.faktorName + " - " + faktorData.date)
    log("Convert Digi Invoice to Holoo - " + faktorName)

    console.log(newFaktor)
    console.log('.................')
    // console.log('\n')
    console.log("Faktor Count      :", faktor.length)
    console.log("New Faktor Fount  :", newFaktor.length)
    console.log('Holoo Code Found  :', holooCodeFound)
    console.log('New File          :', faktorName + ".xlsx")

    console.log("\n...FINISHED...\n")
    /*
    */
}


// invoiceDigiToHoloo("1403-06-36-sale-test")
export default invoiceDigiToHoloo