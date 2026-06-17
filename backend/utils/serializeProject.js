const serializeProject = (project) => ({
  id: project._id.toString(),
  title: project.title,
  description: project.description,
  project_url: project.project_url || "",
  image: project.image
    ? project.image.startsWith("/")
      ? project.image
      : `/media/projects_images/${project.image}`
    : null,
});

export default serializeProject;
