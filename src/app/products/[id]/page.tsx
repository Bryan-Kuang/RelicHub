import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    return product;
  } catch (error) {
    console.error("获取产品详情失败:", error);
    return null;
  }
}

// 完全重写页面组件以解决params问题
export default async function ProductPage(props: ProductPageProps) {
  // 先解构params，然后再使用id
  const { params } = props;
  // 明确将id提取为单独变量
  const id = String(params.id);

  // 查询产品信息
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-72 md:h-full">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">无图片</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8 md:w-1/2">
              <div className="flex items-center">
                <Link
                  href={`/categories/${product.categoryId}`}
                  className="text-xs font-medium text-amber-600 hover:text-amber-700 uppercase tracking-wider"
                >
                  {product.category.name}
                </Link>
                {product.featured && (
                  <span className="ml-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                    精选
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-amber-900">
                {product.name}
              </h1>
              <div className="mt-4">
                <span className="text-2xl font-bold text-amber-700">
                  ¥{product.price.toLocaleString()}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">详细描述</h3>
                <div className="mt-2 text-gray-700 space-y-4">
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  在亚马逊购买
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/products"
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
            返回所有藏品
          </Link>
        </div>
      </div>
    </div>
  );
}
