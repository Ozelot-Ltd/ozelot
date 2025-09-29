import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    'http://192.168.1.4:3000',
    'http://192.168.1.4',
    '192.168.1.4:3000',
    '192.168.1.4',
  ],
};

export default withBundleAnalyzer(nextConfig);
