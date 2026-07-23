// src/components/About/About.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaAward, FaFolderOpen, FaBrain, FaStar, FaLayerGroup, FaGraduationCap, FaTrophy } from "react-icons/fa";
import './About.css';
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const About = ({ id }) => {
  const handleScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
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
    <section className="about-section" id={id}>
      <div className="hero-container">
        {/* Left Column: Text & CTA */}
        <div className="hero-content">
          <div className="internship-badge">
            OPEN TO NEW OPPORTUNITIES
          </div>
          
          <div className="hero-title-wrapper">
            <BlurText
              text="Ashish Biradar"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="hero-name"
            />
          </div>

          <div className="hero-subtitle">
            Full Stack Developer <span className="subtitle-dot">•</span> AI Engineer
          </div>

          <p className="hero-tagline">
            I build AI-powered software, scalable web applications, and developer tools focused on solving real-world problems.
          </p>

          <div className="hero-actions">
            <a 
              href="https://drive.google.com/file/d/1tGgFsFjWssDdHaMGMqIMaByE6dOWLLEb/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-filled"
            >
              Download Resume
            </a>
            <button 
              onClick={() => handleScrollTo("project-section")} 
              className="btn btn-outlined"
            >
              View Projects
            </button>
            <button 
              onClick={() => handleScrollTo("contact")} 
              className="btn btn-link"
            >
              Contact Me <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-socials">
            <a 
              href="https://github.com/Aashu-1911" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-circle"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/ashish-biradar-8390b6354/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-circle"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:ashishbiradar.1911@gmail.com" 
              className="social-icon-circle"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a 
              href="https://github.com/Aashu-1911" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-circle"
              aria-label="Code Profile"
            >
              <FaCode />
            </a>
            <a 
              href="https://www.linkedin.com/in/ashish-biradar-8390b6354/details/certifications/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-circle"
              aria-label="Certificates"
            >
              <FaAward />
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image */}
        <div className="hero-image-wrapper">
          <div className="profile-image-container">
            <img 
              src="projects_images/profilePhoto.jpg" 
              alt="Ashish Biradar Profile" 
              className="profile-image" 
            />
          </div>
        </div>
      </div>

      {/* Main About Details section */}
      <div className="about-details-container" id="about-details-header">
        <h2 className="about-details-title">About Me</h2>

        {/* Stats Inline Row */}
        <div className="about-stats-text-row">
          <div className="stat-text-item">
            <FaFolderOpen className="stat-text-icon" />
            <span><strong>20+</strong> Projects</span>
          </div>
          <span className="stat-separator">|</span>
          <div className="stat-text-item">
            <FaBrain className="stat-text-icon" />
            <span><strong>200+</strong> DSA Problems</span>
          </div>
          <span className="stat-separator">|</span>
          <div className="stat-text-item">
            <FaStar className="stat-text-icon" />
            <span><strong>CodeChef 2★</strong></span>
          </div>
          <span className="stat-separator">|</span>
          <div className="stat-text-item">
            <FaLayerGroup className="stat-text-icon" />
            <span><strong>AI • Full Stack</strong></span>
          </div>
          <span className="stat-separator">|</span>
          <div className="stat-text-item">
            <FaGraduationCap className="stat-text-icon" />
            <span><strong>MIT Academy of Engineering</strong></span>
          </div>
          <span className="stat-separator">|</span>
          <div className="stat-text-item">
            <FaTrophy className="stat-text-icon" />
            <span><strong>Datathon 2025 Winner</strong></span>
          </div>
        </div>

        <p className="about-details-text">
          I’m a Computer Engineering student who enjoys building projects in Artificial Intelligence, Full-Stack Development, and Cloud Computing. I have experience developing AI-powered applications, web solutions, and software systems, with a focus on creating practical and impactful technology. Writing clean, efficient code and building user-friendly applications are at the core of my development approach.
        </p>
        <p className="about-details-text">
          I’m constantly learning and exploring new technologies, strengthening my skills in Software Development, Data Structures & Algorithms, Machine Learning, and Cloud Technologies. I enjoy taking on challenging projects that help me grow as a developer and create meaningful solutions.
        </p>
      </div>
    </section>
  );
};

export default About;
