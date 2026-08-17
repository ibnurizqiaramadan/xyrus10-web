import { db } from "./db";
import { hero, about, experiences, projects, contact, siteSettings } from "./db/schema";
import { eq } from "drizzle-orm";
import { getCache, setCache } from "./redis";
import { Hero, About, Experience, Project, Contact } from "./types";

export async function getHeroData() {
  const cached = await getCache<Hero>("hero_data");
  if (cached) return cached;

  const data = await db.select().from(hero).limit(1);
  const result = data[0] || null;
  
  if (result) await setCache("hero_data", result);
  return result;
}

export async function getAboutData() {
  const cached = await getCache<About>("about_data");
  if (cached) return cached;

  const data = await db.select().from(about).limit(1);
  const result = data[0] || null;
  
  if (result) await setCache("about_data", result);
  return result;
}

export async function getExperienceData() {
  const cached = await getCache<Experience[]>("experience_data");
  if (cached) return cached;

  const data = await db.select().from(experiences).orderBy(experiences.displayOrder);
  
  await setCache("experience_data", data);
  return data;
}

export async function getProjectData() {
  const cached = await getCache<Project[]>("project_data");
  if (cached) return cached;

  const data = await db.select().from(projects).orderBy(projects.displayOrder);
  
  await setCache("project_data", data);
  return data;
}

export async function getProjectBySlug(slug: string) {
  const data = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return data[0] || null;
}

// Public read (root layout metadata uses it) — must stay OUT of "use server" so it is not an RPC endpoint.
export async function getSettingByKey(key: string): Promise<string | null> {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return rows[0]?.value ?? null;
}

export async function getContactData() {
  const cached = await getCache<Contact>("contact_data");
  if (cached) return cached;

  const data = await db.select().from(contact).limit(1);
  const result = data[0] || null;
  
  if (result) await setCache("contact_data", result);
  return result;
}
