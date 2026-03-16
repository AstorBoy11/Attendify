import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.56.1'],
  /* config options here */
  async redirects() {
    return [
      {
        source: '/setting',
        destination: '/settings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
