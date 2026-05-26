import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";
import { scryptSync, randomBytes } from "crypto";

async function createAdmin(username: string, pass: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pass, salt, 64).toString("hex");
  const passwordHash = `${salt}:${hash}`;
  const id = Math.random().toString(36).substring(2, 15);

  try {
    await db.insert(users).values({
      id,
      username,
      passwordHash,
    });
    console.log(`Admin ${username} created successfully!`);
  } catch (err) {
    console.error("Error creating admin:", err);
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: npx tsx scripts/create-admin.ts <username> <password>");
  process.exit(1);
}

createAdmin(args[0], args[1]);
