export const getOptimizedImage = (url, width = 400) => {
  if (!url) return "";
  // Return original URL directly, removing ImageKit dependency
  return url;
};
