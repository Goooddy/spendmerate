import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/products/risk-audit-esg", destination: "/products/risk-audit", permanent: true }];
  },
};

export default nextConfig;
