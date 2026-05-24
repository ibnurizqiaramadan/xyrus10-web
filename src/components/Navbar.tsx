"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64, // Subtract navbar height
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={shouldReduceMotion ? { y: 0 } : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
        isScrolled
          ? "bg-[#0F172A]/80 border-white/10 shadow-lg"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="#home" 
            onClick={(e) => scrollToSection(e, "#home")}
            className="text-2xl font-bold text-[#F8FAFC]"
          >
            Ibnu<span className="text-[#2b7fff]">Rizqia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-[#2b7fff]",
                  activeSection === item.href.replace("#", "")
                    ? "text-[#2b7fff]"
                    : "text-[#94A3B8]"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F8FAFC]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="md:hidden glass-card border-t border-white/10 bg-[#0F172A]"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "block py-2 text-sm font-medium transition-all duration-300",
                  activeSection === item.href.replace("#", "")
                    ? "text-[#2b7fff]"
                    : "text-[#94A3B8]"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
