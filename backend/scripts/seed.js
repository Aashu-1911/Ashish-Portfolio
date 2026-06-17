import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Domain from "../models/Domain.js";
import Project from "../models/Project.js";

dotenv.config();

const seedData = [
  {
    name: "Fullstack",
    description: "Full-stack web development projects",
    projects: [
      {
        title: "Portfolio Website",
        description: "A modern portfolio built with React and Node.js.",
        project_url: "https://github.com/Aabi0207/Portfolio-Website",
        image: "",
      },
    ],
  },
  {
    name: "AI(ML, DL, NLP)",
    description: "Machine learning and AI projects",
    projects: [
      {
        title: "ML Project",
        description: "An AI/ML project showcasing model training and inference.",
        project_url: "https://github.com",
        image: "",
      },
    ],
  },
  {
    name: "Data Analysis",
    description: "Data science and analytics projects",
    projects: [
      {
        title: "Data Analysis Project",
        description: "Exploratory data analysis and visualization project.",
        project_url: "https://github.com",
        image: "",
      },
    ],
  },
  {
    name: "Other",
    description: "Miscellaneous projects",
    projects: [],
  },
];

const seed = async () => {
  await connectDB();

  await Project.deleteMany({});
  await Domain.deleteMany({});

  for (const domainData of seedData) {
    const domain = await Domain.create({
      name: domainData.name,
      description: domainData.description,
    });

    for (const projectData of domainData.projects) {
      await Project.create({
        ...projectData,
        domain: domain._id,
      });
    }
  }

  console.log("Database seeded successfully");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
