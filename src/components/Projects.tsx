"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ProjectCard } from "@/components/ProjectCard"
import { useLanguage } from "@/lib/LanguageContext"

export function Projects() {
  const { language } = useLanguage()

  const projects = [
    {
      title: "Bukit Pamoyanan Ticketing System",
      description: language === "id"
        ? "Sistem pertiketan komprehensif untuk Wisata Alam Bukit Pamoyanan di Subang. Dibuat selama magang di DSTI ITB, menampilkan pemesanan online, integrasi pembayaran, dan manajemen pengunjung."
        : "A comprehensive ticketing system for Bukit Pamoyanan Natural Tourism in Subang. Built during internship at DSTI ITB, featuring online booking, payment integration, and visitor management.",
      techStack: ["MySQL", "C#"],
    },
    {
      title: "XyBeat - Discord Music Bot",
      description: language === "id"
        ? "Bot musik Discord canggih dengan TypeScript & discord.js v14. Fitur integrasi yt-dlp asli, sistem unduhan latar belakang (mengunduh 5 lagu berikutnya terlebih dahulu), pelacakan progres real-time, caching MP3, persistensi antrean Redis dengan pemulihan kerusakan, dan manajemen suara cerdas. Mendukung playlist YouTube, mix, dan pengunduhan serentak (2-3 lagu per server)."
        : "Advanced Discord music bot with TypeScript & discord.js v14. Features native yt-dlp integration, background download system (pre-downloads next 5 songs), real-time progress tracking, MP3 caching, Redis queue persistence with crash recovery, and smart voice management. Supports YouTube playlists, mixes, and concurrent downloading (2-3 songs per server).",
      techStack: ["TypeScript", "Discord.js v14", "yt-dlp", "FFmpeg", "Redis", "Node.js"],
      githubUrl: "https://github.com/ibnurizqiaramadan/xybeat",
    },
    {
      title: "Face Clustering with GPU",
      description: language === "id"
        ? "Aplikasi pengelompokan wajah berkinerja tinggi menggunakan InsightFace + FAISS GPU. Fitur pemrosesan paralel GPU ganda dengan throughput 2.45 img/s (207% lebih cepat daripada CPU). Secara otomatis mengelompokkan foto berdasarkan wajah dengan caching Redis dan visualisasi bounding box."
        : "High-performance face clustering application using InsightFace + FAISS GPU. Features dual GPU parallel processing with 2.45 img/s throughput (207% faster than CPU). Automatically groups photos by faces with Redis caching and bounding box visualization.",
      techStack: ["Python", "InsightFace", "FAISS GPU", "Redis", "OpenCV"],
      githubUrl: "https://github.com/ibnurizqiaramadan/face-grouping",
    },
  ]

  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionTitle
          title={language === "id" ? "Proyek Saya" : "My Projects"}
          subtitle={language === "id"
            ? "Dari sistem pertiketan hingga bot Discord - berikut beberapa proyek yang saya bangun dengan teknologi modern"
            : "From ticketing systems to Discord bots - here are some projects I've built with modern tech stacks"
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
