"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { Code, Rocket, Coffee, Users } from "lucide-react"

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
]

const interests = [
  { icon: Code, label: "Clean Code", description: "Writing maintainable and scalable code" },
  { icon: Rocket, label: "Innovation", description: "Exploring cutting-edge technologies" },
  { icon: Coffee, label: "Learning", description: "Continuous self-improvement" },
  { icon: Users, label: "Collaboration", description: "Building great products with teams" },
]

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Container>
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about my journey and expertise"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative glass-card rounded-2xl p-2">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/avatar.jpg"
                    alt="Ibnu"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-[#F8FAFC]">
              Hi, I&apos;m Ibnu 👋
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              I&apos;m a passionate fullstack developer with a love for creating
              elegant solutions to complex problems. With years of experience
              in web development, I specialize in building modern, responsive,
              and user-friendly applications.
            </p>
            <p className="text-[#94A3B8] leading-relaxed">
              My journey in tech started with curiosity and evolved into a
              career where I get to work with cutting-edge technologies and
              collaborate with talented teams. I believe in writing clean,
              maintainable code and staying up-to-date with the latest industry
              trends.
            </p>
            <p className="text-[#94A3B8] leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-[#F8FAFC] mb-8 text-center">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="glass-card px-6 py-3 rounded-2xl border border-white/10 hover:border-[#4F46E5]/50 transition-all duration-300 hover:glow-primary"
              >
                <span className="text-[#F8FAFC] font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-[#F8FAFC] mb-8 text-center">
            What I Value
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#4F46E5]/50 transition-all duration-300 hover:glow-primary text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30">
                  <interest.icon className="w-7 h-7 text-[#4F46E5]" />
                </div>
                <h4 className="text-lg font-semibold text-[#F8FAFC] mb-2">
                  {interest.label}
                </h4>
                <p className="text-sm text-[#94A3B8]">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </main>
  )
}
