/**
 * lib/db.ts
 * MongoDB connection helper for Next.js Route Handlers / Server Components.
 *
 * Uses a global cached client to avoid reconnecting on every invocation (serverless-friendly).
 * Reads the connection string from process.env.MONGODB_URI or process.env.MongoClient.
 */

import { MongoClient, Db } from 'mongodb';

const rawUri = process.env.MONGODB_URI || process.env.MongoClient;
if (!rawUri) {
  throw new Error('Missing MongoDB connection string. Set MONGODB_URI or MongoClient in environment.');
}
const uri: string = rawUri;

let cached: {
  client: MongoClient | null;
  db: Db | null;
} = (global as any)._mongo || { client: null, db: null };

export async function connectToDatabase() {
  if (cached.client && cached.db) {
    return { client: cached.client, db: cached.db };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('FORM_SUBMISSIONS');

  cached = { client, db };
  (global as any)._mongo = cached;

  return { client, db };
}

export async function closeDatabase() {
  if (cached.client) {
    try {
      await cached.client.close();
      cached = { client: null, db: null };
      (global as any)._mongo = cached;
    } catch (err) {
      console.error('Error closing MongoDB connection', err);
      throw err;
    }
  }
}
