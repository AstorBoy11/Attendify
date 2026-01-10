import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
