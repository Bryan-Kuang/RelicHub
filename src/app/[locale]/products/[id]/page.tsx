import { productAdapter } from "@/lib/demo-adapter";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locales } from "@/i18n/routing";

// 配置页面为动态渲染
export const dynamic = "force-dynamic";

// 获取翻译消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // 回退到默认语言
    return (await import(`../../../../messages/en.json`)).default;
  }
}

// 获取产品详情
async function getProduct(id: string) {
  try {
    const product = await productAdapter.findUnique(id);

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.error(`获取产品详情失败: ${id}`, error);
    return null;
  }
}

// 获取相关产品
async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  try {
    const products = await productAdapter.findMany({
      where: { categoryId },
      include: { category: true },
      take: 3,
    });

    // 过滤掉当前产品
    return products.filter((product) => product.id !== currentProductId);
  } catch (error) {
    console.error("获取相关产品失败:", error);
    return [];
  }
}

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  const product = await getProduct(id);

  // 如果产品不存在，返回404页面
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  );
  const messages = await getMessages(locale);
  const t = messages.product;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 产品图片 */}
        <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">{t.noImage}</span>
            </div>
          )}
        </div>

        {/* 产品信息 */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm text-amber-600 font-medium mb-2">
              {product.category.name}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-amber-600 mb-4">
              ¥{product.price.toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t.description}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 购买链接部分 */}
          {(product.amazonUrl || product.ebayUrl) && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">
                {t.purchaseLinks}
              </h3>

              <div className="flex flex-col space-y-2">
                {product.amazonUrl && (
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 6.655 3.167 9.058 3.167 2.833 0 5.937-1.017 9.313-3.048.16-.097.28-.095.358.01.077.106.067.21-.031.31-.975.997-2.678 1.995-5.11 2.993-2.433.998-4.677 1.497-6.732 1.497-2.746 0-5.196-.997-7.35-2.993-.22-.203-.16-.412.146-.914z" />
                      <path d="M20.73 15.41c-.15 0-.31-.05-.42-.15l-6.25-5.1c-.31-.25-.36-.7-.11-1.01.25-.31.7-.36 1.01-.11l6.25 5.1c.31.25.36.7.11 1.01-.14.17-.34.26-.59.26z" />
                    </svg>
                    {t.buyOnAmazon}
                  </a>
                )}

                {product.ebayUrl && (
                  <a
                    href={product.ebayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.5 7.8c-1.1 0-2 .5-2.5 1.4V9h1.6v-.2c.2-.4.6-.7 1.1-.7.8 0 1.3.6 1.3 1.5v.4H6.6c-1.6 0-2.6.7-2.6 1.9 0 1.1.8 1.9 2.1 1.9.8 0 1.4-.3 1.8-.9h.1v.8h1.5V9.8c0-1.2-.9-2-2.5-2zm.9 4.5c0 .6-.5 1-1.2 1-.5 0-.8-.3-.8-.7 0-.4.3-.7.9-.7h1.1v.4z" />
                      <path d="M12.5 7.8c-1.7 0-2.8 1.3-2.8 2.9s1.1 2.9 2.8 2.9c1.7 0 2.8-1.3 2.8-2.9s-1.1-2.9-2.8-2.9zm0 4.5c-.8 0-1.3-.7-1.3-1.6s.5-1.6 1.3-1.6 1.3.7 1.3 1.6-.5 1.6-1.3 1.6z" />
                      <path d="M18.1 7.8c-.7 0-1.3.3-1.7.8h-.1V8h-1.6v5.5h1.6v-3.2c0-.9.5-1.4 1.2-1.4.7 0 1.1.5 1.1 1.3v3.3h1.6v-3.6c0-1.4-.8-2.1-2.1-2.1z" />
                    </svg>
                    {t.buyOnEbay}
                  </a>
                )}
              </div>
            </div>
          )}

          {product.featured && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 font-medium">✨ {t.featured}</p>
            </div>
          )}
        </div>
      </div>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t.relatedProducts}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative bg-gray-100">
                  {relatedProduct.imageUrl ? (
                    <Image
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">{t.noImage}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-amber-600 font-medium">
                    ¥{relatedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
