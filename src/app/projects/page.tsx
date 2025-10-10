"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ProjectCard } from "@/components/ProjectCard"

const projects = [
  {
    title: "Bukit Pamoyanan Ticketing System",
    description: "A comprehensive ticketing system for Bukit Pamoyanan Natural Tourism in Subang. Built during internship at DSTI ITB, featuring online booking, payment integration, and visitor management.",
    techStack: ["React.js", "Node.js", "PostgreSQL", "Express"],
    githubUrl: "https://github.com",
  },
  {
    title: "Gothru Platform",
    description: "Full-stack web application at Gothru, delivering scalable solutions with modern tech stack. Focused on performance optimization and seamless user experience.",
    techStack: ["Next.js", "TypeScript", "Golang", "PostgreSQL"],
  },
  {
    title: "Real-time Collaboration Tool",
    description: "WebSocket-based real-time collaboration platform with live updates, built using modern JavaScript frameworks and Node.js backend.",
    techStack: ["React.js", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com",
  },
  {
    title: "DevOps Dashboard",
    description: "Infrastructure monitoring dashboard for Proxmox environments. Provides real-time metrics, resource management, and automated deployment workflows.",
    techStack: ["Next.js", "Golang", "Proxmox API", "Docker"],
    githubUrl: "https://github.com",
  },
  {
    title: "API Gateway Service",
    description: "High-performance API gateway built with Golang and Deno.js, handling microservices routing, authentication, and rate limiting.",
    techStack: ["Golang", "Deno.js", "Redis", "Docker"],
    githubUrl: "https://github.com",
  },
  {
    title: "Modern E-Commerce Solution",
    description: "Full-featured e-commerce platform with server-side rendering, optimized SEO, and integrated payment gateway for seamless transactions.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Stripe"],
    githubUrl: "https://github.com",
  },
]

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
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
    </main>
  )
}
