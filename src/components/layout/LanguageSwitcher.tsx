import React from "react";
import { useTranslation } from "react-i18next";
import { Select, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useLanguage } from "@/lib/hooks/useLanguage";

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <GlobalOutlined className="mr-2" />
      <Select
        value={currentLanguage}
        style={{ width: 100 }}
        onChange={(value) => changeLanguage(value as "zh" | "en")}
        options={[
          { value: "en", label: "English" },
          { value: "zh", label: "中文" },
        ]}
        aria-label={t("common.language")}
      />
    </div>
  );
};

export default LanguageSwitcher;
