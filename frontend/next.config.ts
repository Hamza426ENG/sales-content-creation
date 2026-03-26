import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sales-content-creation",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
