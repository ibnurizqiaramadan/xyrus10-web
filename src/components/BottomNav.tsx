"use client"

import { useState, useEffect } from "react"
import { Home, User, Briefcase, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function BottomNav() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
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
        top: element.offsetTop - 64,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-card border-t border-white/10 pb-safe bg-[#0F172A]/80 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "")
          const Icon = item.icon
          
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 min-w-[60px]",
                isActive
                  ? "bg-[#2b7fff]/20 text-[#2b7fff]"
                  : "text-[#94A3B8] hover:text-[#2b7fff] hover:bg-white/5"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2b7fff] rounded-full" />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
