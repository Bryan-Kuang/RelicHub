import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "../providers";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/i18n/routing";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import theme from "@/lib/antd-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraftHub - Traditional Handicrafts",
  description:
    "Discover authentic traditional Chinese handicrafts including prayer beads, incense, wood carvings and tea sets",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

// 获取消息
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // 回退到默认语言
    return (await import(`../../messages/en.json`)).default;
  }
}

// 静态参数生成
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  // 在Next.js 15中params是Promise类型
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-amber-50`}
      >
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AuthProvider>
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </AuthProvider>
            </NextIntlClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
