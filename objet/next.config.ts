/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-75e2d10083024fa894c5ac514beae490.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;