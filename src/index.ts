import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import { AppDataSource } from "./data-source";

import router from "./routes/index";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // Middlewares
    app.use(cors());

    // Routes
    app.use(router);

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000 to see results"
    );
  })
  .catch((error) => console.log(error));
