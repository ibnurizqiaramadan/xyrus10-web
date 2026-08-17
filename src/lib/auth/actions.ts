"use server";

import { lucia } from "./auth";
import { attempts, credentials, MAX_ATTEMPTS, rateKey, tooManyAttempts, verifyPassword, WINDOW_MS } from "./verify";
import { redis } from "../redis";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// The in-memory limiter in verify.ts is per-PROCESS, so N pm2 cluster workers give an
// attacker N * MAX_ATTEMPTS guesses per window (measured: 5/10/20 at -i 1/2/4). Redis
// makes the counter shared, which is what makes clustering safe. Without Redis this
// falls back to the Map — correct for a single process, and the only honest option.
// A Redis error falls back too: a dead cache must never disable the limiter entirely.
async function rateLimited(key: string) {
  if (!redis) return tooManyAttempts(key);
  try {
    const n = await redis.incr(`login:${key}`);
    if (n === 1) await redis.pexpire(`login:${key}`, WINDOW_MS);
    return n > MAX_ATTEMPTS;
  } catch {
    return tooManyAttempts(key);
  }
}

async function clearLimit(key: string) {
  attempts.delete(key);
  if (redis) await redis.del(`login:${key}`).catch(() => {});
}

export async function login(formData: FormData) {
  const creds = credentials(formData.get("username"), formData.get("password"));
  if (!creds) {
    return { error: "Username and password required" };
  }
  const { username, password } = creds;

  // Keying on username alone lets anyone lock the only admin out for WINDOW_MS with
  // 6 garbage requests, so the client address is part of the key when we have one.
  // Rightmost entry only: a proxy APPENDS the real peer, so the leftmost entries are
  // whatever the client forged.
  // ponytail: without TRUST_PROXY=true there is no trustworthy client address, so every
  // request shares one bucket per username. That fails CLOSED — more rate-limiting, not
  // less — and the alternative (trusting a client-supplied header) means no limiter at
  // all. Upgrade path: a WAF, or a proxy that OVERWRITES x-forwarded-for rather than
  // appending, then set TRUST_PROXY=true.
  const xff = process.env.TRUST_PROXY === "true"
    ? (await headers()).get("x-forwarded-for")?.split(",").pop()?.trim()
    : null;
  const key = rateKey(xff || "untrusted", username);

  if (await rateLimited(key)) {
    return { error: "Too many attempts, try again later" };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  // verifyPassword() already spends the same KDF work when the user does not exist —
  // the !existingUser half is only there to narrow the type, never a short-circuit.
  const verified = await verifyPassword(existingUser?.passwordHash, password);
  if (!existingUser || !verified) {
    return { error: "Invalid username or password" };
  }

  // Must be the same key rateLimited() counted, or a real admin locks themselves
  // out after MAX_ATTEMPTS successful logins. scripts/check-login.ts covers this.
  await clearLimit(key);

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  // redirect() throws a control-flow error on purpose — keep it out of any try/catch.
  redirect("/admin");
}

export async function logout() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
  if (!sessionCookie) return;

  const { session } = await lucia.validateSession(sessionCookie.value);
  if (session) {
    await lucia.invalidateSession(session.id);
  }

  const blankCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  redirect("/login");
}
