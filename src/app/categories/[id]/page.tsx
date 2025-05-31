import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryAdapter, productAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getCategory(id: string) {
  try {
    const category = await categoryAdapter.findUnique(id);
    return category;
  } catch (error) {
    console.error("获取类别详情失败:", error);
    return null;
  }
}

async function getCategoryProducts(categoryId: string) {
  try {
    return await productAdapter.findMany({
      where: { categoryId },
      include: { category: true },
    });
  } catch (error) {
    console.error("获取分类产品失败:", error);
    return [];
  }
}

export default async function CategoryPage(props: Props) {
  const { params } = props;
  const resolvedParams = await params;
  const id = String(resolvedParams.id);

  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  // 获取该分类下的产品
  const categoryProducts = await getCategoryProducts(category.id);

  return (
    <div className="bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-900">{category.name}</h1>
          <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
          {category.description && (
            <p className="mt-4 text-lg text-gray-700">{category.description}</p>
          )}
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">该分类暂无藏品</p>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/categories"
            className="text-amber-700 font-medium hover:text-amber-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            返回所有分类
          </Link>
        </div>
      </div>
    </div>
  );
}
