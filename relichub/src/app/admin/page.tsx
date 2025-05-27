import { prisma } from "@/lib/db";
import Link from "next/link";

async function getDashboardStats() {
  try {
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
  } catch (error) {
    console.error("获取统计数据失败:", error);
    return {
      productsCount: 0,
      categoriesCount: 0,
      featuredProductsCount: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">管理控制台</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">藏品总数</h2>
          <p className="text-3xl font-bold text-amber-700 mt-2">
            {stats.productsCount}
          </p>
          <Link
            href="/admin/products"
            className="text-sm text-amber-600 hover:text-amber-800 mt-2 inline-block"
          >
            管理藏品 &rarr;
          </Link>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">分类总数</h2>
          <p className="text-3xl font-bold text-amber-700 mt-2">
            {stats.categoriesCount}
          </p>
          <Link
            href="/admin/categories"
            className="text-sm text-amber-600 hover:text-amber-800 mt-2 inline-block"
          >
            管理分类 &rarr;
          </Link>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">精选藏品</h2>
          <p className="text-3xl font-bold text-amber-700 mt-2">
            {stats.featuredProductsCount}
          </p>
          <Link
            href="/admin/products?featured=true"
            className="text-sm text-amber-600 hover:text-amber-800 mt-2 inline-block"
          >
            查看精选藏品 &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            快速操作
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/products/new"
              className="block bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors text-center"
            >
              添加新藏品
            </Link>
            <Link
              href="/admin/categories/new"
              className="block bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors text-center"
            >
              添加新分类
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-900 mb-4">提示</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-700">
            <p className="text-sm">
              添加精选藏品可以在首页展示，吸引更多访客关注。确保为每个藏品添加高质量的图片和详细描述，以提高转化率。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
