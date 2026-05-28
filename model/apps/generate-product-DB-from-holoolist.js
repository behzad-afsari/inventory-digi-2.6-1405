import behzad from "./modules/module-json-xlsx.js"

const generateProductListFromHoloo = () => {
    const excelHoloo = behzad.readXLSX('../data/list-products-from-holoo/list-holoo', 'Sheet1')
    // console.log(excelHoloo);
    let i = 1
    const newProductList = []
    excelHoloo.map(item => {
        const parts1 = item['مشخصات فني 1'].split('-')
        // console.log(item,parts);
        // console.log(parts);
        const parts2 = []
        parts1.forEach(element => {
            element!=="" ? parts2.push(element) : i //console.log("***");
        });
        
        parts2.map(x => {
            const newProduct = {}
            // console.log(i, ">>", x);
            // if (x !== "") {
            if (x !== "") {
                newProduct.id = i++
                newProduct['گروه اصلي'] = item['گروه اصلي']
                newProduct['گروه فرعي'] = item['گروه فرعي']
                newProduct['نام كالا'] = item['نام كالا']
                newProduct['كد هلو'] = item['كد كالا']
                newProduct['موجودی'] = item['موجودي']
                newProduct['میانگین خرید'] = item['ميانگين خريد']
                newProduct['توضيحات'] = item['توضيحات']
                newProduct['آخرين في خريد'] = item['آخرين في خريد']
                newProduct['فی فروش'] = item['في فروش']
                newProduct['آخرین فی خرید'] = item['آخرين في خريد']
                newProduct['موجودی اول دوره'] = item['موجودي اول دوره']
                newProduct['درصد تخفیف'] = item['درصد تخفيف']
                newProduct['تعداد فروش*فی میانگین'] = item['تعداد*في ميانگين']
                newProduct['تعداد*فی فروش'] = item['تعداد * في فروش']
                newProduct['تعداد*آخرین فی خرید'] = item['تعداد*آخرين في خريد']
                newProduct['تعداد*فی اول دوره'] = item['تعداد*في اول دوره']
                newProduct.dkpc = x
                //   خط فاصله ها در کدهای مشخصات فنی مشکل ایجاد میکند. خط فاطله ای که بعد یاقبلش (احتمالا) عدد نباشد مشکل ایجاد میکند. مثلا خط فاصله خالی 2 بار آبجکت ایجاد میکند و خط فاصله ای که بعدش عددی نیست هم یک آبجکت خالی ایجاد میکند
                // newProduct.dkpc = item['مشخصات فني 1']
                newProduct['آخرین تاریخ خرید'] = item['آخرين تاريخ خريد']
                newProduct['آخرین تاریخ فروش'] = item['آخرين تاريخ فروش']
                newProduct['جمع تعداد خرید'] = item['جمع تعداد خريد']
                newProduct['جمع تعداد فروش'] = item['جمع تعداد فروش']
                newProduct['جمع قیمت خرید'] = item['جمع قيمت خريد']
                newProduct['جمع قیمت فروش'] = item['جمع قيمت فروش']
                newProduct['واحدهای کالا'] = item['واحد هاي کالا']
                newProduct['آخرین قیمت خرید فاکتور'] = item['آخرين قيمت خريد فاکتور']
                newProduct['آخرین قیمت فروش فاکتور'] = item['آخرين قيمت فروش فاکتور']
                newProduct['بالاترین قیمت فروش'] = item['بالاترين قيمت فروش']
                newProduct['پایین ترین قیمت فروش'] = item['پايين ترين قيمت فروش']
                // newProduct[''] = item['']
            }
            newProductList.push(newProduct)
        })
    })
    // console.log(newProductList);

    behzad.writeJson('../data/stock/products-DB.json', newProductList)
}
// generateProductListFromHoloo()

export default generateProductListFromHoloo