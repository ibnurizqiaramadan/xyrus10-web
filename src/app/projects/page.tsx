"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ProjectCard } from "@/components/ProjectCard"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with cart, checkout, and payment integration.",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team features.",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content generation tool using OpenAI's GPT models for marketing copy.",
    techStack: ["Next.js", "OpenAI API", "TailwindCSS", "Vercel"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
  },
  {
    title: "Real Estate Dashboard",
    description: "Modern dashboard for real estate management with analytics and property listings.",
    techStack: ["React", "Chart.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
  },
  {
    title: "Social Media Analytics",
    description: "Analytics platform for tracking social media performance across multiple platforms.",
    techStack: ["Next.js", "D3.js", "Redis", "Docker"],
    githubUrl: "https://github.com",
  },
  {
    title: "Weather Forecast App",
    description: "Beautiful weather app with forecasts, maps, and location-based suggestions.",
    techStack: ["React Native", "OpenWeather API", "Redux"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
  },
]

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Container>
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and personal projects"
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
