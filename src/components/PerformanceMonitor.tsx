"use client";

import { useEffect } from "react";

interface PerformanceData {
  route: string;
  loadTime: number;
  renderTime: number;
  timestamp: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // 监控页面性能
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        // 等待页面完全加载
        window.addEventListener("load", () => {
          const navigation = performance.getEntriesByType(
            "navigation"
          )[0] as PerformanceNavigationTiming;

          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            const renderTime =
              navigation.domContentLoadedEventEnd - navigation.fetchStart;

            const perfData: PerformanceData = {
              route: window.location.pathname,
              loadTime: Math.round(loadTime),
              renderTime: Math.round(renderTime),
              timestamp: Date.now(),
            };

            // 在开发环境下输出性能数据
            if (process.env.NODE_ENV === "development") {
              console.group("🚀 页面性能数据");
              console.log("页面路径:", perfData.route);
              console.log("页面加载时间:", perfData.loadTime + "ms");
              console.log("DOM渲染时间:", perfData.renderTime + "ms");
              console.groupEnd();
            }

            // 发送性能数据到分析服务（可选）
            // sendPerformanceData(perfData);
          }
        });

        // 监控 Core Web Vitals
        const observeWebVitals = () => {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (process.env.NODE_ENV === "development") {
              console.log(
                "LCP (最大内容绘制):",
                Math.round(lastEntry.startTime) + "ms"
              );
            }
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

          // First Input Delay (FID) - 通过 event timing API
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (process.env.NODE_ENV === "development") {
                console.log(
                  "FID (首次输入延迟):",
                  Math.round(
                    (entry.processingStart || entry.startTime) - entry.startTime
                  ) + "ms"
                );
              }
            });
          });
          fidObserver.observe({ entryTypes: ["first-input"] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            if (process.env.NODE_ENV === "development") {
              console.log("CLS (累积布局偏移):", clsValue.toFixed(4));
            }
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });
        };

        // 启动 Web Vitals 监控
        observeWebVitals();
      }
    };

    measurePerformance();
  }, []);

  return null; // 这是一个隐形的监控组件
};

// 可选：发送性能数据到分析服务
const sendPerformanceData = async (data: PerformanceData) => {
  try {
    // 这里可以发送到你的分析服务
    // await fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  } catch (error) {
    console.error("发送性能数据失败:", error);
  }
};

export default PerformanceMonitor;
