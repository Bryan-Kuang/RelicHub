import { productAdapter } from "@/lib/demo-adapter";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { locales } from "@/i18n/routing";
import { Suspense } from "react";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 添加缓存重新验证
export const revalidate = 300; // 5分钟重新验证

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

// 产品列表组件
async function ProductList({ locale }: { locale: string }) {
  const products = await getAllProducts();
  const messages = await getMessages(locale);
  const t = messages.products;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 加载骨架屏组件
function ProductListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
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

      {/* 产品列表 - 使用Suspense实现流式渲染 */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList locale={locale} />
      </Suspense>
    </div>
  );
}
