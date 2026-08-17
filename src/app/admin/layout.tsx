import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/get-user";
import { getSettingByKey } from "@/lib/data";
import { AdminSidebar } from "./Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

// The login page used to live at /admin/login, so it was a CHILD of this layout: an
// anonymous visitor got the full sidebar, breadcrumb and a fake "Admin / Administrator"
// footer wrapped around the sign-in form, and a guard here would have redirect-looped.
// Login now lives at /login, so this layout can finally guard the whole admin tree.
//
// The per-page requireUser() calls stay. On client-side navigation between admin routes
// App Router re-runs the PAGE but reuses the layout, so a session that expires mid-session
// would sail past a layout-only guard. Page guards are load-bearing; this one is the net
// that catches a direct load of any page someone forgets to guard.
// Without this every admin tab inherits the public 90-char SEO title, so the whole CMS is
// indistinguishable in the browser tab strip. noindex because the root layout's metadata
// does not apply robots rules here and these pages must never be indexed.
export const metadata: Metadata = {
  title: { template: "%s · CMS Studio", default: "CMS Studio" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const siteName = await getSettingByKey("site_title");

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AdminSidebar user={user} siteName={siteName} />
      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden bg-background">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto min-h-0">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
