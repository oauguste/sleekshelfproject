
import {KyselyAuth}  from "@auth/kysely-adapter"
import { Database } from "./interfaces";
import { Pool } from "pg";
import { PostgresDialect } from "kysely";

// Ensure you load environment variables
//require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const dialect = new PostgresDialect({ pool });

export const db = new KyselyAuth<Database>({ dialect });
