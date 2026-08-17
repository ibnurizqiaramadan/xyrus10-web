"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  LayoutDashboard, User, Briefcase, Code, Mail,
  Home, LogOut, FileImage, Settings, MoreVertical, ExternalLink, PenSquare,
} from "lucide-react";
import { logout } from "@/lib/auth/actions";
import type { User as LuciaUser } from "lucia";

const navGroups = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { title: "Hero", href: "/admin/hero", icon: Home },
      { title: "About", href: "/admin/about", icon: User },
      { title: "Experience", href: "/admin/experience", icon: Briefcase },
      { title: "Projects", href: "/admin/projects", icon: Code },
      { title: "Contact", href: "/admin/contact", icon: Mail },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Media", href: "/admin/media", icon: FileImage },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

// Active = exact match, or a child route (/admin/projects/12). "/admin" is exact-only,
// otherwise every page would light up the Dashboard row too.
function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

// The active row is marked three ways so colour is never the only signal:
// a primary rail on the left edge, a filled background, and heavier text.
const activeStyles =
  "relative data-[active=true]:font-semibold data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:inset-y-1.5 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-primary data-[active=true]:before:content-[''] data-[active=true]:[&>svg]:text-primary";

function NavUser({ user }: { user: LuciaUser | null }) {
  const { isMobile } = useSidebar();
  const username = user?.username ?? "Admin";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={username}
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarFallback className="rounded-md bg-primary/15 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate text-left text-sm font-medium">{username}</span>
              <MoreVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-52 rounded-md"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarFallback className="rounded-md bg-primary/15 text-primary text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">{username}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Real server action, so signing out works without client JS.
                onSelect must be prevented: Radix closes the menu on select, which
                unmounts this form mid-submit — the browser then cancels it with
                "Form submission canceled because the form is not connected" and the
                session survives. logout() redirects, which unmounts the menu anyway. */}
            <form action={logout}>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <button
                  type="submit"
                  className="w-full cursor-pointer focus:bg-destructive focus:text-destructive-foreground"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AdminSidebar({ user, siteName }: { user: LuciaUser | null; siteName?: string | null }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-1 border-b border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="CMS Studio">
              <Link href="/admin">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary">
                  <PenSquare className="size-4 text-primary-foreground" />
                </div>
                <span className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate text-sm font-semibold">CMS Studio</span>
                  {/* site_title is a ~90-char SEO string ("Name - Role & Specialist @ Co"),
                      which truncates to a meaningless fragment here. Take the part before
                      the first separator so the subtitle reads as a name, not a rendering bug. */}
                  {siteName?.split(/\s[-|@·]\s/)[0].trim() ? (
                    <span className="truncate text-xs text-muted-foreground">
                      {siteName.split(/\s[-|@·]\s/)[0].trim()}
                    </span>
                  ) : null}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="View live site">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site (opens in a new tab)"
                className="text-muted-foreground"
              >
                <ExternalLink className="size-4" />
                <span>View live site</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
                        className={activeStyles}
                      >
                        <Link href={item.href} aria-current={active ? "page" : undefined}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
