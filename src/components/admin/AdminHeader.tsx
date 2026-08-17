"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Derived from the URL instead of a lookup table: a new route gets a readable crumb
// on day one rather than the placeholder word "Page".
function labelFor(segment: string) {
  return decodeURIComponent(segment)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AdminHeader() {
  const pathname = usePathname();
  // "/admin/projects/12" -> [{ href: "/admin/projects", label: "Projects" }, { href: "...", label: "12" }]
  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .slice(1)
    .map((segment, i, all) => ({
      href: `/admin/${all.slice(0, i + 1).join("/")}`,
      label: labelFor(segment),
    }));

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 lg:px-6">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 text-sm sm:gap-1.5">
          <BreadcrumbItem>
            {crumbs.length === 0 ? (
              <BreadcrumbPage className="font-semibold text-foreground">Dashboard</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/admin" className="transition-colors hover:text-foreground">
                Dashboard
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {crumbs.map((crumb, i) => (
            // Separator and item are both <li>, so they are siblings — never nested.
            <Fragment key={crumb.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {i === crumbs.length - 1 ? (
                  <BreadcrumbPage className="font-semibold text-foreground">{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href} className="transition-colors hover:text-foreground">
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
