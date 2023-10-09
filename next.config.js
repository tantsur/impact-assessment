/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['breezy-manchester.pockethost.io'],
  },
}

module.exports = nextConfig
