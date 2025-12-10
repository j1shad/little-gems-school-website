/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Strict mode
  reactStrictMode: true,

  // Experimental features (optional)
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

module.exports = nextConfig
