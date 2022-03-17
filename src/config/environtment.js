require("dotenv").config();
export const env = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOSTNAME: process.env.APP_HOSTNAME,
  APP_PORT: process.env.APP_PORT,
};
