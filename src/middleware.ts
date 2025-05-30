import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 匹配需要国际化的路径，排除静态资源和API路由
  matcher: [
    // 匹配所有路径
    "/",
    // 匹配所有语言路径 (/en/*, /zh/*)
    "/(en|zh)/:path*",
    // 排除特定路径
    "/((?!api|_next/static|_next/image|favicon.ico|images|products))(.+)",
  ],
};
