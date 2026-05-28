import behzad from "./module-json-xlsx.js"

const DATA = behzad.readJson('../../data/storeroom/products-DB-new.json')

behzad.writeJson('../../data/storeroom/products-DB.json', DATA)