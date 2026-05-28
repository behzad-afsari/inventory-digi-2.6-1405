// console.clear()

// console.log(Date(Date.now().toString()));
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import getRoutes from "./routes/get-routes.js";

// import {logGeneral} from './model/apps/modules/log-generator.js'

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views/v1"));
// app.set("views", path.join(__dirname, "views/v2"));

app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "views/v1")));
// app.use(express.static(path.join(__dirname, "views/v2")));

app.use(getRoutes);

app.use((req, res) => {
  // const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // logGeneral(`${Date()} ${req.ip} ${req.url}`)
  // console.log(Date(),req.ip,req.url);

  // res.sendFile(path.join(__dirname, "views/404.html"));
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>انبار دیجی کالا</title>
    </head>
    <body>
      <div
        style="
          text-align: center;
          color: red;
          font-size: 30px;
          margin-top: 100px;
  
          /* top: 50%;
          /* left: 50%;  */
          /* position: absolute; */
  
          /* display: flex; */
          /* justify-content: center; */
          /* align-items: center; */
          /* height: 400px; */
          /* border: 3px solid green; */
        "
      >
        <h1>404</h1>
        <h1>page not found</h1>
        <a href="http://localhost:3030/">home</a>
      </div>
    </body>
  </html>
  `)
});



const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT} ->  http://localhost:${PORT}`);
});
