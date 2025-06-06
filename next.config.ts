import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

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
    ],
    // 图片优化配置
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 300, // 5分钟缓存
    dangerouslyAllowSVG: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 生产环境优化
  compress: true,
  poweredByHeader: false,
  generateEtags: true, // 开启ETag支持缓存
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
  // Turbopack支持配置
  experimental: {
    turbo: {
      resolveAlias: {
        "next-intl/config": "./src/i18n/request.ts",
      },
    },
    // 开启静态生成优化
    optimizePackageImports: ["@/components", "@/lib"],
  },
};

export default withNextIntl(nextConfig);
