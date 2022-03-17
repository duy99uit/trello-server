import express from "express";
import { mapOrder } from "@/utilities/sortArray";
import { connnectDatabase, listDatabases } from "@/config/mongodb";
import { env } from "@/config/environtment";

const app = express();
connnectDatabase()
  .then((res) => {})
  .catch((err) => console.log("...Fail to connect database..."));

app.get("/", (req, res) => {
  res.end("<h1>Heyyyyy</h1>");
});
app.listen(env.PORT, env.HOSTNAME, () => {
  console.log(`Server is running at hostname ${env.HOSTNAME}:${env.PORT}/`);
});
