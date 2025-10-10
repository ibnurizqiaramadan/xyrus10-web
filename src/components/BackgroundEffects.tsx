"use client"

import { motion } from "framer-motion"

export function BackgroundEffects() {
  const orbs = [
    { size: 300, delay: 0, duration: 20, x: "10%", y: "20%" },
    { size: 400, delay: 2, duration: 25, x: "80%", y: "70%" },
    { size: 250, delay: 4, duration: 22, x: "60%", y: "30%" },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${
              index % 2 === 0 ? "#4F46E5" : "#22D3EE"
            } 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 0, 100, 0],
            scale: [1, 1.2, 1, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
