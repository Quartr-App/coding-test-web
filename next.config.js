/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["files.quartr.com"],
    },
};

module.exports = nextConfig;
