// Self-check for the login security logic. Run: pnpm check  (npx tsx scripts/check-login.ts)
//
// These are the REAL functions from src/lib/auth/verify.ts, not a copy. If a guard is
// deleted from the shipped module, this file fails. That is the entire point — the
// previous .mjs version asserted against a hand copy and passed no matter what shipped.

import assert from "node:assert/strict";
import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import {
  attempts,
  credentials,
  rateKey,
  tooManyAttempts,
  verifyPassword,
  MAX_ATTEMPTS,
  MAX_TRACKED,
} from "../src/lib/auth/verify";

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

const checks: [string, () => unknown][] = [];
const check = (name: string, fn: () => unknown) => checks.push([name, fn]);

async function makeHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${(await scryptAsync(password, salt, 64)).toString("hex")}`;
}

check("correct password verifies, wrong password does not", async () => {
  const stored = await makeHash("correct-horse");
  assert.equal(await verifyPassword(stored, "correct-horse"), true);
  assert.equal(await verifyPassword(stored, "wrong-horse"), false);
  assert.equal(await verifyPassword(stored, ""), false);
});

check("nonexistent user and wrong password are indistinguishable", async () => {
  const stored = await makeHash("correct-horse");
  const missing = await verifyPassword(undefined, "anything");
  const wrong = await verifyPassword(stored, "wrong-horse");
  assert.equal(missing, wrong, "user enumeration oracle: the two answers differ");
  assert.equal(missing, false);
});

check("malformed stored hash returns invalid instead of throwing", async () => {
  // timingSafeEqual throws on a length mismatch — a 500 here is both a crash and an oracle.
  const malformed = [
    "no-colon-at-all",
    "",
    ":",
    "salt:", // empty hex
    "salt:abc", // odd-length hex
    "salt:zzzz", // non-hex
    "salt:" + "ab".repeat(63), // right shape, wrong length
    "salt:" + "ab".repeat(65), // too long
  ];
  for (const stored of malformed) {
    assert.equal(await verifyPassword(stored, "whatever"), false, `threw or passed on: ${JSON.stringify(stored)}`);
  }
});

check("credential guard rejects junk and caps the username length", () => {
  // The cap matters because username becomes a Map key held for the whole window.
  assert.deepEqual(credentials("admin", "pw"), { username: "admin", password: "pw" });
  assert.ok(credentials("a".repeat(64), "pw"));
  assert.equal(credentials("a".repeat(65), "pw"), null);
  assert.equal(credentials("x".repeat(10 * 1024 * 1024), "pw"), null, "10MB username would be retained for the window");
  assert.equal(credentials("", "pw"), null);
  assert.equal(credentials("admin", ""), null);
  assert.equal(credentials(null, "pw"), null);
  assert.equal(credentials(["admin"], "pw"), null);
});

check("limiter trips after MAX_ATTEMPTS and a successful login resets it", () => {
  attempts.clear();
  const key = rateKey("1.2.3.4", "admin");
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    assert.equal(tooManyAttempts(key), false, `tripped early on attempt ${i + 1}`);
  }
  assert.equal(tooManyAttempts(key), true, "did not trip after MAX_ATTEMPTS");

  // login() deletes the key it counted on success. If the key shape drifts between the
  // two, the admin locks themselves out after MAX_ATTEMPTS good logins.
  attempts.delete(key);
  assert.equal(tooManyAttempts(key), false, "success did not reset the counter");
  assert.equal(attempts.size, 1);
});

check("two keys do not share a counter", () => {
  attempts.clear();
  const attacker = rateKey("6.6.6.6", "admin");
  const admin = rateKey("10.0.0.2", "admin");

  for (let i = 0; i < MAX_ATTEMPTS; i++) tooManyAttempts(attacker);
  assert.equal(tooManyAttempts(attacker), true, "attacker was never limited");
  assert.equal(tooManyAttempts(admin), false, "account-lockout DoS: attacker locked out the real admin");
});

check("filling the map to capacity does NOT reset an existing counter", () => {
  // Regression guard: attempts.clear() at the cap was a reset primitive — 10k distinct
  // usernames down one socket zeroed every counter, the attacker's included.
  attempts.clear();
  const victim = rateKey("6.6.6.6", "admin");
  for (let i = 0; i < MAX_ATTEMPTS; i++) tooManyAttempts(victim);
  assert.equal(tooManyAttempts(victim), true, "did not trip before the spray");

  for (let i = 0; i < MAX_TRACKED + 50; i++) tooManyAttempts(rateKey("6.6.6.6", `u${i}`));

  assert.ok(attempts.size <= MAX_TRACKED, `map grew past the cap: ${attempts.size}`);
  assert.ok(attempts.has(victim), "the spray evicted an active counter");
  assert.equal(tooManyAttempts(victim), true, "the spray reset the limiter");
});

check("a full map does NOT admit an untracked key (spray THEN attack)", () => {
  // The ordering an attacker actually uses, and the one the check above missed: fill the
  // map with junk FIRST, so the victim's key has never been created. If the cap branch
  // returns false the key can never be tracked and every guess is allowed forever —
  // i.e. the limiter is switched off by anyone willing to send MAX_TRACKED requests.
  attempts.clear();
  for (let i = 0; i < MAX_TRACKED; i++) tooManyAttempts(rateKey("6.6.6.6", `junk${i}`));
  assert.equal(attempts.size, MAX_TRACKED, "spray did not fill the map");

  const unseen = rateKey("untrusted", "admin");
  assert.ok(!attempts.has(unseen), "victim key should not exist yet");
  assert.equal(tooManyAttempts(unseen), true, "full map admitted an untracked key: limiter is bypassable");
});

// main() rather than top-level await: package.json has no "type": "module", so tsx
// compiles this to CJS. Same shape as scripts/seed.ts.
async function main() {
  let failed = 0;
  for (const [name, fn] of checks) {
    try {
      await fn();
      console.log(`ok   ${name}`);
    } catch (err) {
      failed++;
      console.log(`FAIL ${name}\n     ${(err as Error).message}`);
    }
  }
  console.log(`\n${checks.length - failed}/${checks.length} passed`);
  process.exit(failed ? 1 : 0);
}

main();
