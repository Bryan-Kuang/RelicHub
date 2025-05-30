import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// 创建next-intl插件
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  // Turbopack支持配置
  experimental: {
    turbo: {
      resolveAlias: {
        "next-intl/config": "./src/i18n/request.ts",
      },
    },
  },
};

export default withNextIntl(nextConfig);
