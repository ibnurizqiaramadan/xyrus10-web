"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ProjectCard } from "@/components/ProjectCard"
import { useLanguage } from "@/lib/LanguageContext"
import { Project as ProjectType } from "@/lib/types"

export function Projects({ data }: { data: ProjectType[] }) {
  const { language } = useLanguage()

  const projects = (data || []).map(proj => ({
    ...proj,
    description: language === "id" ? proj.descriptionId : proj.descriptionEn,
    techStack: JSON.parse(proj.techStack || "[]") as string[],
    githubUrl: proj.githubUrl ?? undefined,
    demoUrl: proj.demoUrl ?? undefined,
  }));

  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionTitle
          title={language === "id" ? "Proyek Saya" : "My Projects"}
          subtitle={language === "id"
            ? "Dari sistem pertiketan hingga bot Discord - berikut beberapa proyek yang saya bangun dengan teknologi modern"
            : "From ticketing systems to Discord bots - here are some projects I've built with modern tech stacks"
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || index} {...project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
