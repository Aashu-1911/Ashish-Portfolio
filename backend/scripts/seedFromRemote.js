import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Domain from "../models/Domain.js";
import Project from "../models/Project.js";

dotenv.config();

const REMOTE_API =
  process.env.REMOTE_API_BASE || "https://iamvengeance.pythonanywhere.com/api";

const fetchJson = async (path) => {
  const response = await fetch(`${REMOTE_API}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  return response.json();
};

const extractImageFilename = (imageUrl) => {
  if (!imageUrl) return "";
  const parts = imageUrl.split("/");
  return parts[parts.length - 1] || "";
};

const importFromRemote = async () => {
  await connectDB();

  const allProjects = await fetchJson("/all-projects/");

  await Project.deleteMany({});
  await Domain.deleteMany({});

  for (const [domainName, projects] of Object.entries(allProjects)) {
    const domain = await Domain.create({
      name: domainName,
      description: "",
    });

    for (const project of projects) {
      await Project.create({
        domain: domain._id,
        title: project.title,
        description: project.description,
        project_url: project.project_url || "",
        image: extractImageFilename(project.image),
      });
    }
  }

  console.log("Imported projects from remote API");
  process.exit(0);
};

importFromRemote().catch((error) => {
  console.error("Remote import failed:", error.message);
  process.exit(1);
});
