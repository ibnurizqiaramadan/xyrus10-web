"use client"

import { motion, useReducedMotion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
