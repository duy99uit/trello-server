require("dotenv").config();
export const env = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_URL,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
}