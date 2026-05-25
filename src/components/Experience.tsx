"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { useLanguage } from "@/lib/LanguageContext"
import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"

// JSON DATA UNTUK PENGALAMAN KERJA
// Kamu bisa menambah, menghapus, atau mengubah data di bawah ini.
const experienceData = [
  {
    id: "gothru",
    order: 2,
    company: "GoThru",
    role: {
      id: "Full-stack Developer",
      en: "Full-stack Developer"
    },
    location: "Subang (On-site)",
    period: {
      id: "Nov 2022 - Sekarang",
      en: "Nov 2022 - Present"
    },
    achievements: {
      id: [
        "Membangun dan memelihara aplikasi web berkinerja tinggi menggunakan JavaScript dan React.js.",
        "Membantu pengelolaan infrastruktur server dan pemeliharaan sistem sebagai asisten Sysadmin.",
        "Berkolaborasi dalam pengembangan produk utama perusahaan dengan fokus pada skalabilitas.",
        "Mengelola dan mengoptimalkan fitur-fitur frontend dan backend."
      ],
      en: [
        "Build and maintain high-performance web applications using JavaScript and React.js.",
        "Assisted in server infrastructure management and system maintenance as an Assistant Sysadmin.",
        "Collaborate in core product development with a focus on scalability.",
        "Manage and optimize both frontend and backend features."
      ]
    }
  },
  {
    id: "hostingin",
    order: 1,
    company: "Hostingin.net",
    role: {
      id: "Founder & System Administrator",
      en: "Founder & System Administrator"
    },
    location: "Indonesia",
    period: {
      id: "Mar 2026 - Sekarang",
      en: "Mar 2026 - Present"
    },
    achievements: {
      id: [
        "Mendirikan dan mengelola layanan hosting independen.",
        "Mengelola bare-metal server Linux, konfigurasi jaringan, dan keamanan sistem.",
        "Mengoptimalkan lingkungan virtualisasi menggunakan Proxmox VE dan LXC."
      ],
      en: [
        "Founded and managed an independent hosting service.",
        "Manage bare-metal Linux servers, network configuration, and system security.",
        "Optimize virtualization environments using Proxmox VE and LXC."
      ]
    }
  },
  {
    id: "dian-global",
    order: 3,
    company: "Dian Global Tech",
    role: {
      id: "Full-stack Developer",
      en: "Full-stack Developer"
    },
    location: "Bandung, Jawa Barat (On-site)",
    period: {
      id: "Feb 2020 - Agu 2021",
      en: "Feb 2020 - Aug 2021"
    },
    achievements: {
      id: [
        "Bertanggung jawab dalam pengembangan software dari hulu ke hilir.",
        "Mengimplementasikan fitur-fitur baru menggunakan ekosistem JavaScript.",
        "Meningkatkan kualitas kode dan performa aplikasi secara keseluruhan."
      ],
      en: [
        "Responsible for end-to-end software development.",
        "Implemented new features using the JavaScript ecosystem.",
        "Improved overall code quality and application performance."
      ]
    }
  },
  {
    id: "dsti-itb",
    order: 4,
    company: "DSTI ITB",
    role: {
      id: "Junior Programmer (Magang)",
      en: "Junior Programmer (Intern)"
    },
    location: "Bandung, Indonesia",
    period: {
      id: "Okt 2016 - Des 2016",
      en: "Oct 2016 - Dec 2016"
    },
    achievements: {
      id: [
        "Mengembangkan aplikasi web management assets untuk internal ITB.",
        "Membangun portal web prestasi mahasiswa ITB selama periode magang 3 bulan.",
        "Bekerja sama dengan tim pengembang senior untuk memastikan kualitas modul yang dibangun."
      ],
      en: [
        "Developed web management assets application for internal ITB use.",
        "Built ITB student achievement web portal during the 3-month internship period.",
        "Collaborated with senior developers to ensure the quality of developed modules."
      ]
    }
  }
]

export function Experience() {
  const { language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  // Urutkan data berdasarkan properti 'order'
  const sortedExperience = [...experienceData].sort((a, b) => a.order - b.order)

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
          {sortedExperience.map((exp, index) => (
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
                    {exp.role[language]}
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
                  {exp.period[language]}
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {exp.achievements[language].map((achievement, i) => (
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
