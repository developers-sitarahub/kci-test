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
        protocol: 'https',
        hostname: 'd193v9m7vnr083.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'kci-media.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'kci-media.s3.amazonaws.com',
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
