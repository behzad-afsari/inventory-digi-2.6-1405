import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";
import myDate from "./date-time.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logFile = path.join(__dirname, "../../log/log.txt");

const logIranDateFormat = (data) => {
  let myLog = fs.readFileSync("../log/log.txt", "utf-8");
  // let myLog = fs.readFileSync('../../log/log.txt', 'utf-8')
  const __time = myDate();
  myLog = myLog + __time + " " + data + "\n";
  fs.writeFileSync("../log/log.txt", myLog, "utf-8");
  // fs.writeFileSync('../../log/log.txt', myLog, 'utf-8')
  console.log(myLog);
};
// log('roozbeh')

const logGeneral = (data) => {
  // let myLog = fs.readFileSync('../../log/log.txt', 'utf-8')
  // console.log('__dirname >>',__dirname);
  let myLog = fs.readFileSync(logFile, "utf-8");
  // console.log(myLog);
  myLog = myLog + "\n" + data;

  fs.writeFileSync(logFile, myLog, "utf-8");
  // console.log('logged...');
};
const appendNewLineToLogFile = async (data) => {
  await fs.appendFile(logFile, "\n" + data, "utf8");
};

export default logGeneral
// export default appendNewLineToLogFile;
// export {logIranDateFormat,logGeneral}
