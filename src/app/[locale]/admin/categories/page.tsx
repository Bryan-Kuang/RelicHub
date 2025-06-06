import { categoryAdapter } from "@/lib/demo-adapter";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

// 添加ISR缓存
export const revalidate = 300; // 5分钟重新验证

async function getCategories() {
  try {
    return await categoryAdapter.findMany({});
  } catch (error) {
    console.error("获取分类列表失败:", error);
    return [];
  }
}

// 获取翻译消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return (await import(`../../../../messages/en.json`)).default;
  }
}

export default async function AdminCategoriesPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const categories = await getCategories();
  const messages = await getMessages(locale);
  const t = messages.admin;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">
          {t.categoryManagement}
        </h1>
        <Link
          href="/admin/categories/new"
          className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded-md transition-colors"
        >
          {t.addNewCategory}
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">{t.noCategories}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.categoryName}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.description}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.productCount}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {category.description || t.noDescription}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(category as any)._count?.products ||
                        (category as any).products?.length ||
                        0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="text-amber-600 hover:text-amber-900 mr-3"
                    >
                      {t.edit}
                    </Link>
                    <Link
                      href={`/admin/categories/${category.id}/delete`}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t.delete}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
