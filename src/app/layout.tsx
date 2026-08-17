import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import { getSettingByKey } from "@/lib/data";
import { siteOrigin } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ISR, not force-dynamic. Measured on one core: force-dynamic served 30.4 req/s at
// p50 650ms because every hit re-rendered the whole React tree to produce byte-identical
// HTML — ~94% of the cost, against ~6% for the SQLite reads. At revalidate=60 the same
// box serves 147 req/s at p50 114ms, beating a 4-worker cluster without clustering.
// Route Segment Config cascades from the root layout, so this covers every public page.
//
// The trade: `pnpm build` now prerenders / and needs a populated data/sqlite.db present
// on the build machine, and an /admin edit reaches other pm2 workers within 60s rather
// than instantly (revalidatePath purges the worker that handled the save). Both are fine
// here — the build runs on the VM that owns the database, and this is a portfolio.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const faviconUrl = await getSettingByKey("favicon_url");
  const siteTitle = await getSettingByKey("site_title");
  const siteDescription = await getSettingByKey("site_description");

  return {
    // Not NEXT_PUBLIC_*: those are inlined as string literals at build time, so
    // the runtime environment could never change it. siteOrigin() never throws —
    // a throw here is uncatchable (error.tsx sits below the root layout) and
    // would 500 every page for every visitor — and it shares its fallback with
    // robots.ts/sitemap.ts so the canonical host cannot disagree between them.
    metadataBase: new URL(siteOrigin()),
    title: siteTitle ?? "Ibnu Rizqia Ramadan - AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
    description: siteDescription ?? "AI-Powered Fullstack Engineer & Infrastructure Specialist di GoThru.co. Berfokus pada pembangunan aplikasi web berkinerja tinggi serta pengelolaan infrastruktur server yang scalable.",
    keywords: ["portfolio", "full stack engineer", "infrastructure specialist", "gothru.co", "GoThru.co", "javascript", "typescript", "react", "nextjs", "golang", "fiber", "bun", "drizzle orm", "devops", "proxmox", "lxc", "web development"],
    authors: [{ name: "Ibnu Rizqia Ramadan" }],
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
    openGraph: {
      title: siteTitle ?? "Ibnu Rizqia Ramadan - AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
      description: siteDescription ?? "Menembus batas antara software development dan system administration dengan dukungan teknologi AI. Membangun aplikasi web modern dengan Next.js & Go, mengarsiteki Proxmox & LXC.",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {/* Public chrome — navbar, particles, noise, bottom nav — lives in
                src/app/(site)/layout.tsx, NOT here. It used to wrap every route, so
                /login rendered the portfolio navbar around the sign-in card and the
                mobile BottomNav covered the bottom 66px of the admin dashboard. The
                root layout owns document structure and providers only. */}
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
