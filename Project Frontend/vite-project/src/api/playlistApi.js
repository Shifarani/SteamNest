import axiosInstance from "./axiosInstance";

export const createPlaylist = async (data) => {
  try {
    const response = await axiosInstance.post("/playlists", data);
    return response.data.data;
  } catch (error) {
    console.error("Create Playlist Error:", error);
    throw error;
  }
};

export const getUserPlaylists = async (userId) => {
  try {
    const response = await axiosInstance.get(`/playlists/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Get User Playlists Error:", error);
    throw error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.get(`/playlists/${playlistId}`);
    return response.data.data;
  } catch (error) {
    console.error("Get Playlist Error:", error);
    throw error;
  }
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlists/add/${videoId}/${playlistId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Add Video To Playlist Error:", error);
    throw error;
  }
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlists/remove/${videoId}/${playlistId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Remove Video From Playlist Error:", error);
    throw error;
  }
};

export const updatePlaylist = async (playlistId, data) => {
  try {
    const response = await axiosInstance.patch(
      `/playlists/${playlistId}`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Update Playlist Error:", error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(`/playlists/${playlistId}`);
    return response.data.data;
  } catch (error) {
    console.error("Delete Playlist Error:", error);
    throw error;
  }
};