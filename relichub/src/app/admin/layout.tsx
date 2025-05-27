import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold text-amber-900 mb-4">
                管理菜单
              </h2>
              <nav className="space-y-1">
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  控制面板
                </Link>
                <Link
                  href="/admin/products"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  管理藏品
                </Link>
                <Link
                  href="/admin/categories"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  管理分类
                </Link>
              </nav>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
