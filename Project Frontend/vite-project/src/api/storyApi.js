import axiosInstance from "./axiosInstance";

// Create Story
export const createStory = async (file) => {
  const formData = new FormData();

  formData.append("story", file);

  const response = await axiosInstance.post("/stories", formData);

  return response.data.data;
};

// Get Active Stories
export const getActiveStories = async () => {
  const response = await axiosInstance.get("/stories");

  return response.data.data;
};

// Delete Story
export const deleteStory = async (storyId) => {
  const response = await axiosInstance.delete(`/stories/${storyId}`);

  return response.data;
};