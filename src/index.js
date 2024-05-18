import express from "express";
import { PORT } from "./config/server-config.js";
import connect from "./config/database.js";

import bodyParser from "body-parser";
const PrepareAndStartServer = async () => {
  const app = express();
  await connect();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(PORT, async () => {
    console.log(`server started on PORT : ${PORT}`);
  });
};
PrepareAndStartServer();
  