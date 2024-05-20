import express from "express";
import { PORT } from "./config/server-config.js";
import run from "./config/database.js";
import bodyParser from "body-parser";
import apiroutes from "./routes/index.js";
const PrepareAndStartServer = async () => {
  const app = express();
  await run();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", apiroutes);

  app.listen(PORT, async () => {
    console.log(`server started on PORT : ${PORT}`);
  });
};
PrepareAndStartServer();
