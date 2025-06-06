"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  text,
  overlay = false,
  className = "",
}: LoadingSpinnerProps) => {
  const locale = useLocale();
  const defaultText = locale === "zh" ? "加载中..." : "Loading...";
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const spinnerContent = (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {/* 传统工艺风格的加载动画 */}
      <div className="relative">
        {/* 外圈 */}
        <div
          className={`${sizeClasses[size]} border-4 border-amber-200 rounded-full animate-spin`}
        >
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-amber-600 rounded-full animate-pulse"></div>
        </div>
        {/* 内圈装饰 */}
        <div className="absolute inset-2 bg-amber-50 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
        </div>
      </div>

      {(text || defaultText) && (
        <div
          className={`${textSizeClasses[size]} text-amber-700 font-medium animate-pulse`}
        >
          {text || defaultText}
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// 页面加载动画组件
export const PageLoadingSpinner = () => {
  const locale = useLocale();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-50 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* 主加载动画 */}
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-amber-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-amber-600 rounded-full"></div>
          </div>
          <div className="absolute inset-4 bg-amber-50 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-600 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* 加载文字 */}
        <div className="text-xl font-medium text-amber-800 mb-2">
          {locale === "zh" ? `正在加载页面${dots}` : `Loading page${dots}`}
        </div>
        <div className="text-sm text-amber-600">
          {locale === "zh"
            ? "请稍候，为您准备精美的传统手工艺品"
            : "Please wait, preparing exquisite traditional handicrafts for you"}
        </div>

        {/* 装饰性元素 */}
        <div className="flex justify-center space-x-2 mt-6">
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// 简单的内联加载器
export const InlineLoader = ({ text }: { text?: string }) => {
  const locale = useLocale();
  const defaultText = locale === "zh" ? "加载中..." : "Loading...";

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <div className="w-4 h-4 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
      <span className="text-amber-700 text-sm">{text || defaultText}</span>
    </div>
  );
};

export default LoadingSpinner;
