/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTANTDB_KEY: process.env.INSTANTDB_APP_ID,
  },
  transpilePackages: ['@workspace/ui'],
};

export default nextConfig;
