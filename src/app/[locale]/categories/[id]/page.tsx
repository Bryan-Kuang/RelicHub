import { categoryAdapter, productAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
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

// 获取分类详情
async function getCategory(id: string) {
  try {
    const category = await categoryAdapter.findUnique(id);

    if (!category) {
      return null;
    }

    return category;
  } catch (error) {
    console.error(`获取分类详情失败: ${id}`, error);
    return null;
  }
}

// 获取分类下的产品
async function getCategoryProducts(categoryId: string) {
  try {
    return await productAdapter.findMany({
      where: { categoryId },
      include: { category: true },
    });
  } catch (error) {
    console.error(`获取分类产品失败: ${categoryId}`, error);
    return [];
  }
}

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function CategoryDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  const category = await getCategory(id);

  // 如果分类不存在，返回404页面
  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(category.id);
  const messages = await getMessages(locale);
  const t = messages.categories;
  const productT = messages.products;

  // 分类图片映射（示例）
  const categoryImages: Record<string, string> = {
    ceramics:
      "https://images.unsplash.com/photo-1516467716199-601c63cfa8ff?w=1200&q=80",
    jade: "https://images.unsplash.com/photo-1541888758521-400c6c172baf?w=1200&q=80",
    painting:
      "https://images.unsplash.com/photo-1583684977172-528983104f31?w=1200&q=80",
    bronze:
      "https://images.unsplash.com/photo-1584283367830-3a0d1a97d66e?w=1200&q=80",
  };

  const bgImage =
    categoryImages[category.id.toLowerCase()] ||
    "https://images.unsplash.com/photo-1621208057783-ac647e56cb4c?w=1200&q=80";

  return (
    <div>
      {/* 分类头部 */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg">
              {products.length} {t.products}
            </p>
          </div>
        </div>
      </div>

      {/* 产品列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-gray-700">{category.description}</p>
        </div>

        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">{productT.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}
