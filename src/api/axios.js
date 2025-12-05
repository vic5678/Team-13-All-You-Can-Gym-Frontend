import axios from "axios";
import { getAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
