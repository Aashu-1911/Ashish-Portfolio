import React, { useEffect, useState } from "react";
import api from "../../api";
import "./AllProjects.css";

const AllProjects = ({ id }) => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    // Fetch projects data using Axios
    api
      .get("/all-projects/")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  if (!projects) {
    return (
      <div className="ap-all-projects" id={id}>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="ap-all-projects" id={id}>
      <h2>My Projects</h2>
      <div className="ap-projects-container">
        {Object.entries(projects).map(([domain, domainProjects]) => (
          <div key={domain} className="ap-project-domain">
            <h3>{domain}</h3>
            <div className="ap-project-list">
              {domainProjects.length > 0 ? (
                domainProjects.map((project) => (
                  <a
                    key={project.id}
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-project-capsule"
                  >
                    <span className="ap-project-title">{project.title}</span>
                    <span className="ap-arrow">→</span>
                  </a>
                ))
              ) : (
                <p>No projects available in this domain.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
