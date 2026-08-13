import axiosInstance from "./axiosInstance";

// Create Tweet
export const createTweet = async (content) => {
  const response = await axiosInstance.post("/tweets", {
    content,
  });

  return response.data.data;
};

// Get User Tweets
export const getUserTweets = async (userId) => {
  const response = await axiosInstance.get(`/tweets/user/${userId}`);

  return response.data.data;
};

// Update Tweet
export const updateTweet = async (tweetId, content) => {
  const response = await axiosInstance.patch(`/tweets/${tweetId}`, {
    content,
  });

  return response.data.data;
};

// Delete Tweet
export const deleteTweet = async (tweetId) => {
  const response = await axiosInstance.delete(`/tweets/${tweetId}`);

  return response.data.data;
};

