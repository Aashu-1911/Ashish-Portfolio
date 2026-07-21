import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "./lib/prisma.js";
import apiRoutes from "./routes/api.js";
import { createTransporter } from "./controllers/emailController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[HTTP Request] ${req.method} ${req.url}`);
  next();
});

app.use(
  "/media/projects_images",
  express.static(path.join(__dirname, "uploads", "projects_images"))
);

app.use("/api", apiRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`EMAIL_BACKEND: ${process.env.EMAIL_BACKEND || "console"}`);
  console.log(`EMAIL_HOST_USER configured: ${Boolean(process.env.EMAIL_HOST_USER)}`);
  console.log(`DATABASE_URL configured: ${Boolean(process.env.DATABASE_URL)}`);
  console.log(`Registered Routes:`);
  console.log(`  GET  /`);
  console.log(`  GET  /api/email-test`);
  console.log(`  GET  /api/top-projects`);
  console.log(`  GET  /api/all-projects`);
  console.log(`  POST /api/send-email`);
  console.log(`===============================================`);

  if (process.env.EMAIL_BACKEND === "smtp") {
    console.log("[SMTP Startup Audit] Verifying Gmail SMTP configuration...");
    const transporter = createTransporter();
    transporter
      .verify()
      .then(() => console.log("[SMTP Startup Audit] ✅ Transporter verified successfully"))
      .catch((err) =>
        console.error("[SMTP Startup Audit] ❌ Transporter verification error:", err.message)
      );
  }
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
