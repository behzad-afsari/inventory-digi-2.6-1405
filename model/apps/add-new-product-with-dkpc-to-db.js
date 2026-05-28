// import inquirer from 'inquirer'
import behzad from './modules/module-json-xlsx.js'

const newProduct = (dkp, dkpc, name, holoo,stock) => {

    const DB = behzad.readJson('../data/stock/products-DB.json')
    // console.log(DB);

    let exist = false

    DB.map(item => {
        if (parseInt(item.dkpc) === parseInt(dkpc)) {
            exist = true
        }
    })

    // console.log(exist)

    const newitem = {}
    if (!exist) {
        newitem.dkp = dkp
        newitem.dkpc = dkpc
        newitem.name = name
        newitem.holoo = holoo
        newitem.stock = stock
        // newitem.buy = []
        // newitem.sale = []
        // newitem.backOfSale = []
        // newitem.backOfBuy = []
        // newitem.offlineSale = []
        // newitem.broken = []
    } else {
        return false
    }
    // console.log(newitem);
    return newitem
}


// const answer = await inquirer.prompt([
//     {
//         type: 'input',
//         name: 'dkp',
//         message: 'dkp : ',
//     }, {
//         type: 'input',
//         name: 'dkpc',
//         message: 'DKPC : ',
//     }, {
//         type: 'input',
//         name: 'name',
//         message: 'name : ',
//     }, {
//         type: 'input',
//         name: 'holoo',
//         message: 'holoo : ',
//     },
    // {
    //     type: "rawlist",
    //     name: "dkpc",
    //     message: "What Type Of Invoice Is?",
    //     choices: ["sale", "buy", "backOfSale", "backOfBuy", "offlineSale"]
    // },

// ]);
// console.log(newProduct.dkp, newProduct.dkpc, newProduct.name, newProduct.holoo);
// console.log(newProduct(answer.dkp, answer.dkpc, answer.name, answer.holoo));

export default newProduct