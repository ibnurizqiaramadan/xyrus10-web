import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ScrollToTop } from "@/components/ScrollToTop";

// Chrome for the PUBLIC site only. A route group adds no URL segment, so / and
// /project/[slug] keep their paths while /login, /admin and the API routes are
// siblings that never see any of this.
//
// It all used to sit in the root layout, which meant the portfolio navbar wrapped
// the sign-in card, an animated particle canvas ran behind the CMS, and the fixed
// mobile BottomNav covered the bottom 66px of the admin dashboard — hiding the one
// actionable row on a phone.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="noise" />
      <BackgroundEffects />
      <ParticlesBackground />
      <Navbar />
      {/* Clearance for the fixed BottomNav, which only exists below md. */}
      <div className="pb-20 md:pb-0">{children}</div>
      <BottomNav />
      <ScrollToTop />
    </>
  );
}
