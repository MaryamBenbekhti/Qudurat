import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app"],
    },
  },
  serverExternalPackages: ["pg", "@prisma/adapter-pg", "pg-native"],
};

export default nextConfig;
