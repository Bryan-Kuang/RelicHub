"use client";

import { Suspense, lazy, ComponentType } from "react";
import { Spin } from "antd";

interface LazyWrapperProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

// 默认加载指示器
const DefaultFallback = ({ className }: { className?: string }) => (
  <div
    className={`flex justify-center items-center min-h-[200px] ${
      className || ""
    }`}
  >
    <Spin size="large" tip="加载中..." />
  </div>
);

// 懒加载包装器
const LazyWrapper = ({ children, fallback, className }: LazyWrapperProps) => {
  return (
    <Suspense fallback={fallback || <DefaultFallback className={className} />}>
      {children}
    </Suspense>
  );
};

// 创建懒加载组件的工具函数
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);

  const WrappedComponent = (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );

  WrappedComponent.displayName = `LazyComponent`;

  return WrappedComponent;
};

// 预定义的懒加载组件
export const LazyProductCard = createLazyComponent(
  () => import("./ProductCard"),
  <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full" />
);

export const LazySearchBar = createLazyComponent(
  () => import("./SearchBar"),
  <div className="animate-pulse bg-gray-200 rounded-lg h-10 w-full" />
);

// 骨架屏组件
export const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
      <div className="bg-gray-200 rounded h-6 w-1/4"></div>
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-32 w-full mb-3"></div>
    <div className="bg-gray-200 rounded h-4 w-2/3 mb-2"></div>
    <div className="bg-gray-200 rounded h-3 w-full"></div>
  </div>
);

export default LazyWrapper;
