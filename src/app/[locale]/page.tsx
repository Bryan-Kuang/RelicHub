import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { productAdapter, categoryAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
import { locales } from "@/i18n/routing";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getFeaturedProducts() {
  try {
    return await productAdapter.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch (error) {
    console.error("获取精选产品失败:", error);
    return [];
  }
}

async function getCategories() {
  try {
    return await categoryAdapter.findMany();
  } catch (error) {
    console.error("获取分类失败:", error);
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
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  // 加载翻译
  const messages = await getMessages(locale);
  const t = messages.home;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-amber-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
            {locale === "zh"
              ? "探索古玩珍品的世界"
              : "Discover Ancient Treasures"}
          </h1>
          <p className="text-xl text-amber-700 mb-8 max-w-3xl mx-auto">
            {locale === "zh"
              ? "精心收藏的古董珍品，每一件都承载着深厚的历史文化底蕴，展现传统工艺的精湛技艺。"
              : "Carefully curated antique treasures, each carrying deep historical and cultural heritage, showcasing exquisite traditional craftsmanship."}
          </p>
          <Link
            href="/products"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {locale === "zh" ? "浏览藏品" : "Browse Collection"}
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                {locale === "zh"
                  ? "传承千年的艺术珍宝"
                  : "Millennial Art Treasures"}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {locale === "zh"
                  ? "我们专注于收集和展示中国传统文化中的珍贵古董。从精美的瓷器到古朴的青铜器，从书法名作到玉器精品，每一件藏品都经过专业鉴定和精心挑选。"
                  : "We focus on collecting and showcasing precious antiques from traditional Chinese culture. From exquisite porcelain to ancient bronzes, from calligraphy masterpieces to jade treasures, each piece is professionally authenticated and carefully selected."}
              </p>
              <Link
                href="/categories"
                className="inline-block mt-4 text-amber-700 font-medium hover:text-amber-800"
              >
                {locale === "zh" ? "了解更多" : "Learn More"} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  {locale === "zh" ? "专业鉴定" : "Expert Authentication"}
                </h3>
                <p className="text-gray-600">
                  {locale === "zh"
                    ? "每件藏品都经过资深专家的专业鉴定"
                    : "Every piece authenticated by senior experts"}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  {locale === "zh" ? "历史悠久" : "Rich History"}
                </h3>
                <p className="text-gray-600">
                  {locale === "zh"
                    ? "承载着深厚的历史文化底蕴"
                    : "Carrying deep historical and cultural heritage"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {locale === "zh" ? "精选藏品" : "Featured Collection"}
          </h2>
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
              {locale === "zh" ? "查看全部藏品" : "View All Products"}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {locale === "zh" ? "藏品分类" : "Categories"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-800 group-hover:text-amber-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              {locale === "zh" ? "浏览所有分类" : "Browse All Categories"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
