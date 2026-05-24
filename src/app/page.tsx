import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { GradientDivider } from "@/components/GradientDivider";

export default function Home() {
  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <GradientDivider />
      <About />
      <GradientDivider />
      <Projects />
      <GradientDivider />
      <Contact />
    </main>
  );
}
