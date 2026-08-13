import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true,
});

export const getCurrentUser = async () => {
  const response = await API.get("/current-user");
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/logout");
  return response.data;
};