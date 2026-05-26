"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { useLanguage } from "@/lib/LanguageContext"
import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Experience as ExperienceType } from "@/lib/types"

export function Experience({ data }: { data: ExperienceType[] }) {
  const { language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <Container>
        <SectionTitle
          title={language === "id" ? "Pengalaman Kerja" : "Work Experience"}
          subtitle={language === "id"
            ? "Perjalanan karir profesional dan kontribusi saya di berbagai proyek."
            : "My professional career journey and contributions to various projects."
          }
        />

        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          {(data || []).map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl border-white/5 hover:border-[#2b7fff]/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b7fff]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#2b7fff]/10 transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#2b7fff] transition-colors">
                    {language === "id" ? exp.roleId : exp.roleEn}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-[#94A3B8] font-medium">
                    <span className="flex items-center gap-1.5 text-[#F8FAFC]">
                      <Briefcase className="w-4 h-4 text-[#2b7fff]" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium text-[#2b7fff] bg-[#2b7fff]/10 px-4 py-2 rounded-full whitespace-nowrap w-fit">
                  <Calendar className="w-4 h-4" />
                  {language === "id" ? exp.periodId : exp.periodEn}
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {JSON.parse(language === "id" ? exp.achievementsId : exp.achievementsEn).map((achievement: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[#94A3B8]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2b7fff] flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
