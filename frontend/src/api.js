import axios from "axios";

const defaultBaseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://ashish-biradar-portfolio.onrender.com/api"
    : "http://localhost:8000/api");

const api = axios.create({
  baseURL: defaultBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;