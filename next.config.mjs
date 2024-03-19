/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
    ],
  },
};

export default nextConfig;
