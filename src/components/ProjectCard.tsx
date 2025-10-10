"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

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
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      className="h-full"
    >
      <Card className="glass-card border-white/10 h-full flex flex-col transition-all duration-300 hover:border-[#4F46E5]/50 hover:glow-primary group">
        <CardHeader>
          <CardTitle className="text-2xl text-[#F8FAFC] group-hover:text-[#4F46E5] transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-[#94A3B8]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-[#4F46E5]/10 text-[#4F46E5] rounded-full border border-[#4F46E5]/20"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {githubUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 bg-white/5 border-white/10 hover:bg-[#4F46E5]/20 hover:border-[#4F46E5]/50"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {demoUrl && (
              <Button
                asChild
                size="sm"
                className="flex-1 bg-[#4F46E5] hover:bg-[#4F46E5]/80"
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
