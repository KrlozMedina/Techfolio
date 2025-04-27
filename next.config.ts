import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'www.firgelliauto.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'www.luisllamas.es' },
      { protocol: 'https', hostname: 'wcdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
    ],
  },
};

export default nextConfig;
