import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { locales } from "@/i18n/routing";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { featured: true },
      take: 6,
      include: { category: true },
    });
  } catch (error) {
    console.error("获取精选产品失败:", error);
    return [];
  }
}

// 获取翻译消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // 回退到默认语言
    return (await import(`../../messages/en.json`)).default;
  }
}

type Props = {
  params: { locale: string };
};

export default async function Home({ params }: Props) {
  // 在Next.js 15中需要先处理params
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
  const featuredProducts = await getFeaturedProducts();

  // 加载翻译
  const messages = await getMessages(locale);
  const t = messages.home;

  return (
    <div className="flex flex-col">
      {/* 英雄区域 */}
      <section className="relative h-[70vh] flex items-center justify-center bg-amber-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{t.hero.subtitle}</p>
          <Link
            href={`/${locale}/products`}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1639148409279-e691156a2809?w=1200&q=80')] bg-cover bg-center"></div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              {t.about.title}
            </h2>
            <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                {t.about.description1}
              </p>
              <p className="text-lg text-gray-700 mb-4">
                {t.about.description2}
              </p>
              <Link
                href={`/${locale}/categories`}
                className="inline-block mt-4 text-amber-700 font-medium hover:text-amber-800"
              >
                {t.about.learnMore} &rarr;
              </Link>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 精选藏品 */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              {t.featured.title}
            </h2>
            <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-700">{t.featured.subtitle}</p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">{t.featured.empty}</p>
          )}

          <div className="text-center mt-10">
            <Link
              href={`/${locale}/products`}
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              {t.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* 收藏分类 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              {t.categories.title}
            </h2>
            <div className="mt-2 h-1 w-20 bg-amber-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-700">
              {t.categories.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={`/${locale}/categories/ceramics`}
              className="group relative h-40 rounded-lg overflow-hidden shadow-md"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516467716199-601c63cfa8ff?w=600&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {t.categories.ceramics}
                </span>
              </div>
            </Link>
            <Link
              href={`/${locale}/categories/jade`}
              className="group relative h-40 rounded-lg overflow-hidden shadow-md"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888758521-400c6c172baf?w=600&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {t.categories.jade}
                </span>
              </div>
            </Link>
            <Link
              href={`/${locale}/categories/painting`}
              className="group relative h-40 rounded-lg overflow-hidden shadow-md"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583684977172-528983104f31?w=600&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {t.categories.painting}
                </span>
              </div>
            </Link>
            <Link
              href={`/${locale}/categories/bronze`}
              className="group relative h-40 rounded-lg overflow-hidden shadow-md"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584283367830-3a0d1a97d66e?w=600&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {t.categories.bronze}
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link
              href={`/${locale}/categories`}
              className="text-amber-700 font-medium hover:text-amber-800"
            >
              {t.categories.viewAll} &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
