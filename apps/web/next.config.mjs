/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTANTDB_KEY: process.env.INSTANTDB_APP_ID,
    GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
  transpilePackages: ['@workspace/ui'],
};

export default nextConfig;
