// Pure login helpers. Deliberately NOT "use server" and free of next/*, db and any
// other bundler-only import, so scripts/check-login.ts can exercise the REAL code
// instead of a hand copy that silently drifts. Keep it that way.

import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

// Constant salt for the not-found path so a missing user costs the same KDF work as a wrong password.
const DUMMY_SALT = "0".repeat(32);

export const MAX_ATTEMPTS = 5;
export const MAX_TRACKED = 10_000;
const MAX_USERNAME = 64;
// 60s, not 15min. Without TRUST_PROXY there is no trustworthy client address, so every
// caller shares one bucket per username — which means an anonymous visitor can lock the
// sole admin out for a whole window. scrypt already caps guessing at a few tries/sec, so
// a short window keeps the limiter useful while making that lockout something the admin
// waits out instead of an outage with no in-app recovery.
export const WINDOW_MS = 60 * 1000;

/**
 * Trust boundary: FormData values are attacker-controlled and untyped. The length cap
 * is not cosmetic — username becomes a Map key held for WINDOW_MS, so an uncapped
 * string is a memory write primitive for an anonymous caller. Returns null on reject.
 */
export function credentials(username: unknown, password: unknown) {
  if (typeof username !== "string" || typeof password !== "string") return null;
  if (!username || !password || username.length > MAX_USERNAME) return null;
  return { username, password };
}

/**
 * `stored` undefined models "user not found": same KDF cost, same answer, no enumeration
 * oracle. Malformed records (no colon, empty/odd-length/non-hex) fall out as false via
 * the length check — timingSafeEqual throws on a size mismatch, which is both a 500 and
 * an oracle, so the length compare must come first.
 */
export async function verifyPassword(stored: string | undefined, password: string) {
  const [salt, hash] = stored?.split(":") ?? [];
  const loginHash = await scryptAsync(password, salt || DUMMY_SALT, 64);
  const storedHash = Buffer.from(hash ?? "", "hex");
  return stored !== undefined && storedHash.length === loginHash.length && timingSafeEqual(storedHash, loginHash);
}

// ponytail: in-memory per-process limiter; move to the existing redis client
// (src/lib/redis.ts) if this ever runs multi-instance. Exported so the check can
// inspect and reset it — nothing else should touch it except login()'s success reset.
export const attempts = new Map<string, { count: number; resetAt: number }>();

export const rateKey = (ip: string, username: string) => `${ip}:${username}`;

export function tooManyAttempts(key: string) {
  const now = Date.now();
  for (const [k, v] of attempts) {
    if (v.resetAt <= now) attempts.delete(k);
  }
  const entry = attempts.get(key);
  if (!entry) {
    // At capacity, reject rather than admit an untracked key. Returning false here
    // would let an attacker DISABLE the limiter: spray MAX_TRACKED junk usernames,
    // then guess the real one forever because its key can no longer be created.
    // Rejecting costs nothing extra — a shared bucket already locks a username after
    // MAX_ATTEMPTS, so the spray buys an attacker no reach it did not already have.
    if (attempts.size >= MAX_TRACKED) return true;
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}
