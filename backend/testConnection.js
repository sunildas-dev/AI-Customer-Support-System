import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI);

const client = new MongoClient(process.env.MONGO_URI);

try {
  await client.connect();
  console.log("✅ Connected");
  await client.close();
} catch (err) {
  console.error(err);
}