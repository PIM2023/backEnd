import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";

import router from "./routes/index";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    // Middlewares
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cors());

    // Configurar Express para servir archivos estáticos desde la carpeta 'uploads'
    app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));

    // Routes
    app.use(router);

    // start express server
    app.listen(process.env.PORT || 3000);

    console.log(
      `Express server has started on port ${process.env.PORT || 3000}. Open ${
        process.env.SERVER_URL
      } to see results`
    );
  })
  .catch((error) => console.log(error));
