// console.clear()

// console.log(Date(Date.now().toString()));
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import getRoutes from "./routes/get-routes-v2.js";

// import {logGeneral} from './model/apps/modules/log-generator.js'

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views/v1"));
app.set("views", path.join(__dirname, "views/v2"));

app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "views/v1")));
app.use(express.static(path.join(__dirname, "views/v2")));

app.use(getRoutes);

app.use((req, res) => {
  // const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // logGeneral(`${Date()} ${req.ip} ${req.url}`)
  // console.log(Date(),req.ip,req.url);

  res.sendFile(path.join(__dirname, "views/404.html"));
});



const PORT = 3031;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT} ->  http://localhost:${PORT}`);
});
