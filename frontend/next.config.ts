import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Recommended by Next.js terminal logs for LAN usage
  allowedDevOrigins: ['192.168.0.53', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kanjicapitalinvestments.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
};

export default nextConfig;
