import projects from "../../data/projects";
import "./ProjectSection.css";

const ProjectsSection = ({ id }) => {
  return (
    <div className="projects-section" id={id}>
      <h2 className="heading-1">My Projects</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
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
              <div className="project-overlay">
                <h4 className="heading-tit">{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <span className="visit-button">Visit</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
