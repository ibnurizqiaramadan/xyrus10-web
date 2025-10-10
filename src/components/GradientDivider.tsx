"use client"

import { motion } from "framer-motion"

export function GradientDivider() {
  return (
    <div className="w-full py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent"
      />
    </div>
  )
}
