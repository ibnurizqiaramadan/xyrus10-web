import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProjectBySlug, getProjectData } from "@/lib/data"
import { ProjectDetail } from "./ProjectDetail"

// Without this, a dynamic segment is treated as fully dynamic and never enters the full
// route cache — measured: no x-nextjs-cache header at all, so every hit paid a full React
// render. With it, these pages inherit the root layout's revalidate=60 like / does.
// dynamicParams defaults to true, so a project added in /admin after the build still
// renders on demand (and is cached from then on) rather than 404ing.
export async function generateStaticParams() {
  const projects = await getProjectData()
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }

  const description = (project.descriptionEn || project.descriptionId).slice(0, 160)
  return {
    title: `${project.title} — Ibnu Rizqia Ramadan`,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return <ProjectDetail project={project} />
}
