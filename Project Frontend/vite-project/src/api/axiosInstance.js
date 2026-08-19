import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://steamnest.onrender.com/api/v1",
  withCredentials: true,
});

// Add access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;