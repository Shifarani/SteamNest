import axiosInstance from "./axiosInstance";
import axios from "axios";

export const getVideoById = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data.data;
};

export const getAllVideos = async (userId) => {
  const response = await axiosInstance.get("/videos", {
    params: userId ? { userId } : {},
  });

  return response.data.data;
};

export const uploadVideo = async (formData) => {
  const res = await axiosInstance.post(
    "/videos",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const incrementVideoViews = async (videoId) => {
  const response = await axiosInstance.patch(
    `/videos/${videoId}/views`
  );

  return response.data;
};

export const updateVideo = async (videoId, formData) => {
  const response = await axiosInstance.patch(
    `/videos/${videoId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const deleteVideo = async (videoId) => {
  const response = await axiosInstance.delete(`/videos/${videoId}`);
  return response.data;
};