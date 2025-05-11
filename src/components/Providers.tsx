"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n/config";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const pathname = usePathname();

  // Initialize i18n
  useEffect(() => {
    // This ensures i18n is initialized on the client side
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#722ed1",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default Providers;
