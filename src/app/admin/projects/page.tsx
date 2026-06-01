import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectsForm } from "./ProjectsForm";
import { asc } from "drizzle-orm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function ProjectsPage() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [asc(projects.displayOrder)],
  });

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Projects" 
        description="Manage your portfolio projects showcase." 
      />
      <div className="px-8">
        <ProjectsForm initialData={allProjects} />
      </div>
    </div>
  );
}
