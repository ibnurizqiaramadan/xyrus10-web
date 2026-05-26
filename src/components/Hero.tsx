"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Github, Linkedin, Instagram } from "@/components/icons/BrandIcons"
import { TypeAnimation } from "react-type-animation"
import Image from "next/image"
import { DiscordIcon } from "@/components/icons/DiscordIcon"
import { useLanguage } from "@/lib/LanguageContext"
import { Hero as HeroType } from "@/lib/types"

const socialLinks = [
  { icon: Github, href: "https://github.com/ibnurizqiaramadan", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ibnu-rizqia-ramadan", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/ibnurizqia", label: "Instagram" },
  { icon: DiscordIcon, href: "http://discordapp.com/users/257147179297144833", label: "Discord: xyrus10", username: "xyrus10" },
]

export function Hero({ data }: { data: HeroType | null }) {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("contact")
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64,
        behavior: "smooth",
      })
    }
  }

  // Fallback values
  const name = data?.name || "Ibnu Rizqia Ramadan";
  const title = language === "id" ? data?.titleId : data?.titleEn;
  const description = (language === "id" ? data?.descriptionId : data?.descriptionEn) || "";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-40 pb-20">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2b7fff]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            className="mb-10 relative"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2b7fff] to-[#60A5FA] rounded-3xl rotate-6 opacity-20 blur-2xl group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative glass-card rounded-3xl p-1.5 h-full w-full rotate-0 hover:-rotate-2 transition-transform duration-500 overflow-hidden shadow-2xl">
                <Image
                  src={data?.imageUrl || "/xyrus10.jpg"}
                  alt={name}
                  fill
                  className="object-cover rounded-[1.25rem]"
                  priority
                  sizes="(max-width: 768px) 40vw, 25vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold text-[#F8FAFC] mb-6 tracking-tighter">
              {name.split(' ')[0]} <span className="text-gradient">{name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="text-xl md:text-3xl text-[#2b7fff] font-medium mb-8 tracking-wide">
              <TypeAnimation
                sequence={[
                  title || "AI-Powered Fullstack Engineer",
                  2000,
                  "Infrastructure Specialist",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
              className="text-lg md:text-xl text-[#94A3B8] mb-12 leading-relaxed max-w-2xl font-light mx-auto"
              dangerouslySetInnerHTML={{ __html: description }}
            />


            {/* CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <a
                href="/cv-ibnu-rizqia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-8 py-3.5 rounded-full font-semibold text-[#F8FAFC] hover:bg-[#2b7fff]/10 hover:border-[#2b7fff]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                {language === "id" ? "Unduh CV" : "Download CV"}
                <svg className="w-5 h-5 text-[#94A3B8] group-hover:text-[#2b7fff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-[#2b7fff] to-[#60A5FA] px-8 py-3.5 rounded-full font-semibold text-white hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(43,127,255,0.3)] hover:shadow-[0_0_30px_rgba(43,127,255,0.5)] flex items-center gap-2"
              >
                {language === "id" ? "Mari Berdiskusi" : "Let's Talk"}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
              className="flex justify-center gap-6"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 rounded-2xl transition-all duration-300 hover:border-[#2b7fff]/50 hover:bg-[#2b7fff]/5 hover:scale-110 active:scale-95 group"
                  aria-label={social.label}
                >
                  <social.icon
                    size={24}
                    className="text-[#94A3B8] group-hover:text-[#2b7fff] transition-colors"
                  />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
