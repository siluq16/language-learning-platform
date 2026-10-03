import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared/types", "@shared/constants", "@shared/api-contracts"],
};

export default nextConfig;
