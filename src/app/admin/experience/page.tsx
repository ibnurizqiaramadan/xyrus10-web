import { db } from "@/lib/db";
import { experiences } from "@/lib/db/schema";
import { ExperienceForm } from "./ExperienceForm";
import { asc } from "drizzle-orm";

export default async function ExperiencePage() {
  const allExperiences = await db.query.experiences.findMany({
    orderBy: [asc(experiences.displayOrder)],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">Experience</h1>
        <p className="text-[#94A3B8]">Manage your professional work history.</p>
      </div>

      <ExperienceForm initialData={allExperiences} />
    </div>
  );
}
