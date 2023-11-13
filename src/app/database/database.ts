import { Database } from "./interfaces";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

// Ensure you load environment variables
//require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<Database>({ dialect });
