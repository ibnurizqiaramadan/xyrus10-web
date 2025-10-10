import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { BackgroundEffects } from "@/components/BackgroundEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ibnu - Fullstack Developer & Tech Enthusiast",
  description: "Personal portfolio of Ibnu, a fullstack developer passionate about building innovative solutions and crafting seamless digital experiences.",
  keywords: ["portfolio", "fullstack developer", "web development", "tech enthusiast"],
  authors: [{ name: "Ibnu" }],
  openGraph: {
    title: "Ibnu - Fullstack Developer & Tech Enthusiast",
    description: "Personal portfolio showcasing projects and skills",
    type: "website",
  },
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
