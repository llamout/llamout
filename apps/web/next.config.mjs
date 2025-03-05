/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTANTDB_KEY: process.env.INSTANTDB_APP_ID,
    // Google
    GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    GOOGLE_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_NAME: 'google',
    // CRISP
    CRISP_ID: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
  },
  transpilePackages: ['@workspace/ui'],
  images: {
    domains: ['nostr.build'],
  },
};

export default nextConfig;
