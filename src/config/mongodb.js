import { MongoClient } from "mongodb";
import { env } from "@/config/environtment";

let dbInstance = null;

export const connnectDatabase = async () => {
  const client = new MongoClient(env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await client.connect();
  dbInstance = client.db(env.DATABASE_NAME);
  // try {
  //   await listDatabases(client);
  //   console.log("...MongoDB has been connecting.....");
  // } finally {
  //   await client.close();
  // }
};

// Get database instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to database first");
  return dbInstance;
};

const listDatabases = async (client) => {
  const databases = await client.db().admin().listDatabases();
  // console.log("list db", databases);
  // databases.databases.forEach((item) => console.log(` - ${item.name}`));
};
