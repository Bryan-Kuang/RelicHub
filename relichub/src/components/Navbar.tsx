"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-amber-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">古玩珍藏</span>
            </Link>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/" ? "bg-amber-900" : "hover:bg-amber-700"
              }`}
            >
              首页
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/products" ? "bg-amber-900" : "hover:bg-amber-700"
              }`}
            >
              全部藏品
            </Link>
            <Link
              href="/categories"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/categories"
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
            >
              藏品分类
            </Link>
            {session ? (
              <>
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname.startsWith("/admin")
                        ? "bg-amber-900"
                        : "hover:bg-amber-700"
                    }`}
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/login" ? "bg-amber-900" : "hover:bg-amber-700"
                }`}
              >
                登录
              </Link>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
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

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/" ? "bg-amber-900" : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/products" ? "bg-amber-900" : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              全部藏品
            </Link>
            <Link
              href="/categories"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/categories"
                  ? "bg-amber-900"
                  : "hover:bg-amber-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              藏品分类
            </Link>
            {session ? (
              <>
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.startsWith("/admin")
                        ? "bg-amber-900"
                        : "hover:bg-amber-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/login" ? "bg-amber-900" : "hover:bg-amber-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                登录
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
