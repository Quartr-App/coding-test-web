/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    minimumCacheTTL: 2678400 * 6, // 3 months
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.quartr.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
