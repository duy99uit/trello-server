import { env } from "@/config/environtment";
import { connnectDatabase } from "@/config/mongodb";
import express from "express";

connnectDatabase()
  .then(() => console.log("...Connected to MongoDB Cluster"))
  .then(() => bootServer())
  .catch((err) => {
    console.log("...Fail to connect database...");
    process.exit();
  });

const bootServer = () => {
  const app = express();

  app.get("/", async (req, res) => {
    res.end("<h1>Heyyyyy</h1>");
  });

  app.listen(env.APP_PORT, env.APP_HOSTNAME, () => {
    console.log(
      `Server is running at hostname ${env.APP_HOSTNAME}:${env.APP_PORT}/`
    );
  });
};
