/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Allow images from these domains
  images: {
    domains: ["example.com"],
  },

  // If you access dev server from external domains
  allowedDevOrigins: [
    "https://is40k4cg8wo0gs80gcgw4kcg.62.72.57.193.sslip.io", // replace with your URL
  ],

  // Transpile slick-carousel to allow CSS imports from node_modules
  transpilePackages: ["slick-carousel"],

  // App directory experimental feature
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;