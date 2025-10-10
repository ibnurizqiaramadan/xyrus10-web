"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export function BackgroundEffects() {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const orbs = [
    { size: 300, delay: 0, duration: 20, x: "10%", y: "20%" },
    { size: 400, delay: 2, duration: 25, x: "80%", y: "70%" },
    { size: 250, delay: 4, duration: 22, x: "60%", y: "30%" },
  ]

  // Disable heavy animations on mobile or when user prefers reduced motion
  const shouldAnimate = !shouldReduceMotion && !isMobile

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20 md:blur-3xl blur-2xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${
              index % 2 === 0 ? "#4F46E5" : "#22D3EE"
            } 0%, transparent 70%)`,
            willChange: shouldAnimate ? "transform" : "auto",
          }}
          animate={shouldAnimate ? {
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 0, 100, 0],
            scale: [1, 1.2, 1, 0.8, 1],
          } : {}}
          transition={shouldAnimate ? {
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}
