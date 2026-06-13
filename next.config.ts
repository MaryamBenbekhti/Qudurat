import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
    serverExternalPackages: ["pg", "pg-native", "@prisma/adapter-pg"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["pg-native"] = false;
    }
    return config;
  },
};

export default nextConfig;
