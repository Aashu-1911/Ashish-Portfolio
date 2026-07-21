import prisma from "../lib/prisma.js";
import serializeProject from "../utils/serializeProject.js";

const buildProjectsByDomain = async (limitPerDomain = null) => {
  const domains = await prisma.domain.findMany({
    orderBy: { name: "asc" },
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
        ...(limitPerDomain !== null ? { take: limitPerDomain } : {}),
      },
    },
  });

  const responseData = {};

  for (const domain of domains) {
    if (limitPerDomain !== null && domain.name === "Other") {
      continue;
    }

    responseData[domain.name] = domain.projects.map(serializeProject);
  }

  return responseData;
};

export const getTopProjects = async (_req, res) => {
  try {
    const responseData = await buildProjectsByDomain(3);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const domainFilter = req.params?.domainName;
    if (domainFilter) {
      const domain = await prisma.domain.findFirst({
        where: { name: { equals: domainFilter, mode: "insensitive" } },
        include: {
          projects: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!domain) {
        return res.json({ [domainFilter]: [] });
      }

      return res.json({
        [domain.name]: domain.projects.map(serializeProject),
      });
    }

    const responseData = await buildProjectsByDomain(null);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};
