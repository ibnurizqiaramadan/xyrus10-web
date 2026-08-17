import Redis from "ioredis";

const redisEnabled = process.env.REDIS_ENABLED === "true";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = redisEnabled ? new Redis(redisUrl, { maxRetriesPerRequest: 1 }) : null;

// ioredis emits 'error' on every failed connection attempt, and an EventEmitter
// 'error' with no listener takes the whole Node process down. Log once, then
// let the cache calls below fail closed.
let errorLogged = false;
redis?.on("error", (err: Error) => {
  if (errorLogged) return;
  errorLogged = true;
  console.error("[redis] unavailable, serving uncached:", err.message);
});
// Re-arm on reconnect, otherwise a flap or a later outage is logged exactly zero times.
redis?.on("ready", () => { errorLogged = false; });

// The `!redis` check only covers REDIS_ENABLED=false. When redis is enabled but
// unreachable the commands reject, so every call is wrapped: a dead cache must
// not 500 the public pages or fail an admin save whose DB write already landed.
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function setCache<T>(key: string, value: T, ttl = 3600) {
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch {
    // best-effort write
  }
}

export async function invalidateCache(key: string) {
  if (!redis) return;
  try {
    await redis.del(key);
  } catch {
    // ponytail: a missed invalidation serves stale content until the TTL
    // expires. Upgrade path: a retry queue, only if it ever actually happens.
  }
}
