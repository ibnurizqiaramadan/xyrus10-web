"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ContactForm } from "@/components/ContactForm"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { Github, Linkedin, Instagram } from "@/components/icons/BrandIcons"
import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/icons/DiscordIcon"

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

  return (
    <section id="contact" className="py-24">
      <Container>
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's connect! Whether you want to discuss web development, backend technologies, or DevOps - I'd love to hear from you"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="glass-card p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#F8FAFC] mb-6">
                Contact Information
              </h3>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                  className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-[#4F46E5]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30">
                    <info.icon className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">{info.label}</p>
                    <p className="text-[#F8FAFC] font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-[#F8FAFC] mb-6">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    asChild
                    size="lg"
                    className="glass-card bg-white/5 hover:bg-[#4F46E5]/20 border border-white/10 hover:border-[#4F46E5]/50 transition-all duration-300 hover:glow-primary"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
