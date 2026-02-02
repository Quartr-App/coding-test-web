/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.quartr.com',
      },
      {
        protocol: 'https',
        hostname:  'images.pexels.com',
      },
    ],
  },
  
}

module.exports = nextConfig
