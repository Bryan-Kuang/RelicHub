import Link from "next/link";
import { prisma } from "@/lib/db";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  } catch (error) {
    console.error("获取类别失败:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-900">藏品分类</h1>
          <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">按类别浏览我们的古玩藏品</p>
        </div>

        {categories.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-amber-900">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="mt-2 text-gray-600">{category.description}</p>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {category._count.products} 件藏品
                    </span>
                    <span className="text-amber-700 text-sm font-medium">
                      查看详情 &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无分类</p>
          </div>
        )}
      </div>
    </div>
  );
}
