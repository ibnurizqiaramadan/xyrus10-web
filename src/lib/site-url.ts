// Server-only: reads process.env at request time. Deliberately not in utils.ts,
// which client components import — SITE_URL is not NEXT_PUBLIC_, so a client
// caller would silently get the fallback instead of the configured origin.

/**
 * SITE_URL is typed by a human, so it arrives wrong in three predictable ways and
 * all three fail SILENTLY — the page still renders 200 while every emitted URL is
 * garbage that crawlers discard:
 *   "xyrus10.dev"     -> URL.parse returns null
 *   "localhost:3000"  -> URL.parse SUCCEEDS, scheme becomes "localhost:" and
 *                        .origin is the *string* "null", which is truthy
 *   "https://x.dev/"  -> trailing slash doubles up in `${SITE_URL}/project/...`
 * Testing the scheme rejects the first two; .origin drops the path and the
 * trailing slash by construction.
 */
export function siteOrigin(): string {
  const parsed = URL.parse(process.env.SITE_URL ?? "");
  return parsed?.protocol === "https:" || parsed?.protocol === "http:"
    ? parsed.origin
    : "https://www.xyrus10.dev";
}
