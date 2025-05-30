"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("navigation");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // 创建引用用于追踪下拉菜单DOM元素
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  // 切换主菜单
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLangMenuOpen) setIsLangMenuOpen(false);
  };

  // 切换语言菜单
  const toggleLangMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止事件冒泡
    setIsLangMenuOpen(!isLangMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // 切换语言 - 基于next-intl 4.x优化
  const switchLanguage = (newLocale: string) => {
    if (locale === newLocale) {
      setIsLangMenuOpen(false);
      return;
    }

    // 设置cookie以确保语言切换正确
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // 使用router.push跳转到新语言的页面
    try {
      // 强制刷新页面以确保完全切换语言
      window.location.href = `/${newLocale}${
        pathname.startsWith(`/${locale}`)
          ? pathname.slice(locale.length + 1)
          : pathname
      }`;
    } catch (error) {
      console.error("语言切换错误:", error);
    }

    // 关闭语言菜单
    setIsLangMenuOpen(false);
  };

  // 点击其他地方关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        langButtonRef.current &&
        !langMenuRef.current.contains(event.target as Node) &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    }

    // 添加全局点击事件监听器
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 清理事件监听器
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-amber-800 text-white shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">
                {locale === "zh" ? "古玩珍藏" : "RelicHub"}
              </span>
            </Link>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === `/${locale}` || pathname === "/"
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.includes("/products")
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
            >
              {t("products")}
            </Link>
            <Link
              href="/categories"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.includes("/categories")
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
            >
              {t("categories")}
            </Link>
            {session ? (
              <>
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname.includes("/admin")
                        ? "bg-amber-900"
                        : "hover:bg-amber-700"
                    }`}
                  >
                    {t("admin")}
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  type="button"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes("/login")
                      ? "bg-amber-900"
                      : "hover:bg-amber-700"
                  }`}
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes("/register")
                      ? "bg-amber-900"
                      : "hover:bg-amber-700"
                  }`}
                >
                  {t("register")}
                </Link>
              </>
            )}

            {/* 语言切换下拉菜单 */}
            <div className="relative ml-3">
              <button
                ref={langButtonRef}
                onClick={toggleLangMenu}
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 flex items-center"
              >
                <span className="mr-1">
                  {locale === "zh" ? "中文" : "English"}
                </span>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isLangMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {isLangMenuOpen && (
                <div
                  ref={langMenuRef}
                  className="absolute right-0 mt-2 w-36 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="py-1">
                    <button
                      onClick={() => switchLanguage("en")}
                      type="button"
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === "en"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      } hover:bg-gray-100`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => switchLanguage("zh")}
                      type="button"
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === "zh"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      } hover:bg-gray-100`}
                    >
                      中文
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            {/* 移动端语言切换按钮 */}
            <button
              ref={langButtonRef}
              onClick={toggleLangMenu}
              type="button"
              className="p-2 rounded-md text-white hover:bg-amber-700 mr-2"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </button>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端语言菜单 */}
      {isLangMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          onClick={() => setIsLangMenuOpen(false)}
        >
          <div
            ref={langMenuRef}
            className="absolute top-16 right-4 w-40 rounded-md shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2 divide-y divide-gray-100">
              <button
                onClick={() => switchLanguage("en")}
                type="button"
                className={`block w-full text-left px-4 py-3 text-sm ${
                  locale === "en"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } hover:bg-gray-100`}
              >
                English
              </button>
              <button
                onClick={() => switchLanguage("zh")}
                type="button"
                className={`block w-full text-left px-4 py-3 text-sm ${
                  locale === "zh"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } hover:bg-gray-100`}
              >
                中文
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 移动端主菜单 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${locale}` || pathname === "/"
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.includes("/products")
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("products")}
            </Link>
            <Link
              href="/categories"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.includes("/categories")
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("categories")}
            </Link>
            {session ? (
              <>
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.includes("/admin")
                        ? "bg-amber-900"
                        : "hover:bg-amber-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("admin")}
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  type="button"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.includes("/login")
                      ? "bg-amber-900"
                      : "hover:bg-amber-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.includes("/register")
                      ? "bg-amber-900"
                      : "hover:bg-amber-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
