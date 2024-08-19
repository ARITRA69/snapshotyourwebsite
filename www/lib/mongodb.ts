import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_SERVER_URL);

let cached: MongoClient | null = null;

async function connect() {
  if (!cached) {
    cached = await client.connect();
  }
}

export const mongodb = Object.assign(
  client.db(process.env.MONGODB_DATABASE_NAME),
  {
    client,
    connect,
  }
);
