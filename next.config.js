/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["files.quartr.com"], // Whitelist this domain
  },
};

module.exports = nextConfig;
