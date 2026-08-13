import axiosInstance from "./axiosInstance";


export const toggleVideoLike = async (videoId) => {
  try {

    const response = await axiosInstance.post(
      `/likes/toggle/v/${videoId}`
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || error.message;

  }
};
// Get all videos liked by current user
export const getLikedVideos = async () => {
  try {
    const response = await axiosInstance.get("/likes/videos");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};