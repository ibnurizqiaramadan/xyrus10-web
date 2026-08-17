export const metadata = { title: "Hero" };

import { db } from "@/lib/db";
import { hero } from "@/lib/db/schema";
import { HeroForm } from "./HeroForm";
import { requireUser } from "@/lib/auth/get-user";

export default async function AdminHeroPage() {
  await requireUser();
  const data = await db.select().from(hero).limit(1);
  return <HeroForm initialData={data[0] ?? null} />;
}
