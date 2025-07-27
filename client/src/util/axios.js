import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://trackzen-production.up.railway.app/api/v1",
  withCredentials: true,
});

// Optional: attach token from localStorage or context
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
