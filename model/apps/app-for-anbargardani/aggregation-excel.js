import excelModule from "../modules/module-json-xlsx.js";

// const files = ['otti','borjoa']
const files = ['gelete']
const files___ = [
"accesory",
"ador",
"badalijat",
"bazari-motafhreghe",
"bell",
"borjoa",
"deepromance",
"doroco",
"eilmaaz",
"elaro",
"everbeauty",
"fa",
"farmaci",
"feloderm",
"flormar",
"gabrini",
"garnieh",
"gelete",
"goldenrose",
"izadora",
"jordana",
"kif",
"ladyspice",
"loreal-spray",
"loreal",
"manhatan",
"maryange",
"mask-moo",
"mavee",
"melina",
"meybelin",
"mijlar",
"mojhe",
"moobar",
"motafaregh",
"nivea",
"ogx",
"oldspice",
"otti",
"pad",
"pierland",
"revoloushen",
"riemel",
"scrab",
"secret",
"sensodine",
"terezmeh",
"tohika",
"worship",
"yourn"
]

const products = []
let counnter = 1
files.map( fileName =>{
    const fileData = excelModule.readXLS('./anbargardani-1403-01-31/excel/' + fileName , fileName)
    console.log(counnter++ , fileName ,fileData.length);
    fileData.map(product=>{
        products.push(product)
    })
})

excelModule.writeXLS('./anbargardani-1403-01-31/excel/all-excels-G',products)

