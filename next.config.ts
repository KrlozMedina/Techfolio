import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com'
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com'
      },
      {
        protocol: 'https',
        hostname: 'www.firgelliauto.com'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
    ]
  },
};

export default nextConfig;