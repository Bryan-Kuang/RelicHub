import { productAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
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

// 获取所有产品
async function getAllProducts() {
  try {
    return await productAdapter.findMany({
      include: { category: true },
    });
  } catch (error) {
    console.error("获取产品列表失败:", error);
    return [];
  }
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const products = await getAllProducts();
  const messages = await getMessages(locale);
  const t = messages.products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">{t.title}</h1>

      {/* 筛选和排序区域 - 可以在未来实现 */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              {t.filter}
            </button>
          </div>
          <div className="relative">
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              {t.sort}
            </button>
          </div>
        </div>
      </div>

      {/* 产品列表 */}
      {products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">{t.noResults}</p>
        </div>
      )}
    </div>
  );
}
