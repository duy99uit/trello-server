import express from "express";
import { mapOrder } from "@/utilities/sortArray";
import { connnectDatabase, listDatabases } from "@/config/mongodb";
import { env } from "@/config/environtment";
import { getDB } from "./config/mongodb";
import { BoardModel } from "@/models/board.model";

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
    let data = {
      title: "hyyy",
    };

    const newBoard = await BoardModel.createNew(data);
    console.log("newBoard", newBoard);
    res.end("<h1>Heyyyyy</h1>");
  });
  app.listen(env.APP_PORT, env.APP_HOSTNAME, () => {
    console.log(
      `Server is running at hostname ${env.APP_HOSTNAME}:${env.APP_PORT}/`
    );
  });
};
