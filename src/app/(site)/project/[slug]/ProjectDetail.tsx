"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ExternalLink, Code } from "lucide-react"
import { Github } from "@/components/icons/BrandIcons"
import { Container } from "@/components/Container"
import { useLanguage } from "@/lib/LanguageContext"
import { Project } from "@/lib/types"

export function ProjectDetail({ project }: { project: Project }) {
  const { language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const description =
    language === "id" ? project.descriptionId : project.descriptionEn
  const techStack: string[] = (() => {
    try {
      return JSON.parse(project.techStack || "[]")
    } catch {
      return []
    }
  })()

  const t = {
    back: language === "id" ? "Kembali ke Proyek" : "Back to Projects",
    tech: language === "id" ? "Teknologi" : "Tech Stack",
    overview: language === "id" ? "Tentang Proyek" : "Overview",
    source: language === "id" ? "Lihat Kode" : "View Source",
    demo: language === "id" ? "Live Demo" : "Live Demo",
  }

  return (
    <main className="min-h-dvh pt-24 pb-24">
      <Container className="max-w-3xl">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#94A3B8] hover:text-[#2b7fff] transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>

          {project.imageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 mb-10 glass-card">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center mb-8">
              <Code className="w-8 h-8 text-[#2b7fff]" />
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-[#F8FAFC] tracking-tight mb-6">
            {project.title}
          </h1>

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#94A3B8] rounded-lg border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#2b7fff] mb-3">
            {t.overview}
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed font-light whitespace-pre-line mb-12">
            {description}
          </p>

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F8FAFC] hover:border-[#2b7fff]/40 hover:text-[#2b7fff] transition-all duration-300 text-sm font-medium"
                >
                  <Github width={18} height={18} />
                  {t.source}
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b7fff] to-[#60A5FA] text-[#F8FAFC] hover:opacity-90 transition-all duration-300 text-sm font-medium glow-primary"
                >
                  <ExternalLink size={18} />
                  {t.demo}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </Container>
    </main>
  )
}
