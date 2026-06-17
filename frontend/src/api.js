import axios from "axios";

const api = axios.create({
  baseURL: "https://ashish-biradar-portfolio.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;