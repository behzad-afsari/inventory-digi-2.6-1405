import fs from 'fs'
import xlsx from 'xlsx'
// import inquirer from 'inquirer'

// import { input } from '@inquirer/prompts';

class behzad {
    static readJson(fileName) {
        const data = fs.readFileSync(fileName, "utf-8")
        const products = JSON.parse(data)
        return products
    }

    static writeJson(filename, data) {
        data = JSON.stringify(data)
        try {
            fs.writeFileSync(filename, data, "utf-8")
            return true
        } catch (error) {
            throw new Error('can not write in file...')
        }
    }

    static readXLSX(filename, sheet) {
        const wbFaktor = xlsx.readFile(filename + ".xlsx")
        const wsFaktor = wbFaktor.Sheets[sheet]
        const data = xlsx.utils.sheet_to_json(wsFaktor)
        return data
    }

    static writeXLSX(filename, data) {
        const newWB = xlsx.utils.book_new();
        const newWS = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(newWB, newWS, 'Sheet1')
        // xlsx.writeFile(newWB, "./data/"+filename + "-new.xlsx")
        xlsx.writeFile(newWB, filename + ".xlsx")
    }

    static readXLS(filename, sheet) {
        const wbFaktor = xlsx.readFile(filename + ".xls")
        const wsFaktor = wbFaktor.Sheets[sheet]
        const data = xlsx.utils.sheet_to_json(wsFaktor)
        return data
    }

    static writeXLS(filename, data) {
        const newWB = xlsx.utils.book_new();
        const newWS = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(newWB, newWS, 'Sheet1')
        // xlsx.writeFile(newWB, "./data/"+filename + "-new.xlsx")
        xlsx.writeFile(newWB, filename + ".xls")
    }
}

export default behzad