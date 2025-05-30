import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// 当应用在静态环境中构建时，此页面仅用于重定向
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
