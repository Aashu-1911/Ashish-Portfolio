import dotenv from "dotenv";
import prisma from "../lib/prisma.js";

dotenv.config();

const seedData = [
  {
    name: "Fullstack",
    description: "Full-stack web development projects",
    projects: [
      {
        title: "Portfolio Website",
        description: "A modern portfolio built with React and Node.js.",
        projectUrl: "https://github.com/Aabi0207/Portfolio-Website",
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
        projectUrl: "https://github.com",
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
        projectUrl: "https://github.com",
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
  console.log("Seeding database using Prisma...");

  await prisma.$transaction([
    prisma.project.deleteMany({}),
    prisma.domain.deleteMany({}),
  ]);

  for (const domainData of seedData) {
    await prisma.domain.create({
      data: {
        name: domainData.name,
        description: domainData.description,
        projects: {
          create: domainData.projects,
        },
      },
    });
  }

  console.log("Database seeded successfully");
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
