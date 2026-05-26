import { db } from "../src/lib/db";
import { users, sessions, hero, about, experiences, projects, contact, socialLinks } from "../src/lib/db/schema";

async function main() {
  console.log("Truncating all tables...");

  try {
    // Order matters if there are foreign keys, though SQLite is lenient unless PRAGMA foreign_keys = ON
    await db.delete(sessions);
    await db.delete(users);
    await db.delete(hero);
    await db.delete(about);
    await db.delete(experiences);
    await db.delete(projects);
    await db.delete(contact);
    await db.delete(socialLinks);

    console.log("✅ All tables truncated successfully!");
  } catch (error) {
    console.error("❌ Truncate failed:", error);
    process.exit(1);
  }
}

main();
