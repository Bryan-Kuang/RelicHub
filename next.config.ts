import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// Bundle analyzer 支持
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// 创建next-intl插件
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sdmntpreastus.oaiusercontent.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "www.dgxcjt.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.dgxcjt.com",
        pathname: "**",
      },
    ],
    // 图片优化配置
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400, // 24小时缓存
    dangerouslyAllowSVG: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 生产环境优化
  compress: true,
  poweredByHeader: false,
  generateEtags: true, // 开启ETag支持缓存
  reactStrictMode: true,
  swcMinify: true,
  // 页面缓存配置
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  // 实验性配置优化
  experimental: {
    // 开启静态生成优化
    optimizePackageImports: ["@/components", "@/lib"],
  },

  // 外部包配置（Next.js 15的正确配置）
  serverExternalPackages: ["prisma", "@prisma/client"],

  // 输出配置优化
  output: "standalone",
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
