export const getOptimizedImage = (url, width = 400) => {
    if (!url) return '';
    // Transform URL Yelp ke CDN image optimizer
    // Contoh menggunakan Cloudinary (gratis tier) atau ImageKit
    return `https://ik.imagekit.io/YOUR_ID/tr:w-${width}/${encodeURIComponent(url)}`;
};
