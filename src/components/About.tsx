"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { Code, Rocket, Coffee, Users } from "lucide-react"

const skills = [
  "TypeScript",
  "Node.js",
  "Next.js",
  "Go (Fiber)",
  "Bun",
  "Drizzle ORM",
  "Docker",
  "Proxmox VE",
  "LXC",
  "Tailwind CSS",
  "PostgreSQL",
  "MySQL",
  "DevOps",
  "Git",
]

const interests = [
  { icon: Code, label: "Clean Code", description: "Writing maintainable and scalable code" },
  { icon: Rocket, label: "Innovation", description: "Exploring cutting-edge technologies" },
  { icon: Coffee, label: "Learning", description: "Continuous self-improvement" },
  { icon: Users, label: "Collaboration", description: "Building great products with teams" },
]

export function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <Container>
        <SectionTitle
          title="About Me"
          subtitle="Full Stack Developer focused on building high-performance, user-centric web applications."
        />

        <div className="grid lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Bio Content */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Menembus Batas Code & <br />
              <span className="text-[#2b7fff]">Infrastruktur Server.</span>
            </h3>
            <p className="text-lg text-[#94A3B8] leading-relaxed font-light">
              Halo! Saya Ibnu Rizqia Ramadan, seorang <span className="text-[#F8FAFC] font-medium">AI-Powered Fullstack Engineer & Infrastructure Specialist</span> yang saat ini bekerja di <a href="https://gothru.co" target="_blank" rel="noopener noreferrer" className="text-[#2b7fff] hover:underline font-medium">GoThru.co</a>. Saya berfokus pada pembangunan aplikasi web berkinerja tinggi serta pengelolaan infrastruktur server yang <span className="italic">scalable</span>, memanfaatkan efisiensi kecerdasan buatan untuk mempercepat alur kerja pengembangan modern.
            </p>
            <p className="text-lg text-[#94A3B8] leading-relaxed font-light">
              Menjembatani celah antara rekayasa perangkat lunak dan administrasi sistem, saya mengadopsi alat bantu AI untuk mengoptimalkan seluruh siklus pemrograman. Di ranah <span className="italic">software development</span>, saya terbiasa membangun sistem yang cepat dan efisien menggunakan <span className="text-[#F8FAFC] font-medium">Next.js</span>, <span className="text-[#F8FAFC] font-medium">Go (Fiber)</span>, <span className="text-[#F8FAFC] font-medium">Bun</span>, dan <span className="text-[#F8FAFC] font-medium">Drizzle ORM</span>. Sementara di sisi infrastruktur, saya memiliki keahlian dalam pengelolaan <span className="text-[#F8FAFC] font-medium">bare-metal server</span>, optimalisasi lingkungan <span className="text-[#F8FAFC] font-medium">Proxmox Virtual Environment</span>, hingga manajemen <span className="text-[#F8FAFC] font-medium">LXC</span>.
            </p>
            <p className="text-lg text-[#94A3B8] leading-relaxed font-light">
              Selain bekerja sebagai profesional, saya juga aktif mengelola dan mengembangkan infrastruktur layanan hosting mandiri melalui <a href="https://www.hostingin.net" target="_blank" rel="noopener noreferrer" className="text-[#2b7fff] hover:underline font-medium">Hostingin.net</a>. Kombinasi antara efisiensi AI, optimasi kode, dan ketangguhan arsitektur server adalah kunci saya dalam menghadirkan solusi digital yang andal dari hulu ke hilir.
            </p>
            
            <div className="pt-6 grid sm:grid-cols-2 gap-8">
              {interests.map((interest) => (
                <div key={interest.label} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <interest.icon className="w-6 h-6 text-[#2b7fff]" />
                  </div>
                  <div>
                    <h4 className="text-[#F8FAFC] font-semibold mb-1">{interest.label}</h4>
                    <p className="text-sm text-[#94A3B8] leading-snug">{interest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Column */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b7fff]/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <h4 className="text-xl font-bold text-[#F8FAFC] mb-8 flex items-center gap-3">
                <Code className="w-5 h-5 text-[#2b7fff]" />
                Expertise
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] text-sm font-medium hover:border-[#2b7fff]/40 hover:text-[#F8FAFC] hover:bg-[#2b7fff]/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
