/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://files.quartr.com/**")],
  },
};

module.exports = nextConfig;
