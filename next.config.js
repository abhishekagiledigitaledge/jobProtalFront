/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from these domains
  images: {
    domains: ["example.com"],
  },

  // If you access dev server from external domains
  allowedDevOrigins: [
    "http://localhost:1337/",
    "http://localhost:3000/",
    "https://as044o84g44cg4w00ksksgc4.62.72.57.193.sslip.io", // replace with your URL
  ],

  // Transpile slick-carousel to allow CSS imports from node_modules
  transpilePackages: ["slick-carousel"],
};

module.exports = nextConfig;
