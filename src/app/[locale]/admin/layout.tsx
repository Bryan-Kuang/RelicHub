import { redirect } from "next/navigation";
import { Link } from "@/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function AdminLayout({ children, params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
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
                {locale === "zh" ? "管理菜单" : "Admin Menu"}
              </h2>
              <nav className="space-y-1">
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  {locale === "zh" ? "控制面板" : "Dashboard"}
                </Link>
                <Link
                  href="/admin/products"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  {locale === "zh" ? "管理藏品" : "Manage Products"}
                </Link>
                <Link
                  href="/admin/categories"
                  className="block px-3 py-2 rounded-md hover:bg-amber-100 text-amber-800"
                >
                  {locale === "zh" ? "管理分类" : "Manage Categories"}
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
