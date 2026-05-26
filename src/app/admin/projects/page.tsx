import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectsForm } from "./ProjectsForm";
import { asc } from "drizzle-orm";

export default async function ProjectsPage() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [asc(projects.displayOrder)],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">Projects</h1>
        <p className="text-[#94A3B8]">Manage your portfolio projects showcase.</p>
      </div>

      <ProjectsForm initialData={allProjects} />
    </div>
  );
}
