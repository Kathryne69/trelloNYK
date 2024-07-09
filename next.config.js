/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['img.clerk.com', 'images.unsplash.com', 'images-global.nhst.tech'], // Add 'images-global.nhst.tech' to the domains array
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "images-global.nhst.tech",
        },
      ],
    },
  };
  
  module.exports = nextConfig;