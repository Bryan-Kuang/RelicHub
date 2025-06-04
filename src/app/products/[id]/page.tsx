import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { productAdapter } from "@/lib/demo-adapter";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getProduct(id: string) {
  try {
    const product = await productAdapter.findUnique(id);
    return product;
  } catch (error) {
    console.error("获取产品详情失败:", error);
    return null;
  }
}

export default async function ProductPage(props: Props) {
  const { params } = props;
  const resolvedParams = await params;
  const id = String(resolvedParams.id);

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

              {/* 购买链接部分 */}
              {(product.amazonUrl || product.ebayUrl) && (
                <div className="mt-8 space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    购买链接
                  </h3>

                  <div className="flex flex-col space-y-2">
                    {product.amazonUrl && (
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 6.655 3.167 9.058 3.167 2.833 0 5.937-1.017 9.313-3.048.16-.097.28-.095.358.01.077.106.067.21-.031.31-.975.997-2.678 1.995-5.11 2.993-2.433.998-4.677 1.497-6.732 1.497-2.746 0-5.196-.997-7.35-2.993-.22-.203-.16-.412.146-.914z" />
                          <path d="M20.73 15.41c-.15 0-.31-.05-.42-.15l-6.25-5.1c-.31-.25-.36-.7-.11-1.01.25-.31.7-.36 1.01-.11l6.25 5.1c.31.25.36.7.11 1.01-.14.17-.34.26-.59.26z" />
                        </svg>
                        在亚马逊购买
                      </a>
                    )}

                    {product.ebayUrl && (
                      <a
                        href={product.ebayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M6.5 7.8c-1.1 0-2 .5-2.5 1.4V9h1.6v-.2c.2-.4.6-.7 1.1-.7.8 0 1.3.6 1.3 1.5v.4H6.6c-1.6 0-2.6.7-2.6 1.9 0 1.1.8 1.9 2.1 1.9.8 0 1.4-.3 1.8-.9h.1v.8h1.5V9.8c0-1.2-.9-2-2.5-2zm.9 4.5c0 .6-.5 1-1.2 1-.5 0-.8-.3-.8-.7 0-.4.3-.7.9-.7h1.1v.4z" />
                          <path d="M12.5 7.8c-1.7 0-2.8 1.3-2.8 2.9s1.1 2.9 2.8 2.9c1.7 0 2.8-1.3 2.8-2.9s-1.1-2.9-2.8-2.9zm0 4.5c-.8 0-1.3-.7-1.3-1.6s.5-1.6 1.3-1.6 1.3.7 1.3 1.6-.5 1.6-1.3 1.6z" />
                          <path d="M18.1 7.8c-.7 0-1.3.3-1.7.8h-.1V8h-1.6v5.5h1.6v-3.2c0-.9.5-1.4 1.2-1.4.7 0 1.1.5 1.1 1.3v3.3h1.6v-3.6c0-1.4-.8-2.1-2.1-2.1z" />
                        </svg>
                        在eBay购买
                      </a>
                    )}
                  </div>
                </div>
              )}
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
