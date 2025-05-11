"use client";

import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import MainLayout from "@/components/layout/MainLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Result
        status="error"
        title={t("errors.general")}
        subTitle={error.message || t("errors.general")}
        extra={
          <Button type="primary" onClick={reset}>
            {t("common.back")}
          </Button>
        }
      />
    </MainLayout>
  );
}
