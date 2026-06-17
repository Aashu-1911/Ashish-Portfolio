import React, { useRef, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import SkillsTable from "./components/Skills/SkillTable";
import ProjectsSection from "./components/Projects/ProjectSection";
import ContactPage from "./components/Contact/ContactPage";
import Footer from "./components/Footer/Footer";
import useIntersectionObserver from "./UseIntersectionObserver";
import "./App.css";

const App = () => {
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      setTimeout(() => loader.classList.add("fade-out"), 300);
    }
  }, []);

  const isSkillsVisible = useIntersectionObserver(skillsRef, { threshold: 0.5 });
  const isProjectsVisible = useIntersectionObserver(projectsRef, { threshold: 0.1 });

  return (
    <div>
      <Navbar id="nav" />
      <div id="container">
        <About id="about" />
        <div
          ref={skillsRef}
          className={`section ${isSkillsVisible ? "visible" : ""}`}
        >
          <SkillsTable id="skill-table" />
        </div>
      </div>

      <div
        id="project-container"
        ref={projectsRef}
        className={`section ${isProjectsVisible ? "visible" : ""}`}
      >
        <img className="project-bg" src="/projects_images/blueBackg.png" alt="" />
        <ProjectsSection id="project-section" />
      </div>

      <ContactPage />
      <Footer />
    </div>
  );
};

export default App;
