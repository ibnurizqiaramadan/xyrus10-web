import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { BackgroundEffects } from "@/components/BackgroundEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ibnu Rizqia Ramadan - Full Stack Developer @ Gothru",
  description: "Full Stack Developer specializing in JavaScript, TypeScript, React.js, Next.js, Golang, Node.js, and Deno.js. Building scalable web applications and exploring DevOps with Proxmox.",
  keywords: ["portfolio", "full stack developer", "javascript", "typescript", "react", "nextjs", "golang", "nodejs", "deno", "devops", "proxmox", "web development"],
  authors: [{ name: "Ibnu Rizqia Ramadan" }],
  openGraph: {
    title: "Ibnu Rizqia Ramadan - Full Stack Developer @ Gothru",
    description: "Full Stack Developer specializing in modern web technologies. STMIK Bandung graduate with internship experience at DSTI ITB.",
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
          <BackgroundEffects />
          <Navbar />
          <div className="pb-20 md:pb-0">
            {children}
          </div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
