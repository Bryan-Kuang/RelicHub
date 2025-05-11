import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/hooks/useAuth";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AntHeader className="bg-white flex justify-between items-center px-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-primary mr-8">
          {t("common.appName")}
        </Link>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          className="border-0"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">{t("common.home")}</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        {user ? (
          <>
            {isAdmin && (
              <Button
                type="link"
                icon={<UserOutlined />}
                onClick={() => router.push("/admin")}
              >
                {t("common.admin")}
              </Button>
            )}
            <Button type="link" onClick={handleLogout}>
              {t("common.logout")}
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => router.push("/admin/login")}>
            {t("common.login")}
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
