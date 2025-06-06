import Link from "next/link";
import Image from "next/image";
import { productAdapter, categoryAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
import { locales } from "@/i18n/routing";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 添加ISR缓存
export const revalidate = 300; // 5分钟重新验证

// 获取翻译消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return (await import(`../../messages/en.json`)).default;
  }
}

async function getFeaturedProducts() {
  try {
    return await productAdapter.findMany({
      where: { featured: true },
      include: { category: true },
      take: 6,
    });
  } catch (error) {
    console.error("获取精选产品失败:", error);
    return [];
  }
}

async function getCategories() {
  try {
    return await categoryAdapter.findMany({
      take: 4,
    });
  } catch (error) {
    console.error("获取分类失败:", error);
    return [];
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();
  const messages = await getMessages(locale);
  const t = messages.home;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-amber-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-amber-700 mb-8 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
          <Link
            href="/products"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                {t.heritage.title}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t.heritage.description}
              </p>
              <Link
                href="/categories"
                className="inline-block mt-4 text-amber-700 font-medium hover:text-amber-800"
              >
                {t.heritage.learnMore} &rarr;
              </Link>
            </div>
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/heritage-banner.jpg"
                alt="Heritage Banner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t.featured.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t.featured.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              {t.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t.categories.title}
          </h2>
          <p className="text-lg text-gray-600">{t.categories.subtitle}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl text-amber-700">🏺</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {(category as any)._count?.products ||
                    (category as any).products?.length ||
                    0}{" "}
                  {messages.categories.products}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-block text-amber-700 hover:text-amber-800 font-medium"
            >
              {t.categories.viewAll} &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
