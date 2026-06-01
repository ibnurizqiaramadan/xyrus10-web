"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Briefcase, Code, Mail, Home, LogOut, FileImage, Settings } from "lucide-react";
import { logout } from "@/lib/auth/actions";
import type { User as LuciaUser } from "lucia";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero", href: "/admin/hero", icon: Home },
  { name: "About", href: "/admin/about", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: Code },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Media", href: "/admin/media", icon: FileImage },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ user }: { user: LuciaUser | null }) {
  const pathname = usePathname();

  if (!user && pathname === "/admin/login") return null;

  return (
    <div className="w-72 bg-[#0A0A0A] border-r border-white/[0.05] flex flex-col h-full">
      {/* Brand Section */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2b7fff] to-[#60A5FA] flex items-center justify-center shadow-lg shadow-[#2b7fff]/20">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-[#F8FAFC] tracking-tight">CMS Studio</h2>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-80 pl-12">
          Admin Console
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4">
          Management
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative outline-none",
                isActive
                  ? "text-[#2b7fff] bg-[#2b7fff]/5"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.02]"
              )}
            >
              {isActive && (
                <div className="absolute left-[-1px] w-1 h-5 bg-[#2b7fff] rounded-r-full shadow-[0_0_10px_#2b7fff]" />
              )}
              <item.icon 
                size={18} 
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-[#2b7fff]" : "group-hover:text-slate-200"
                )} 
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User & Logout Section */}
      <div className="p-4 mt-auto border-t border-white/[0.05] bg-white/[0.01]">
        <div className="flex items-center gap-3 px-4 py-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-xs font-bold text-[#2b7fff] shadow-inner">
            {user?.username?.substring(0, 2).toUpperCase() || "AD"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">
              {user?.username || "Administrator"}
            </p>
            <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">
              Authorized Access
            </p>
          </div>
        </div>
        
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/[0.03] transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Terminate Session</span>
        </button>
      </div>
    </div>
  );
}
