export const metadata = { title: "Projects" };

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectsForm } from "./ProjectsForm";
import { asc } from "drizzle-orm";
import { requireUser } from "@/lib/auth/get-user";

export default async function ProjectsPage() {
  await requireUser();
  const allProjects = await db.query.projects.findMany({
    orderBy: [asc(projects.displayOrder)],
  });
  return <ProjectsForm initialData={allProjects} />;
}
