import { db } from "../src/lib/db";
import { sessions, users } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";
import { scryptSync, randomBytes } from "crypto";
import { createInterface } from "readline";

// Create an admin, or rotate an existing one's password. Insert-only was a dead end:
// there is no other way to change a password (no reset flow, no UI), so the one command
// that sets a password has to handle the user already existing.

function hashPassword(pass: string) {
  const salt = randomBytes(16).toString("hex");
  // Must stay in sync with verifyPassword() in src/lib/auth/verify.ts: "salt:hash",
  // scrypt, 64-byte key, hex. scripts/check-login.ts asserts that contract.
  return `${salt}:${scryptSync(pass, salt, 64).toString("hex")}`;
}

// Reading the password from argv leaks it into shell history and into `ps` output for
// every user on the box while the command runs. Prompting is the default; argv still
// works for scripted use, with a warning.
function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a); }));
}

async function main() {
  const [username, passFromArgv] = process.argv.slice(2);

  if (!username) {
    console.error("Usage: pnpm create-admin <username> [password]");
    console.error("Omit the password to be prompted (keeps it out of shell history).");
    process.exit(1);
  }

  if (passFromArgv) {
    console.warn("! Password passed on the command line — it is now in your shell history");
    console.warn("! and was visible in `ps` while this ran. Omit it to be prompted instead.");
  }

  const password = passFromArgv ?? (await prompt(`Password for "${username}": `));
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exit(1);
  }

  const existing = await db.query.users.findFirst({ where: eq(users.username, username) });

  if (existing) {
    await db.update(users).set({ passwordHash: hashPassword(password) }).where(eq(users.id, existing.id));
    // A rotation that leaves old sessions valid does not lock anyone out — whoever the
    // password is being rotated away from keeps their cookie. Kill them.
    const killed = await db.delete(sessions).where(eq(sessions.userId, existing.id));
    console.log(`Password rotated for "${username}" (${killed.changes} session(s) invalidated).`);
    return;
  }

  await db.insert(users).values({
    id: randomBytes(12).toString("hex"),
    username,
    passwordHash: hashPassword(password),
  });
  console.log(`Admin "${username}" created.`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
