import { prisma } from "@/lib/db";
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
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

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
    return await prisma.product.findMany({
      where: {
        categoryId,
        id: { not: currentProductId },
      },
      take: 3,
      include: { category: true },
    });
  } catch (error) {
    console.error("获取相关产品失败:", error);
    return [];
  }
}

type Props = {
  params: { locale: string; id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
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
  const t = messages.products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 产品图片 */}
        <div className="relative h-96 bg-white rounded-lg overflow-hidden shadow-md">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">
                {locale === "zh" ? "无图片" : "No Image"}
              </span>
            </div>
          )}
        </div>

        {/* 产品信息 */}
        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {locale === "zh" ? "分类：" : "Category: "}
            <Link
              href={`/categories/${product.categoryId}`}
              className="text-amber-700 hover:underline"
            >
              {product.category.name}
            </Link>
          </p>
          <p className="text-2xl font-bold text-amber-700 mb-6">
            ¥{product.price.toLocaleString()}
          </p>
          <div className="prose max-w-none mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t.description}
            </h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {product.amazonUrl && (
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t.buyOnAmazon}
            </a>
          )}
        </div>
      </div>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            {t.relatedProducts}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  {relatedProduct.imageUrl ? (
                    <Image
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500">
                        {locale === "zh" ? "无图片" : "No Image"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-amber-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {relatedProduct.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-amber-700">
                      ¥{relatedProduct.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="bg-amber-700 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-800 transition-colors"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
