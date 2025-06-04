// 数据适配器 - 根据演示模式选择数据源
// Data adapter - Choose data source based on demo mode

import { prisma } from "@/lib/db";
import {
  demoCategories,
  demoProducts,
  demoUsers,
  demoProductsWithCategories,
  demoStats,
} from "./demo-data";

// 检查是否为演示模式
const isDemoMode = process.env.DEMO_MODE === "true";

console.log(`🎭 演示模式: ${isDemoMode ? "开启" : "关闭"}`);

// 分类数据适配器
export const categoryAdapter = {
  async findMany(options?: { include?: any; take?: number }) {
    if (isDemoMode) {
      let categories = demoCategories.map((cat) => ({
        ...cat,
        products: demoProducts.filter(
          (product) => product.categoryId === cat.id
        ),
        _count: {
          products: demoProducts.filter(
            (product) => product.categoryId === cat.id
          ).length,
        },
      }));

      // 限制数量
      if (options?.take) {
        categories = categories.slice(0, options.take);
      }

      return categories;
    }
    return await prisma.category.findMany({
      include: {
        products: true,
        _count: { select: { products: true } },
      },
      ...options,
    });
  },

  async findUnique(id: string) {
    if (isDemoMode) {
      const category = demoCategories.find((cat) => cat.id === id);
      if (category) {
        return {
          ...category,
          products: demoProducts.filter((product) => product.categoryId === id),
        };
      }
      return null;
    }
    return await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  },

  async count() {
    if (isDemoMode) {
      return demoCategories.length;
    }
    return await prisma.category.count();
  },
};

// 产品数据适配器
export const productAdapter = {
  async findMany(options?: {
    where?: any;
    include?: any;
    orderBy?: any;
    take?: number;
  }) {
    if (isDemoMode) {
      let products = demoProductsWithCategories;

      // 简单的过滤逻辑
      if (options?.where?.featured !== undefined) {
        products = products.filter(
          (p) => p.featured === options.where.featured
        );
      }
      if (options?.where?.categoryId) {
        products = products.filter(
          (p) => p.categoryId === options.where.categoryId
        );
      }

      // 简单的排序
      if (options?.orderBy?.createdAt === "desc") {
        products = [...products].reverse();
      }

      // 限制数量
      if (options?.take) {
        products = products.slice(0, options.take);
      }

      return products;
    }

    return await prisma.product.findMany({
      include: { category: true },
      ...options,
    });
  },

  async findUnique(id: string) {
    if (isDemoMode) {
      const product = demoProducts.find((p) => p.id === id);
      if (product) {
        return {
          ...product,
          category: demoCategories.find(
            (cat) => cat.id === product.categoryId
          )!,
        };
      }
      return null;
    }

    return await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  async count(where?: any) {
    if (isDemoMode) {
      if (where?.featured !== undefined) {
        return demoProducts.filter((p) => p.featured === where.featured).length;
      }
      return demoProducts.length;
    }

    return await prisma.product.count({ where });
  },
};

// 用户数据适配器
export const userAdapter = {
  async findUnique(emailOrId: string, byEmail = false) {
    if (isDemoMode) {
      if (byEmail) {
        return demoUsers.find((user) => user.email === emailOrId) || null;
      } else {
        return demoUsers.find((user) => user.id === emailOrId) || null;
      }
    }

    if (byEmail) {
      return await prisma.user.findUnique({
        where: { email: emailOrId },
      });
    } else {
      return await prisma.user.findUnique({
        where: { id: emailOrId },
      });
    }
  },

  async create(data: any) {
    if (isDemoMode) {
      // 演示模式下不创建真实用户，返回模拟响应
      console.log("🎭 演示模式：用户注册请求已收到但未保存");
      return {
        id: `demo-user-${Date.now()}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return await prisma.user.create({ data });
  },
};

// 统计数据适配器
export const statsAdapter = {
  async getDashboardStats() {
    if (isDemoMode) {
      return demoStats;
    }

    const productsCount = await prisma.product.count();
    const categoriesCount = await prisma.category.count();
    const featuredProductsCount = await prisma.product.count({
      where: { featured: true },
    });

    return {
      productsCount,
      categoriesCount,
      featuredProductsCount,
    };
  },
};
