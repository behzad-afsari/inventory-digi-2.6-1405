import behzad from "./modules/module-json-xlsx.js"

const generateProductListFromDigi = () => {

    const excelHoloo = behzad.readXLSX('../data/list-products-from-holoo/list-holoo', 'Sheet1')
    console.log('excelHoloo',excelHoloo[0]);
    
    const digiExcel = behzad.readXLSX("../data/list-products-from-digi/list-from-digi","داده ها");
    console.log('digiExcel',digiExcel[0]);

    let i = 0
    // const newProductList = []
    digiExcel.map(prdct=>{
        const newProduct = {}

    })

}

export default generateProductListFromDigi