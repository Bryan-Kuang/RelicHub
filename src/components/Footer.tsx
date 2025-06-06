"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  return (
    <footer className="bg-amber-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">
              {locale === "zh" ? "工艺坊" : "CraftHub"}
            </h3>
            <p className="text-sm mt-1">
              {locale === "zh"
                ? "匠心传承，文化延续"
                : "Craftsmanship Heritage, Cultural Continuity"}
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm hover:underline">
              {t("about")}
            </a>
            <a href="#" className="text-sm hover:underline">
              {t("contact")}
            </a>
            <a href="#" className="text-sm hover:underline">
              {t("privacy")}
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-amber-700 pt-6 text-center text-sm">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
