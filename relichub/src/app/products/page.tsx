import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: { category: true },
    });
  } catch (error) {
    console.error("获取产品失败:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-900">古玩藏品</h1>
          <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">
            浏览我们精心收集的古玩珍品
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无藏品</p>
          </div>
        )}
      </div>
    </div>
  );
}
