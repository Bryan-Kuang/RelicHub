// 性能缓存层 - 减少数据库查询
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, ttl: number = 300000): void {
    // 默认5分钟TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  clear(): void {
    this.cache.clear();
  }

  // 获取缓存状态
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// 全局缓存实例
export const performanceCache = new PerformanceCache();

// 缓存装饰器
export function withCache<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl: number = 300000
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);

    // 尝试从缓存获取
    const cached = performanceCache.get<R>(key);
    if (cached) {
      return cached;
    }

    // 执行函数并缓存结果
    const result = await fn(...args);
    performanceCache.set(key, result, ttl);

    return result;
  };
}

// 预定义的缓存键生成器
export const cacheKeys = {
  products: (options?: any) => `products_${JSON.stringify(options || {})}`,
  categories: (options?: any) => `categories_${JSON.stringify(options || {})}`,
  product: (id: string) => `product_${id}`,
  category: (id: string) => `category_${id}`,
  stats: () => "dashboard_stats",
  featuredProducts: (take?: number) => `featured_products_${take || "all"}`,
  categoryProducts: (categoryId: string, take?: number) =>
    `category_${categoryId}_products_${take || "all"}`,
};
