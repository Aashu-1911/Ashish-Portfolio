import { Router } from "express";
import { getTopProjects, getAllProjects } from "../controllers/projectController.js";
import { sendEmail } from "../controllers/emailController.js";

const router = Router();

router.get("/top-projects", getTopProjects);
router.get("/top-projects/", getTopProjects);

router.get("/all-projects", getAllProjects);
router.get("/all-projects/", getAllProjects);
router.get("/all-projects/:domainName", getAllProjects);
router.get("/all-projects/:domainName/", getAllProjects);

router.post("/send-email", sendEmail);
router.post("/send-email/", sendEmail);

export default router;
