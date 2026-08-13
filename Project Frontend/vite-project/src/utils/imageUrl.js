export const getSecureImageUrl = (url) => {
  if (!url) return "";
  return url.replace(/^http:\/\//i, "https://");
};