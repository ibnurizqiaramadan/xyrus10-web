"use client"

import { Container } from "@/components/Container"
import { SectionTitle } from "@/components/SectionTitle"
import { ContactForm } from "@/components/ContactForm"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  { icon: Mail, label: "Email", value: "ibnu@example.com" },
  { icon: MapPin, label: "Location", value: "Indonesia" },
  { icon: Phone, label: "Phone", value: "+62 123 456 7890" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
]

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Container>
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss your next project or just say hello"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-lg font-semibold text-[#F8FAFC]">
                  Available for Work
                </h4>
              </div>
              <p className="text-[#94A3B8] text-sm">
                I&apos;m currently available for freelance projects and full-time
                opportunities. Feel free to reach out!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}
