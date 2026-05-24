"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ProjectCard } from "@/components/ProjectCard"

const projects = [
  {
    title: "Bukit Pamoyanan Ticketing System",
    description: "A comprehensive ticketing system for Bukit Pamoyanan Natural Tourism in Subang. Built during internship at DSTI ITB, featuring online booking, payment integration, and visitor management.",
    techStack: ["MySQL", "C#"],
  },
  {
    title: "XyBeat - Discord Music Bot",
    description: "Advanced Discord music bot with TypeScript & discord.js v14. Features native yt-dlp integration, background download system (pre-downloads next 5 songs), real-time progress tracking, MP3 caching, Redis queue persistence with crash recovery, and smart voice management. Supports YouTube playlists, mixes, and concurrent downloading (2-3 songs per server).",
    techStack: ["TypeScript", "Discord.js v14", "yt-dlp", "FFmpeg", "Redis", "Node.js"],
    githubUrl: "https://github.com/ibnurizqiaramadan/xybeat",
    // demoUrl: "https://github.com/ibnurizqiaramadan/xybeat",  
  },
  {   
    title: "Face Clustering with GPU",
    description: "High-performance face clustering application using InsightFace + FAISS GPU. Features dual GPU parallel processing with 2.45 img/s throughput (207% faster than CPU). Automatically groups photos by faces with Redis caching and bounding box visualization.",
    techStack: ["Python", "InsightFace", "FAISS GPU", "Redis", "OpenCV"],
    githubUrl: "https://github.com/ibnurizqiaramadan/face-grouping",
    // demoUrl: "https://github.com/ibnurizqiaramadan/face-grouping",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionTitle
          title="My Projects"
          subtitle="From ticketing systems to DevOps dashboards - here are some projects I've built with modern tech stacks"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
