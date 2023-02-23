/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `${process.env.API_COMMON_END_POINT}/:slug*`,
        destination: `${process.env.API_BASE_URL}${process.env.API_COMMON_END_POINT}/:slug*`,
      },
    ];
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_COMMON_END_POINT: process.env.API_COMMON_END_POINT,
  },
};

module.exports = nextConfig;
