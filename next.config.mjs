/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 828, 1200],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
