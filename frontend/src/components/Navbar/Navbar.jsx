import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./navbar.css";

const Navbar = ({ id }) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Check if we are at the very bottom of the page first
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 200; // offset for nav

      const aboutElement = document.getElementById("about");
      const aboutDetailsElement = document.getElementById("about-details-header");
      const skillsElement = document.getElementById("skill-table");
      const projectsElement = document.getElementById("project-section");
      const contactElement = document.getElementById("contact");

      const getAbsTop = (el) => {
        if (!el) return 0;
        return el.getBoundingClientRect().top + window.scrollY;
      };

      const aboutDetailsTop = getAbsTop(aboutDetailsElement);
      const skillsTop = getAbsTop(skillsElement);
      const projectsTop = getAbsTop(projectsElement);
      const contactTop = getAbsTop(contactElement);

      if (contactElement && scrollPosition >= contactTop) {
        setActiveSection("contact");
      } else if (projectsElement && scrollPosition >= projectsTop) {
        setActiveSection("projects");
      } else if (skillsElement && scrollPosition >= skillsTop) {
        setActiveSection("skills");
      } else if (aboutDetailsElement && scrollPosition >= aboutDetailsTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="navbar" id={id}>
      <div className="navbar-left" onClick={() => handleNavClick("about")}>
        AB
      </div>

      <div className="navbar-center">
        <button
          className={`nav-link ${activeSection === "home" ? "active" : ""}`}
          onClick={() => handleNavClick("about")}
        >
          Home
        </button>
        <button
          className={`nav-link ${activeSection === "about" ? "active" : ""}`}
          onClick={() => handleNavClick("about-details-header")}
        >
          About
        </button>
        <button
          className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
          onClick={() => handleNavClick("skill-table")}
        >
          Skills
        </button>
        <button
          className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
          onClick={() => handleNavClick("project-section")}
        >
          Projects
        </button>
        <button
          className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
          onClick={() => handleNavClick("contact")}
        >
          Contact
        </button>
      </div>

      <div className="navbar-right">
        <a
          href="https://github.com/Aashu-1911"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-icon-link"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/ashish-biradar-8390b6354/"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-icon-link"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://drive.google.com/file/d/1tGgFsFjWssDdHaMGMqIMaByE6dOWLLEb/view?usp=drive_link"
          className="navbar-connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="connect-border">Resume</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
