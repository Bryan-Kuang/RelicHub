import { prisma } from "@/lib/db";
import Link from "next/link";
import { locales } from "@/i18n/routing";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 获取翻译消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // 回退到默认语言
    return (await import(`../../../messages/en.json`)).default;
  }
}

// 获取所有分类
async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("获取分类列表失败:", error);
    return [];
  }
}

type Props = {
  params: { locale: string };
};

export default async function CategoriesPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
  const categories = await getAllCategories();
  const messages = await getMessages(locale);
  const t = messages.categories;

  // 分类图片映射（示例）
  const categoryImages: Record<string, string> = {
    ceramics:
      "https://images.unsplash.com/photo-1516467716199-601c63cfa8ff?w=600&q=80",
    jade: "https://images.unsplash.com/photo-1541888758521-400c6c172baf?w=600&q=80",
    painting:
      "https://images.unsplash.com/photo-1583684977172-528983104f31?w=600&q=80",
    bronze:
      "https://images.unsplash.com/photo-1584283367830-3a0d1a97d66e?w=600&q=80",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">{t.title}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${locale}/categories/${category.id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${
                    categoryImages[category.id.toLowerCase()] ||
                    "https://images.unsplash.com/photo-1621208057783-ac647e56cb4c?w=600&q=80"
                  })`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
                  <p className="text-sm">
                    {category._count.products} {t.products}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50">
              <div className="flex justify-between items-center">
                <span className="text-amber-900 font-medium">
                  {category.name}
                </span>
                <span className="text-amber-700 text-sm">
                  {t.viewCategory} &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
