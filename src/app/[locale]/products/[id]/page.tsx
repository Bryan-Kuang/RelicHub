import { productAdapter } from "@/lib/demo-adapter";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locales } from "@/i18n/routing";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
              <span className="text-gray-400">暂无图片</span>
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

          {product.amazonUrl && (
            <div>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {t.buyOnAmazon}
              </a>
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
                      <span className="text-gray-400">暂无图片</span>
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
