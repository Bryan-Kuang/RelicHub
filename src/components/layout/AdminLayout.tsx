import React, { useState } from "react";
import { Layout, Menu, Button, Spin } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { signOutUser } from "@/lib/firebase/auth";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/lib/hooks/useAuth";

const { Header, Content, Sider } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading, isAdmin } = useAuth(true); // requireAdmin=true

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white flex justify-between items-center px-4 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary mr-8">
            {t("common.appName")}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button type="link" onClick={handleLogout} icon={<LogoutOutlined />}>
            {t("common.logout")}
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          className="bg-white"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["/admin"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/admin" icon={<DashboardOutlined />}>
              <Link href="/admin">{t("admin.dashboard")}</Link>
            </Menu.Item>
            <Menu.Item key="/admin/products" icon={<ShoppingOutlined />}>
              <Link href="/admin/products">{t("admin.products")}</Link>
            </Menu.Item>
            <Menu.Item key="/admin/admins" icon={<UserOutlined />}>
              <Link href="/admin/admins">{t("admin.adminManagement")}</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="p-6">
          <Content className="bg-white p-6 rounded shadow">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
