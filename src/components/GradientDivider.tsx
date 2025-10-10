"use client"

import { motion, useReducedMotion } from "framer-motion"

export function GradientDivider() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="w-full py-12 overflow-hidden">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 1 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent"
      />
    </div>
  )
}
