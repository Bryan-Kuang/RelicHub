import { productAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

async function getProducts(search?: string, category?: string) {
  try {
    return await productAdapter.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
        ...(category ? { categoryId: category } : {}),
      },
      include: { category: true },
    });
  } catch (error) {
    console.error("获取产品失败:", error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const category = resolvedSearchParams?.category;
  const products = await getProducts(search, category);

  return (
    <div className="bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900">古玩藏品</h1>
          <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">
            浏览我们精心收集的古玩珍品
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <SearchBar />
        </div>

        {search && (
          <div className="mb-6 text-center">
            <p className="text-gray-700">
              搜索 "<span className="font-medium text-amber-800">{search}</span>
              " 的结果：
              {products.length > 0
                ? `找到 ${products.length} 件藏品`
                : "未找到匹配藏品"}
            </p>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">暂无藏品</p>
          </div>
        )}
      </div>
    </div>
  );
}
