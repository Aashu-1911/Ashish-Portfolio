// src/components/Projects/ProjectSection.jsx
import React from "react";
import projects from "../../data/projects";
import "./ProjectSection.css";

const ProjectsSection = ({ id }) => {
  return (
    <div className="projects-section" id={id}>
      <h2 className="heading-1">My Projects</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
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
              
              {/* Single Hover Overlay (Title & Description) */}
              <div className="project-overlay" onClick={(e) => e.stopPropagation()}>
                <h4 className="heading-tit">{project.title}</h4>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Floating Persistent Actions Panel (Always visible in front of image) */}
              <div className="project-actions-floating" onClick={(e) => e.stopPropagation()}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn visit-btn"
                >
                  Visit
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
