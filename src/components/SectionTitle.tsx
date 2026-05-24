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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      className="text-center mb-16 relative"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
      <h2 className="text-4xl md:text-6xl font-bold text-[#F8FAFC] mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
