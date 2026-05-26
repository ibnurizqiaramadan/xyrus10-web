import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { GradientDivider } from "@/components/GradientDivider";
import { getHeroData, getAboutData, getExperienceData, getProjectData, getContactData } from "@/lib/data";

export default async function Home() {
  const [heroData, aboutData, experienceData, projectData, contactData] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getExperienceData(),
    getProjectData(),
    getContactData()
  ]);

  return (
    <main>
      <div id="home">
        <Hero data={heroData} />
      </div>
      <GradientDivider />
      <About data={aboutData} />
      <GradientDivider />
      <Experience data={experienceData} />
      <GradientDivider />
      <Projects data={projectData} />
      <GradientDivider />
      <Contact data={contactData} />
    </main>
  );
}
