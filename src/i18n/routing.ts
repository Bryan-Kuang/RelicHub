import { defineRouting } from "next-intl/routing";

// 支持的语言列表
export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

// 导出路由配置
export const routing = defineRouting({
  // 支持的语言
  locales,
  // 默认语言
  defaultLocale: "en",
  // 语言前缀模式（总是显示）
  localePrefix: "always",
});
