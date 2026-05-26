"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Briefcase, Code, Mail, Home, LogOut } from "lucide-react";
import { logout } from "@/lib/auth/actions";
import type { User as LuciaUser } from "lucia";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero", href: "/admin/hero", icon: Home },
  { name: "About", href: "/admin/about", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: Code },
  { name: "Contact", href: "/admin/contact", icon: Mail },
];

export function Sidebar({ user }: { user: LuciaUser | null }) {
  const pathname = usePathname();

  if (!user && pathname === "/admin/login") return null;

  return (
    <div className="w-64 bg-[#0D0F1A] border-r border-white/5 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#F8FAFC]">CMS Admin</h2>
        <p className="text-xs text-[#94A3B8]">Ibnu Rizqia Portfolio</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              pathname === item.href
                ? "bg-[#2b7fff] text-white shadow-lg shadow-[#2b7fff]/20"
                : "text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC]"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
