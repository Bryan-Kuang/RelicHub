"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Card } from "antd";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/admin/LoginForm";
import { auth } from "@/lib/firebase/config";

const { Content } = Layout;

export default function AdminLogin() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-6">
        <div className="container mx-auto flex justify-center items-center min-h-[80vh]">
          <Card
            title={t("common.login")}
            className="w-full max-w-md shadow-lg"
            headStyle={{ textAlign: "center", fontSize: "1.5rem" }}
          >
            <LoginForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
