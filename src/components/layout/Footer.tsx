import React from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="text-center bg-gray-100 py-4">
      <div className="container mx-auto">
        <p>
          &copy; {currentYear} {t("common.appName")}
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;
