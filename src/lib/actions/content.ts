"use server";

import { db } from "../db";
import { hero, about, experiences, projects, contact, siteSettings } from "../db/schema";
import { eq, ne, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { invalidateCache } from "../redis";
import { slugify } from "../utils";
import { requireUser } from "../auth/get-user";

import { HeroInsert, AboutInsert, ContactInsert, ExperienceInsert, ProjectInsert } from "../types";

export async function updateHero(data: HeroInsert) {
  await requireUser();
  const existing = await db.select().from(hero).limit(1);
  if (existing.length > 0) {
    await db.update(hero).set(data).where(eq(hero.id, existing[0].id));
  } else {
    await db.insert(hero).values(data);
  }
  await invalidateCache("hero_data");
  revalidatePath("/");
  return { success: true };
}

export async function updateAbout(data: AboutInsert) {
  await requireUser();
  const existing = await db.select().from(about).limit(1);
  if (existing.length > 0) {
    await db.update(about).set(data).where(eq(about.id, existing[0].id));
  } else {
    await db.insert(about).values(data);
  }
  await invalidateCache("about_data");
  revalidatePath("/");
  return { success: true };
}

export async function updateContact(data: ContactInsert) {
  await requireUser();
  const existing = await db.select().from(contact).limit(1);
  if (existing.length > 0) {
    await db.update(contact).set(data).where(eq(contact.id, existing[0].id));
  } else {
    await db.insert(contact).values(data);
  }
  await invalidateCache("contact_data");
  revalidatePath("/");
  return { success: true };
}

// Experience and Projects would need full CRUD
export async function saveExperience(data: ExperienceInsert & { id?: number }) {
  await requireUser();
  if (data.id) {
    const { id, ...updateData } = data;
    await db.update(experiences).set(updateData).where(eq(experiences.id, id));
  } else {
    await db.insert(experiences).values(data);
  }
  await invalidateCache("experience_data");
  revalidatePath("/");
  return { success: true };
}

export async function deleteExperience(id: number) {
  await requireUser();
  await db.delete(experiences).where(eq(experiences.id, id));
  await invalidateCache("experience_data");
  revalidatePath("/");
  return { success: true };
}

async function uniqueProjectSlug(desired: string, fallback: string, excludeId?: number) {
  const base = slugify(desired) || slugify(fallback) || "project";
  let slug = base;
  let n = 2;
  // ensure no other row owns this slug
  while (true) {
    const clash = await db
      .select({ id: projects.id })
      .from(projects)
      .where(excludeId ? and(eq(projects.slug, slug), ne(projects.id, excludeId)) : eq(projects.slug, slug))
      .limit(1);
    if (clash.length === 0) return slug;
    slug = `${base}-${n++}`;
  }
}

export async function saveProject(data: ProjectInsert & { id?: number }) {
  await requireUser();
  if (data.id) {
    const { id, ...updateData } = data;
    updateData.slug = await uniqueProjectSlug(updateData.slug || updateData.title, updateData.title, id);
    await db.update(projects).set(updateData).where(eq(projects.id, id));
  } else {
    const slug = await uniqueProjectSlug(data.slug || data.title, data.title);
    await db.insert(projects).values({ ...data, slug });
  }
  await invalidateCache("project_data");
  revalidatePath("/");
  revalidatePath("/project/[slug]", "page");
  return { success: true };
}

export async function deleteProject(id: number) {
  await requireUser();
  await db.delete(projects).where(eq(projects.id, id));
  await invalidateCache("project_data");
  revalidatePath("/");
  revalidatePath("/project/[slug]", "page");
  return { success: true };
}

export async function updateSetting(key: string, value: string) {
  await requireUser();
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  if (existing.length > 0) {
    await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
  await invalidateCache(`setting_${key}`);
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
