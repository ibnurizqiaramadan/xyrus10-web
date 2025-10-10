"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import Image from "next/image"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
]

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-[#F8FAFC] mb-6"
            >
              Hi, I&apos;m <span className="text-[#4F46E5]">Ibnu</span>
            </motion.h1>

            <div className="text-xl md:text-2xl text-[#94A3B8] mb-8 h-12">
              <TypeAnimation
                sequence={[
                  "Fullstack Developer",
                  2000,
                  "Tech Enthusiast",
                  2000,
                  "Problem Solver",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#94A3B8] mb-8 leading-relaxed"
            >
              Building innovative solutions and crafting seamless digital
              experiences. Passionate about clean code, modern technologies,
              and turning ideas into reality.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 rounded-2xl hover:scale-110 transition-all duration-300 hover:glow-primary group"
                >
                  <social.icon
                    size={24}
                    className="text-[#94A3B8] group-hover:text-[#4F46E5] transition-colors"
                  />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative glass-card rounded-full p-2">
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-[#4F46E5]/30">
                  <Image
                    src="/avatar.jpg"
                    alt="Ibnu"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
