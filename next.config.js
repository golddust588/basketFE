/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3basket.s3.eu-north-1.amazonaws.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  env: {
    SERVER_URL: "http://localhost:3001",
    // SERVER_URL: "https://forum-backend-88i9.onrender.com",
  },
};
