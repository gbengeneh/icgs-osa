import type { NextConfig } from 'next';

const backendOrigin = (process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000').replace(/\/$/, '');

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend-storage/:path*',
        destination: `${backendOrigin}/storage/:path*`,
      },
      {
        source: '/backend-api/:path*',
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
