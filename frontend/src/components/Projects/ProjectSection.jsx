// src/components/Projects/ProjectSection.jsx
import React, { useState } from "react";
import projects from "../../data/projects";
import { 
  FaPython, FaBrain, FaServer, FaLaptopCode, FaLinux, FaCode, 
  FaGitAlt, FaGithub, FaReact, FaNodeJs, FaJs, FaCss3Alt, FaTimes 
} from "react-icons/fa";
import { 
  SiFastapi, SiOpenai, SiSqlite, SiExpress, SiMongodb, 
  SiTailwindcss, SiPostgresql, SiPrisma 
} from "react-icons/si";
import "./ProjectSection.css";

// Dynamic tech stack dataset for each project id
const projectTechStacks = {
  1: [ // N.O.V.A.
    { name: "Python", icon: <FaPython style={{ color: "#3776AB" }} /> },
    { name: "FastAPI", icon: <SiFastapi style={{ color: "#009688" }} /> },
    { name: "Ollama (Qwen 3)", icon: <FaBrain style={{ color: "#000000" }} /> },
    { name: "OpenAI Whisper", icon: <SiOpenai style={{ color: "#412991" }} /> },
    { name: "Piper TTS", icon: <FaServer style={{ color: "#E63946" }} /> },
    { name: "PyAutoGUI", icon: <FaLaptopCode style={{ color: "#3178C6" }} /> },
    { name: "PyWin32", icon: <FaLinux style={{ color: "#000000" }} /> },
    { name: "PyGetWindow", icon: <FaServer style={{ color: "#457B9D" }} /> },
    { name: "SQLite", icon: <SiSqlite style={{ color: "#003B57" }} /> },
    { name: "APScheduler", icon: <FaServer style={{ color: "#2D3748" }} /> },
    { name: "Pydantic", icon: <SiPrisma style={{ color: "#E34F26" }} /> },
    { name: "python-dotenv", icon: <FaCode style={{ color: "#FCC624" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ],
  2: [ // Freelancers Marketplace
    { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "Express.js", icon: <SiExpress style={{ color: "#000000" }} /> },
    { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
    { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
    { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ],
  3: [ // Progress Tracker
    { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
    { name: "Express.js", icon: <SiExpress style={{ color: "#000000" }} /> },
    { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ],
  4: [ // Portfolio Liquidity
    { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "Python", icon: <FaPython style={{ color: "#3776AB" }} /> },
    { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#4169E1" }} /> },
    { name: "Chart.js", icon: <FaLaptopCode style={{ color: "#FF6384" }} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ],
  5: [ // Local Pulse
    { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "Express.js", icon: <SiExpress style={{ color: "#000000" }} /> },
    { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
    { name: "Socket.io", icon: <FaServer style={{ color: "#010101" }} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ],
  6: [ // Convo
    { name: "React.js", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "Express.js", icon: <SiExpress style={{ color: "#000000" }} /> },
    { name: "Socket.io", icon: <FaServer style={{ color: "#010101" }} /> },
    { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
    { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> }
  ]
};

const ProjectsSection = ({ id }) => {
  const [activeTechProjectId, setActiveTechProjectId] = useState(null);

  const toggleTechStack = (projectId) => {
    if (activeTechProjectId === projectId) {
      setActiveTechProjectId(null);
    } else {
      setActiveTechProjectId(projectId);
    }
  };

  const closeTechStack = () => {
    setActiveTechProjectId(null);
  };

  return (
    <div className="projects-section" id={id}>
      <h2 className="heading-1">My Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => window.open(project.url, "_blank")}
          >
            <div className="project-image">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-img"
                />
              ) : (
                <div className="project-image-fallback" />
              )}
              <div className="project-overlay" onClick={(e) => e.stopPropagation()}>
                <h4 className="heading-tit">{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <div className="project-actions">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn visit-btn"
                  >
                    Visit
                  </a>
                  <button
                    className="project-action-btn tech-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTechStack(project.id);
                    }}
                  >
                    Tech Stack
                  </button>
                </div>
              </div>
            </div>

            {/* Inline Tech Stack Overlay (In Front of Card) */}
            {activeTechProjectId === project.id && (
              <div 
                className="project-tech-overlay" 
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="tech-close-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTechStack();
                  }}
                  aria-label="Close tech stack"
                >
                  <FaTimes />
                </button>
                <div className="tech-overlay-header">
                  <span className="tech-overlay-title">Tech Stack</span>
                </div>
                <div className="tech-overlay-body">
                  <div className="tech-overlay-grid">
                    {projectTechStacks[project.id]?.map((tech, idx) => (
                      <div className="tech-overlay-badge" key={idx} title={tech.name}>
                        <span className="tech-overlay-icon">{tech.icon}</span>
                        <span className="tech-overlay-name">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
