import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";

async function migrateToLatest() {
  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "./migrations"),
    }),
  });

  try {
    const { error, results } = await migrator.migrateToLatest();
    results?.forEach((result) => {
      console.log(result.migrationName, result.status);
    });

    if (error) {
      console.error("Migration failed:", error);
      process.exit(1);
    }
  } finally {
    await db.destroy();
  }
}

migrateToLatest();
