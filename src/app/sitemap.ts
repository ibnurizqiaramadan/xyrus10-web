import type { MetadataRoute } from "next";
import { getProjectData } from "@/lib/data";
import { siteOrigin } from "@/lib/site-url";

// see robots.ts: SITE_URL must be read at runtime, not inlined into the build
export const dynamic = "force-dynamic";

const SITE_URL = siteOrigin();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectData();
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified },
    // slug defaults to "" in the schema, so skip rows written before slugify()
    // landed - they have no detail page and would emit a bare /project/ loc
    ...projects
      .filter((p) => p.slug)
      .map((p) => ({ url: `${SITE_URL}/project/${p.slug}`, lastModified })),
  ];
}
