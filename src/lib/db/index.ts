import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// The database lives in ./data (gitignored as a whole, so the -wal/-shm sidecars
// and any backup dropped beside it can never be committed by accident).
// DATABASE_PATH overrides it for deployments that keep state elsewhere.
const sqlite = new Database(process.env.DATABASE_PATH ?? "data/sqlite.db");
sqlite.pragma("journal_mode = WAL");
export const db = drizzle(sqlite, { schema });
