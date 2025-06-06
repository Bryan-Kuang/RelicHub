"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PageLoadingSpinner } from "./LoadingSpinner";

export default function PageTransition() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 页面开始导航时显示加载
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // 监听路由变化
    const handleRouteChangeStart = () => handleStart();
    const handleRouteChangeComplete = () => handleComplete();

    // 页面加载完成后隐藏加载动画
    handleComplete();

    // 监听页面可见性变化
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleComplete();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  // 监听链接点击事件
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.href &&
        !link.href.startsWith("#") &&
        !link.href.includes("mailto:") &&
        !link.href.includes("tel:")
      ) {
        // 检查是否是外部链接
        if (
          link.href.startsWith(window.location.origin) ||
          link.href.startsWith("/")
        ) {
          setLoading(true);

          // 设置超时保护，防止加载动画卡住
          const timeout = setTimeout(() => {
            setLoading(false);
          }, 3000);

          // 页面加载完成后清除超时
          const cleanup = () => {
            clearTimeout(timeout);
            setLoading(false);
          };

          window.addEventListener("load", cleanup, { once: true });

          return () => {
            clearTimeout(timeout);
            window.removeEventListener("load", cleanup);
          };
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  if (loading) {
    return <PageLoadingSpinner />;
  }

  return null;
}

// 导航加载Hook
export const useNavigation = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
  };
};
