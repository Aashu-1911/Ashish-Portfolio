// src/components/Skills/SkillTable.jsx
import React, { useState, useEffect } from "react";
import { 
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, FaPython, 
  FaAws, FaLinux, FaGitAlt, FaGithub, FaDatabase, FaServer, 
  FaLaptopCode, FaBrain, FaCloud, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import { 
  SiExpress, SiTailwindcss, SiPytorch, SiScikitlearn, SiNumpy, 
  SiPandas, SiDocker, SiNginx, SiPostgresql, SiMongodb, 
  SiSqlite, SiPrisma, SiJupyter, SiLangchain, SiHuggingface, 
  SiVercel, SiRender, SiKubernetes 
} from "react-icons/si";
import "./SkillTable.css";

const skillsData = [
  {
    id: 1,
    title: "Fullstack Development",
    categoryIcon: <FaLaptopCode />,
    description: "I build scalable fullstack web applications using the MERN stack, designing responsive user interfaces and robust backend APIs that deliver seamless user experiences.",
    techStack: [
      { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
      { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
      { name: "Express.js", icon: <SiExpress style={{ color: "#000000" }} /> },
      { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
      { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
      { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
      { name: "Tailwind", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
      { name: "Bootstrap", icon: <FaBootstrap style={{ color: "#7952B3" }} /> },
      { name: "REST APIs", icon: <FaServer style={{ color: "#457B9D" }} /> }
    ]
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    categoryIcon: <FaBrain />,
    description: "I develop AI-powered applications by integrating machine learning models, large language models, and intelligent automation to solve practical real-world problems.",
    techStack: [
      { name: "Python", icon: <FaPython style={{ color: "#3776AB" }} /> },
      { name: "PyTorch", icon: <SiPytorch style={{ color: "#EE4C2C" }} /> },
      { name: "scikit-learn", icon: <SiScikitlearn style={{ color: "#F7931E" }} /> },
      { name: "NumPy", icon: <SiNumpy style={{ color: "#013243" }} /> },
      { name: "Pandas", icon: <SiPandas style={{ color: "#150458" }} /> },
      { name: "LangChain", icon: <SiLangchain style={{ color: "#1C3C3A" }} /> },
      { name: "Hugging Face", icon: <SiHuggingface style={{ color: "#FFD21E" }} /> },
      { name: "Ollama", icon: <FaBrain style={{ color: "#000000" }} /> },
      { name: "Jupyter", icon: <SiJupyter style={{ color: "#F37626" }} /> }
    ]
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    categoryIcon: <FaCloud />,
    description: "I deploy and manage modern applications using cloud platforms, Linux, containers, and CI/CD practices with a focus on scalability and reliability.",
    techStack: [
      { name: "AWS", icon: <FaAws style={{ color: "#FF9900" }} /> },
      { name: "Docker", icon: <SiDocker style={{ color: "#2496ED" }} /> },
      { name: "Linux", icon: <FaLinux style={{ color: "#FCC624" }} /> },
      { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
      { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> },
      { name: "Render", icon: <FaCloud style={{ color: "#46E3B7" }} /> },
      { name: "Vercel", icon: <SiVercel style={{ color: "#000000" }} /> },
      { name: "CI/CD", icon: <FaServer style={{ color: "#1D3557" }} /> },
      { name: "Nginx", icon: <SiNginx style={{ color: "#009639" }} /> }
    ]
  },
  {
    id: 4,
    title: "Databases",
    categoryIcon: <FaDatabase />,
    description: "I work with relational and NoSQL databases to build secure, scalable, and high-performance applications.",
    techStack: [
      { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#4169E1" }} /> },
      { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
      { name: "SQLite", icon: <SiSqlite style={{ color: "#003B57" }} /> },
      { name: "Prisma ORM", icon: <SiPrisma style={{ color: "#2D3748" }} /> }
    ]
  }
];

const SkillsTable = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Monitor viewport element size changes
  useEffect(() => {
    if (viewportRef.current) {
      setViewportWidth(viewportRef.current.clientWidth);
    }
    
    // Add a small delay/trigger for when animations or layout shifts settle
    const timeout = setTimeout(() => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, [visibleCards]);

  // Make sure currentIndex stays within valid bounds on screen resize
  useEffect(() => {
    const maxIndex = skillsData.length - visibleCards;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [visibleCards, currentIndex]);

  const nextSlide = () => {
    if (currentIndex < skillsData.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const cardStyle = {
    flex: `0 0 calc((100% - ${(visibleCards - 1) * 30}px) / ${visibleCards})`
  };

  // Calculate translation in pixels based on viewport width to avoid percentage-based translation offset bugs
  const step = (viewportWidth + 30) / visibleCards;
  const translation = currentIndex * step;

  const trackStyle = {
    transform: `translateX(-${translation}px)`
  };

  return (
    <section className="skills-table-section" id={id}>
      <h2 className="skills-section-title">My Skills</h2>
      <div className="skills-carousel-container">
        {/* Left Arrow */}
        <button 
          className={`slider-arrow left-arrow ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={prevSlide}
          aria-label="Previous Skill Column"
        >
          <FaChevronLeft />
        </button>

        {/* Viewport for slider */}
        <div className="skills-slider-viewport" ref={viewportRef}>
          <div className="skills-slider-track" style={trackStyle}>
            {skillsData.map((skill) => (
              <div 
                className="skills-column" 
                key={skill.id}
                style={cardStyle}
              >
                <div className="skill-card-top">
                  <div className="skill-card-icon-wrapper">
                    {skill.categoryIcon}
                  </div>
                  <h3 className="skills-title">{skill.title}</h3>
                  <p className="skills-description">{skill.description}</p>
                </div>
                
                <p className="dev-tools-title">Tech Stack</p>
                
                <div className="tech-stack-grid">
                  {skill.techStack.map((tech, idx) => (
                    <div className="tech-badge" key={idx}>
                      <span className="tech-badge-icon">{tech.icon}</span>
                      <span className="tech-badge-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          className={`slider-arrow right-arrow ${currentIndex >= skillsData.length - visibleCards ? "disabled" : ""}`}
          onClick={nextSlide}
          aria-label="Next Skill Column"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default SkillsTable;
