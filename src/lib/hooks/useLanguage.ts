import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"zh" | "en">("en");

  useEffect(() => {
    // Initialize with the current language from i18n
    setCurrentLanguage(i18n.language as "zh" | "en");

    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng as "zh" | "en");
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = (language: "zh" | "en") => {
    i18n.changeLanguage(language);
    // Store language preference in localStorage
    localStorage.setItem("i18nextLng", language);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    changeLanguage(newLanguage);
  };

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    isEnglish: currentLanguage === "en",
    isChinese: currentLanguage === "zh",
  };
}
