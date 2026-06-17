import Domain from "../models/Domain.js";
import Project from "../models/Project.js";
import serializeProject from "../utils/serializeProject.js";

const buildProjectsByDomain = async (limitPerDomain = null) => {
  const domains = await Domain.find().sort({ name: 1 });
  const responseData = {};

  for (const domain of domains) {
    if (limitPerDomain !== null && domain.name === "Other") {
      continue;
    }

    let query = Project.find({ domain: domain._id }).sort({ created_at: -1 });

    if (limitPerDomain !== null) {
      query = query.limit(limitPerDomain);
    }

    const projects = await query;
    responseData[domain.name] = projects.map(serializeProject);
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

export const getAllProjects = async (_req, res) => {
  try {
    const responseData = await buildProjectsByDomain(null);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};
