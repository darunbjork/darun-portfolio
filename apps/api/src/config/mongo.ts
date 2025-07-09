import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;

if (!uri) throw new Error('MONGO_URI is not defined in .env');

const client = new MongoClient(uri);

export const connectMongo = async () => {
  await client.connect();
  return client.db(); // returns `darun_dev` or similar
};
