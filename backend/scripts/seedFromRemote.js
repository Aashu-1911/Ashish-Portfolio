import dotenv from "dotenv";
import prisma from "../lib/prisma.js";

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
  console.log("Importing remote projects using Prisma...");

  const allProjects = await fetchJson("/all-projects/");

  await prisma.$transaction([
    prisma.project.deleteMany({}),
    prisma.domain.deleteMany({}),
  ]);

  for (const [domainName, projects] of Object.entries(allProjects)) {
    const domain = await prisma.domain.create({
      data: {
        name: domainName,
        description: "",
      },
    });

    if (projects && projects.length > 0) {
      await prisma.project.createMany({
        data: projects.map((project) => ({
          domainId: domain.id,
          title: project.title,
          description: project.description,
          projectUrl: project.project_url || "",
          image: extractImageFilename(project.image),
        })),
      });
    }
  }

  console.log("Imported projects from remote API successfully");
};

importFromRemote()
  .catch((error) => {
    console.error("Remote import failed:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
