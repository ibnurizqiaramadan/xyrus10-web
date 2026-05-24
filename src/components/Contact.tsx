"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ContactForm } from "@/components/ContactForm"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { Github, Linkedin, Instagram } from "@/components/icons/BrandIcons"
import { DiscordIcon } from "@/components/icons/DiscordIcon"
import { useLanguage } from "@/lib/LanguageContext"

const contactInfo = [
  { icon: Mail, label: "Email", value: "dadanibnu61@gmail.com" },
  { icon: MapPin, label: "Location", value: "Subang, Jawa Barat, Indonesia" },
  { icon: Phone, label: "Phone", value: "+6282315100550" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/ibnurizqiaramadan", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ibnu-rizqia-ramadan", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/ibnurizqia", label: "Instagram" },
  { icon: DiscordIcon, href: "http://discordapp.com/users/257147179297144833", label: "Discord: xyrus10" },
]

export function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <Container>
        <SectionTitle
          title={language === "id" ? "Hubungi Saya" : "Get In Touch"}
          subtitle={language === "id"
            ? "Mari kita buat sesuatu yang luar biasa bersama. Hubungi saya untuk kolaborasi atau sekadar mengobrol santai."
            : "Let's build something amazing together. Reach out for collaborations or just a friendly chat."
          }
        />

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info & Socials */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h3 className="text-3xl font-bold text-[#F8FAFC] mb-8 tracking-tight">
                {language === "id" ? (
                  <>Mari <span className="text-[#2b7fff]">Terhubung</span></>
                ) : (
                  <>Let&apos;s <span className="text-[#2b7fff]">Connect</span></>
                )}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-[#2b7fff]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#2b7fff] mb-1">
                        {language === "id" && info.label === "Location" ? "Lokasi" : 
                         language === "id" && info.label === "Phone" ? "Telepon" : info.label}
                      </p>
                      <p className="text-[#F8FAFC] font-medium text-lg">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#94A3B8] font-medium mb-6 flex items-center gap-2">
                <div className="w-8 h-px bg-[#2b7fff]/30" />
                {language === "id" ? "Temukan saya di" : "Find me on"}
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-4 rounded-2xl hover:border-[#2b7fff]/40 hover:bg-[#2b7fff]/5 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-[#94A3B8] group-hover:text-[#2b7fff] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
