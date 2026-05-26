"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { Code, Rocket, Coffee, Users } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { About as AboutType } from "@/lib/types"

const interests = [
  { icon: Code, label: "Clean Code", description: "Writing maintainable and scalable code" },
  { icon: Rocket, label: "Innovation", description: "Exploring cutting-edge technologies" },
  { icon: Coffee, label: "Learning", description: "Continuous self-improvement" },
  { icon: Users, label: "Collaboration", description: "Building great products with teams" },
]

export function About({ data }: { data: AboutType | null }) {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()

  const getInterestText = (label: string) => {
    if (language === "id") {
      switch (label) {
        case "Clean Code": return { label: "Kode Bersih", description: "Menulis kode yang mudah dipelihara dan scalable" }
        case "Innovation": return { label: "Inovasi", description: "Mengeksplorasi teknologi mutakhir" }
        case "Learning": return { label: "Pembelajaran", description: "Pengembangan diri secara terus-menerus" }
        case "Collaboration": return { label: "Kolaborasi", description: "Meningkatkan kualitas produk bersama tim" }
        default: return { label, description: "" }
      }
    }
    switch (label) {
      case "Clean Code": return { label: "Clean Code", description: "Writing maintainable and scalable code" }
      case "Innovation": return { label: "Innovation", description: "Exploring cutting-edge technologies" }
      case "Learning": return { label: "Learning", description: "Continuous self-improvement" }
      case "Collaboration": return { label: "Collaboration", description: "Building great products with teams" }
      default: return { label, description: "" }
    }
  }

  const title = language === "id" ? data?.titleId : data?.titleEn;
  const bio1 = (language === "id" ? data?.bio1Id : data?.bio1En) || "";
  const bio2 = (language === "id" ? data?.bio2Id : data?.bio2En) || "";
  const bio3 = (language === "id" ? data?.bio3Id : data?.bio3En) || "";
  const skills = JSON.parse(data?.skills || "[]");

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <Container>
        <SectionTitle
          title={title || (language === "id" ? "Tentang Saya" : "About Me")}
          subtitle={language === "id"
            ? "AI-Powered Fullstack Engineer & Infrastructure Specialist yang berfokus pada pembangunan web performa tinggi dan pengelolaan server."
            : "AI-Powered Fullstack Engineer & Infrastructure Specialist focused on building high-performance web applications and server management."
          }
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
            <h3 className="text-3xl font-bold text-[#F8FAFC] tracking-tight" dangerouslySetInnerHTML={{ __html: bio1 }} />
            <div className="text-lg text-[#94A3B8] leading-relaxed font-light space-y-4">
              <div dangerouslySetInnerHTML={{ __html: bio2 }} />
              <div dangerouslySetInnerHTML={{ __html: bio3 }} />
            </div>
            
            <div className="pt-6 grid sm:grid-cols-2 gap-8">
              {interests.map((interest) => {
                const text = getInterestText(interest.label)
                return (
                  <div key={interest.label} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <interest.icon className="w-6 h-6 text-[#2b7fff]" />
                    </div>
                    <div>
                      <h4 className="text-[#F8FAFC] font-semibold mb-1">{text.label}</h4>
                      <p className="text-sm text-[#94A3B8] leading-snug">{text.description}</p>
                    </div>
                  </div>
                )
              })}
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
                {language === "id" ? "Keahlian" : "Expertise"}
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill: string) => (
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
