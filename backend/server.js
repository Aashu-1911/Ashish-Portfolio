import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
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
  console.log(`Server running on port ${PORT}`);
});
