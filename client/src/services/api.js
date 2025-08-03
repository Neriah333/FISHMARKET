import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor - attaches JWT automatically
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  console.log("Frontend token:", token); // ✅ Log token before request

  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
