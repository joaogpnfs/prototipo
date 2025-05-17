/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverExternalPackages: ["@clerk/clerk-sdk-node"],
  },
};

module.exports = nextConfig;
