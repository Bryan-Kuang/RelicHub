"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ImageUrlHelperProps {
  value: string;
  onChange: (value: string) => void;
  amazonUrl?: string;
  ebayUrl?: string;
  name?: string;
  id?: string;
}

export default function ImageUrlHelper({
  value,
  onChange,
  amazonUrl,
  ebayUrl,
  name = "imageUrl",
  id = "imageUrl",
}: ImageUrlHelperProps) {
  const t = useTranslations("admin");
  const [showTutorial, setShowTutorial] = useState(false);
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 验证图片URL
  useEffect(() => {
    if (!value || !value.trim()) {
      setImageStatus("idle");
      setImagePreview(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      setImageStatus("loading");

      const img = new window.Image();
      img.onload = () => {
        setImageStatus("valid");
        setImagePreview(value);
      };
      img.onerror = () => {
        setImageStatus("invalid");
        setImagePreview(null);
      };
      img.src = value;
    }, 500); // 500ms 防抖

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center mb-1">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {t("imageUrl")}
          </label>
          <button
            type="button"
            onClick={() => setShowTutorial(true)}
            className="ml-2 text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center"
            title={t("imageUrlHelper")}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("imageUrlHelper")}
          </button>
        </div>

        <div className="relative">
          <input
            type="url"
            id={id}
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder={t("imageUrlPlaceholder")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />

          {/* 状态指示器 */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {imageStatus === "loading" && (
              <div className="animate-spin h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full"></div>
            )}
            {imageStatus === "valid" && (
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {imageStatus === "invalid" && (
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* 状态提示 */}
        <div className="mt-1 text-xs">
          {imageStatus === "loading" && (
            <span className="text-amber-600">{t("testingImage")}</span>
          )}
          {imageStatus === "valid" && (
            <span className="text-green-600">{t("imageUrlValid")}</span>
          )}
          {imageStatus === "invalid" && (
            <span className="text-red-600">{t("imageUrlInvalid")}</span>
          )}
        </div>
      </div>

      {/* 快速提取按钮 */}
      {(amazonUrl || ebayUrl) && (
        <div className="flex space-x-2">
          {amazonUrl && (
            <button
              type="button"
              onClick={() => window.open(amazonUrl, "_blank")}
              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              {t("getImageFromAmazon")}
            </button>
          )}
          {ebayUrl && (
            <button
              type="button"
              onClick={() => window.open(ebayUrl, "_blank")}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              {t("getImageFromEbay")}
            </button>
          )}
        </div>
      )}

      {/* 图片预览 */}
      {imagePreview && imageStatus === "valid" && (
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-2">{t("imagePreview")}:</p>
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
              sizes="128px"
            />
          </div>
        </div>
      )}

      {/* 教程弹窗 */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("imageUrlHelperTitle")}
                </h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Amazon 教程 */}
                <div>
                  <h4 className="text-md font-semibold text-orange-600 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 6.655 3.167 9.058 3.167 2.833 0 5.937-1.017 9.313-3.048.16-.097.28-.095.358.01.077.106.067.21-.031.31-.975.997-2.678 1.995-5.11 2.993-2.433.998-4.677 1.497-6.732 1.497-2.746 0-5.196-.997-7.35-2.993-.22-.203-.16-.412.146-.914z" />
                    </svg>
                    {t("imageUrlTutorial.amazon.title")}
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    {(t.raw("imageUrlTutorial.amazon.steps") as string[]).map(
                      (step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{step.replace(/^\d+\.\s*/, "")}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>

                {/* eBay 教程 */}
                <div>
                  <h4 className="text-md font-semibold text-blue-600 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.5 7.8c-1.1 0-2 .5-2.5 1.4V9h1.6v-.2c.2-.4.6-.7 1.1-.7.8 0 1.3.6 1.3 1.5v.4H6.6c-1.6 0-2.6.7-2.6 1.9 0 1.1.8 1.9 2.1 1.9.8 0 1.4-.3 1.8-.9h.1v.8h1.5V9.8c0-1.2-.9-2-2.5-2zm.9 4.5c0 .6-.5 1-1.2 1-.5 0-.8-.3-.8-.7 0-.4.3-.7.9-.7h1.1v.4z" />
                      <path d="M12.5 7.8c-1.7 0-2.8 1.3-2.8 2.9s1.1 2.9 2.8 2.9c1.7 0 2.8-1.3 2.8-2.9s-1.1-2.9-2.8-2.9zm0 4.5c-.8 0-1.3-.7-1.3-1.6s.5-1.6 1.3-1.6 1.3.7 1.3 1.6-.5 1.6-1.3 1.6z" />
                      <path d="M18.1 7.8c-.7 0-1.3.3-1.7.8h-.1V8h-1.6v5.5h1.6v-3.2c0-.9.5-1.4 1.2-1.4.7 0 1.1.5 1.1 1.3v3.3h1.6v-3.6c0-1.4-.8-2.1-2.1-2.1z" />
                    </svg>
                    {t("imageUrlTutorial.ebay.title")}
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    {(t.raw("imageUrlTutorial.ebay.steps") as string[]).map(
                      (step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{step.replace(/^\d+\.\s*/, "")}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>

                {/* 提示 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-amber-800">
                      {t("imageUrlTutorial.tips")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowTutorial(false)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
