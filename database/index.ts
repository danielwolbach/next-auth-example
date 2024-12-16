import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "~/lib/environment";

export const database = drizzle(DATABASE_URL);
