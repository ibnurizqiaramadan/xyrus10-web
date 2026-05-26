"use server";

import { db } from "../db";
import { hero, about, experiences, projects, contact } from "../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { invalidateCache } from "../redis";

import { HeroInsert, AboutInsert, ContactInsert, ExperienceInsert, ProjectInsert } from "../types";

export async function updateHero(data: HeroInsert) {
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
  await db.delete(experiences).where(eq(experiences.id, id));
  await invalidateCache("experience_data");
  revalidatePath("/");
  return { success: true };
}

export async function saveProject(data: ProjectInsert & { id?: number }) {
  if (data.id) {
    const { id, ...updateData } = data;
    await db.update(projects).set(updateData).where(eq(projects.id, id));
  } else {
    await db.insert(projects).values(data);
  }
  await invalidateCache("project_data");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  await invalidateCache("project_data");
  revalidatePath("/");
  return { success: true };
}
