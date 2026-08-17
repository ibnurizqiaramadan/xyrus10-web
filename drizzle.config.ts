import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    // Same resolution as src/lib/db/index.ts, so db:push and db:studio can never
    // act on a different file than the app itself opens.
    url: process.env.DATABASE_PATH ?? "data/sqlite.db",
  },
});
