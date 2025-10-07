import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
