import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// 支持的语言列表
const locales = ["en", "zh"];

export default getRequestConfig(async ({ requestLocale }) => {
  // 获取请求的locale
  let locale = await requestLocale;

  // 确保获取到的locale是有效的
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
