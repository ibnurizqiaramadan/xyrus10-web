export const metadata = { title: "Experience" };

import { db } from "@/lib/db";
import { experiences } from "@/lib/db/schema";
import { ExperienceForm } from "./ExperienceForm";
import { asc } from "drizzle-orm";
import { requireUser } from "@/lib/auth/get-user";

export default async function ExperiencePage() {
  await requireUser();
  const allExperiences = await db.query.experiences.findMany({
    orderBy: [asc(experiences.displayOrder)],
  });
  return <ExperienceForm initialData={allExperiences} />;
}
