import { db } from "@/lib/db";
import { experiences } from "@/lib/db/schema";
import { ExperienceForm } from "./ExperienceForm";
import { asc } from "drizzle-orm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function ExperiencePage() {
  const allExperiences = await db.query.experiences.findMany({
    orderBy: [asc(experiences.displayOrder)],
  });

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Experience" 
        description="Manage your professional work history." 
      />
      <div className="px-8">
        <ExperienceForm initialData={allExperiences} />
      </div>
    </div>
  );
}
