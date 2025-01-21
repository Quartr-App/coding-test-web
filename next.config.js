/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.quartr.com",
        port: "",
        pathname: "/company-logos/**",
      },
    ],
  },
};

module.exports = nextConfig;
