"use client";

import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";

export default function NotFound() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle={t("errors.notFound")}
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            {t("common.home")}
          </Button>
        }
      />
    </MainLayout>
  );
}
