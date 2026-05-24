"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Code } from "lucide-react"
import { Github } from "@/components/icons/BrandIcons"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  index: number
}

export function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  demoUrl,
  index,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="h-full"
    >
      <div className="glass-card rounded-[2rem] border-white/5 h-full flex flex-col overflow-hidden transition-all duration-500 hover:border-[#2b7fff]/30 hover:glow-primary group relative">
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Code className="w-6 h-6 text-[#2b7fff]" />
            </div>
            <div className="flex gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-[#2b7fff] hover:border-[#2b7fff]/40 transition-all duration-300"
                  aria-label="GitHub Repository"
                >
                  <Github width={18} height={18} />
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 text-[#2b7fff] hover:bg-[#2b7fff] hover:text-[#F8FAFC] transition-all duration-300"
                  aria-label="Live Demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 tracking-tight group-hover:text-[#2b7fff] transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-[#94A3B8] text-sm leading-relaxed font-light mb-8 flex-1">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#94A3B8] rounded-lg border border-white/5 group-hover:border-[#2b7fff]/20 transition-colors duration-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Subtle Bottom Accent */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#2b7fff] to-[#60A5FA] transition-all duration-700 opacity-50" />
      </div>
    </motion.div>
  )
}
