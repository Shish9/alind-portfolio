import { useEffect, useState } from "react";
import BlueprintBackground from "./components/BlueprintBackground.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import ProjectCards from "./components/ProjectCards.jsx";
import Skills from "./components/Skills.jsx";
import EducationLanguages from "./components/EducationLanguages.jsx";
import Contact from "./components/Contact.jsx";
import { navItems } from "./data/cv.js";

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function App() {
  const active = useActiveSection();

  return (
    <>
      <BlueprintBackground />
      <Sidebar active={active} />
      <main className="lg:pl-[150px]">
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectCards />
        <Skills />
        <EducationLanguages />
        <Contact />
      </main>
    </>
  );
}
