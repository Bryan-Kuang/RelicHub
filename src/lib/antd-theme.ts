import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    // 主色调 - 琥珀色
    colorPrimary: "#d97706", // amber-600
    colorSuccess: "#059669", // emerald-600
    colorWarning: "#dc2626", // red-600
    colorError: "#dc2626", // red-600
    colorInfo: "#2563eb", // blue-600

    // 边框圆角
    borderRadius: 6,

    // 字体
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    // 布局
    paddingLG: 24,
    paddingMD: 16,
    paddingSM: 12,

    // 背景色
    colorBgLayout: "#fffbeb", // amber-50
    colorBgContainer: "#ffffff",

    // 文字色
    colorText: "#374151", // gray-700
    colorTextSecondary: "#6b7280", // gray-500
    colorTextTertiary: "#9ca3af", // gray-400
  },
  components: {
    Button: {
      primaryShadow: "0 2px 0 rgba(217, 119, 6, 0.1)",
      colorPrimaryHover: "#92400e", // amber-800
    },
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "transparent",
      itemSelectedBg: "#fef3c7", // amber-100
      itemSelectedColor: "#92400e", // amber-800
    },
    Table: {
      headerBg: "#f9fafb", // gray-50
      headerColor: "#374151", // gray-700
      rowHoverBg: "#fef3c7", // amber-100
    },
    Form: {
      labelColor: "#374151", // gray-700
      itemMarginBottom: 16,
    },
    Input: {
      hoverBorderColor: "#d97706", // amber-600
      activeBorderColor: "#d97706", // amber-600
    },
    Select: {
      hoverBorderColor: "#d97706", // amber-600
      activeBorderColor: "#d97706", // amber-600
    },
  },
};

export default theme;
