import axiosInstance from "./axiosInstance";

// Get all comments of a video
export const getComments = async (videoId) => {
  const response = await axiosInstance.get(`/comments/${videoId}`);
  return response.data.data;
};


// Get all comments on my uploaded videos
export const getMyVideoComments = async () => {
  const response = await axiosInstance.get("/comments/my-comments");
  return response.data.data;
};


// Add comment
export const addComment = async (videoId, content) => {
  const response = await axiosInstance.post(`/comments/${videoId}`, {
    content,
  });

  return response.data.data;
};

// Update comment
export const updateComment = async (commentId, content) => {
  const response = await axiosInstance.patch(
    `/comments/c/${commentId}`,
    {
      content,
    }
  );

  return response.data.data;
};

// Delete comment
export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(
    `/comments/c/${commentId}`
  );

  return response.data.data;
};

