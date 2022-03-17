import { env } from "@/config/environtment";
import { connnectDatabase } from "@/config/mongodb";
import express from "express";
import { apiV1 } from "@/routes/v1";

connnectDatabase()
  .then(() => console.log("...Connected to MongoDB Cluster"))
  .then(() => bootServer())
  .catch((err) => {
    console.log("...Fail to connect database...");
    process.exit();
  });

const bootServer = () => {
  const app = express();
  app.use(express.json());

  app.use("/v1", apiV1);
  app.listen(env.APP_PORT, env.APP_HOSTNAME, () => {
    console.log(
      `Server is running at hostname ${env.APP_HOSTNAME}:${env.APP_PORT}/`
    );
  });
};
