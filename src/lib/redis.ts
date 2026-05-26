import Redis from "ioredis";

const redisEnabled = process.env.REDIS_ENABLED === "true";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = redisEnabled ? new Redis(redisUrl) : null;

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function setCache<T>(key: string, value: T, ttl = 3600) {
  if (!redis) return;
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

export async function invalidateCache(key: string) {
  if (!redis) return;
  await redis.del(key);
}
