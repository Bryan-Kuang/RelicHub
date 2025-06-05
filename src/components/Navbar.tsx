"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切换主菜单
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 语言切换函数
  const handleLanguageChange = (newLocale: string) => {
    if (locale === newLocale) return;

    const currentPath = pathname.startsWith(`/${locale}`)
      ? pathname.slice(locale.length + 1)
      : pathname;

    window.location.href = `/${newLocale}${currentPath || ""}`;
  };

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

            {/* 语言切换简约按钮 */}
            <div className="ml-3 flex space-x-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === "en"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-700 hover:bg-amber-600 text-amber-100"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("zh")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === "zh"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-700 hover:bg-amber-600 text-amber-100"
                }`}
              >
                中
              </button>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            {/* 移动端语言切换 */}
            <div className="mr-2 flex space-x-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === "en"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-700 hover:bg-amber-600 text-amber-100"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("zh")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === "zh"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-700 hover:bg-amber-600 text-amber-100"
                }`}
              >
                中
              </button>
            </div>

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
