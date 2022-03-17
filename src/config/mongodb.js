import { MongoClient } from "mongodb";
import { env } from "@/config/environtment";


export const connnectDatabase = async () => {
  const client = new MongoClient(env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {
    await client.connect();

    await listDatabases(client);
    console.log("...MongoDB has been connecting.....");
  } finally {
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databases = await client.db().admin().listDatabases();
  // console.log("list db", databases);
  // databases.databases.forEach((item) => console.log(` - ${item.name}`));
};
