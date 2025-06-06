"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PageLoadingSpinner } from "./LoadingSpinner";

interface NavigationContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigationLoading = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationLoading must be used within a NavigationProvider"
    );
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export default function NavigationProvider({
  children,
}: NavigationProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  // 监听路由变化
  useEffect(() => {
    // 路由变化时停止加载
    stopLoading();
  }, [pathname, searchParams]);

  // 监听页面加载状态
  useEffect(() => {
    // 页面初始加载完成
    const handleLoad = () => stopLoading();

    if (document.readyState === "complete") {
      stopLoading();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // 全局点击监听器
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");

        // 检查是否是内部链接
        if (
          href &&
          !href.startsWith("#") &&
          !href.startsWith("mailto:") &&
          !href.startsWith("tel:") &&
          !href.startsWith("http") &&
          !link.hasAttribute("target")
        ) {
          // 只有当链接不是当前页面时才显示加载
          const currentPath = window.location.pathname + window.location.search;
          if (href !== currentPath) {
            startLoading();
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // 浏览器后退/前进按钮
  useEffect(() => {
    const handlePopState = () => {
      startLoading();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <NavigationContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
    >
      {children}
      {isLoading && <PageLoadingSpinner />}
    </NavigationContext.Provider>
  );
}
