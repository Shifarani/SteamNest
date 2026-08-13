import axios from "axios";
import axiosInstance from "./axiosInstance";

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
export const updateAvatar = async(formData)=>{

 const response = await axiosInstance.patch(
   "/users/avatar",
   formData,
   {
    headers:{
      "Content-Type":"multipart/form-data"
    }
   }
 );

 return response.data;

};


export const updateCoverImage = async (formData) => {
  const response = await axiosInstance.patch(
    "/users/cover-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getWatchHistory = async () => {
  const response = await axiosInstance.get(
    "/users/history"
  );

  return response.data;
};

export const addToWatchHistory = async (videoId) => {

  console.log("API videoId:", videoId);

  const response = await axiosInstance.post(
    `/users/history/${videoId}`
  );

  console.log("History response:", response.data);

  return response.data;
};

export const updateAccountDetails = async (data) => {
  const response = await axiosInstance.patch(
    "/users/update-account",
    data
  );

  return response.data;
};

// Search Users
export const searchUsers = async (query) => {
  const response = await axiosInstance.get(
    `/users/search?query=${encodeURIComponent(query)}`
  );

  return response.data;
};


// Get User Channel Profile
export const getUserChannelProfile = async (username) => {
  const response = await axiosInstance.get(
    `/users/c/${username}`
  );

  return response.data;
};
export const getUserProfile = async (username) => {
  const response = await axiosInstance.get(
    `/users/c/${username}`
  );

  return response.data;
};