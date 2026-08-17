import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-url";

// NEXT_PUBLIC_* is inlined at build time, so the runtime environment could never
// change it. force-dynamic keeps this route out of the build-time prerender so
// the value in process.env at request time wins.
export const dynamic = "force-dynamic";

const SITE_URL = siteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /uploads is deliberately crawlable: it serves the site's own project and
      // hero images, and blocking it would drop them from image search.
      disallow: ["/admin", "/api", "/login"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
