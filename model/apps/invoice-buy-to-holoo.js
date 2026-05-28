 import behzad from "./modules/module-json-xlsx.js"


// import path from "path"
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

const invoiceBuyToHoloo = (fileName) => {

    const excelHoloo = behzad.readXLSX('../data/list-products-from-holoo/list-holoo', 'Sheet1')
    // console.log(excelHoloo);
    console.log(excelHoloo[0]);
    // const fileName = "1402-05-24-buy-Omid-169"

    const invoice = behzad.readXLSX('../data/invoice/buy/' + fileName, 'Sheet2')
    console.log(invoice[0]);

    const newInvoice = []
    let i = 0
    invoice.map(item => {
        const dkpc = item.dkpc.toString()
        // console.log("dkpc:", dkpc);
        // console.log("ddd:", typeof dkpc);
        // console.log('>>>',dkpc);
        excelHoloo.map(holoo => {
            const dkpcHoloo = holoo['مشخصات فني 1'].toString()
            // console.log("==>",dkpcHoloo);
            // if(holoo['مشخصات فني 1'].toString().includes(item.dkpc).toString()){
            // if (holoo['مشخصات فني 1'].includes(dkpc)) {
            if (dkpcHoloo.includes(dkpc)) {
                // console.log(i++, "hello");
                console.log(item);
                // const newProduct = {}
                item['کد هلو'] = holoo['كد كالا']
                // item["قیمت خرید"] = holoo["ميانگين خريد"]
                // item['aaa'] = "aaa"
            }
        })
        newInvoice.push(item)
    })
    console.log(newInvoice);
    console.log(i);

    behzad.writeXLSX('../data/invoice/buy/' + fileName + '-new', newInvoice)
    // console.log(`file ${fileName}-new.xlsx created`);
}

export default invoiceBuyToHoloo
