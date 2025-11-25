import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

// Database and Collection IDs
export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_APPWRITE_COLL_USERS!,
  LINES: process.env.NEXT_PUBLIC_APPWRITE_COLL_LINES!,
  SCHEDULES: process.env.NEXT_PUBLIC_APPWRITE_COLL_SCHEDULES!,
  LINE_SUBSCRIBERS: process.env.NEXT_PUBLIC_APPWRITE_COLL_LINE_SUBSCRIBERS!,
} as const;

export { client, account, databases };
