import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ibnu Rizqia Ramadan - AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
  description: "AI-Powered Fullstack Engineer & Infrastructure Specialist di GoThru.co. Berfokus pada pembangunan aplikasi web berkinerja tinggi serta pengelolaan infrastruktur server yang scalable.",
  keywords: ["portfolio", "full stack engineer", "infrastructure specialist", "gothru.co", "GoThru.co", "javascript", "typescript", "react", "nextjs", "golang", "fiber", "bun", "drizzle orm", "devops", "proxmox", "lxc", "web development"],
  authors: [{ name: "Ibnu Rizqia Ramadan" }],
  openGraph: {
    title: "Ibnu Rizqia Ramadan - AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
    description: "Menembus batas antara software development dan system administration dengan dukungan teknologi AI. Membangun aplikasi web modern dengan Next.js & Go, mengarsiteki Proxmox & LXC.",
    type: "website",
  },
};

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
            <div className="noise" />
            <BackgroundEffects />
            <Navbar />
            <div className="pb-20 md:pb-0">
              {children}
            </div>
            <BottomNav />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
