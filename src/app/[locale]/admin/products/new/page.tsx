"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Category } from "@/generated/prisma";
import ImageUrlHelper from "@/components/ImageUrlHelper";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [amazonUrl, setAmazonUrl] = useState("");
  const [ebayUrl, setEbayUrl] = useState("");
  const t = useTranslations("admin");

  // 获取所有分类
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("获取分类失败:", err);
        setCategories([]);
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const amazonUrlValue = amazonUrl?.trim();
    const ebayUrlValue = ebayUrl?.trim();

    // 验证至少有一个购买链接
    if (!amazonUrlValue && !ebayUrlValue) {
      setError(t("validationError"));
      setIsLoading(false);
      return;
    }

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      imageUrl: imageUrl || null,
      amazonUrl: amazonUrlValue || null,
      ebayUrl: ebayUrlValue || null,
      categoryId: formData.get("categoryId") as string,
      featured: formData.get("featured") === "on",
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("createProductFailed"));
      }

      // 重定向到产品列表页面
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("createProductFailed"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">
          {t("addNewProduct")}
        </h1>
        <Link
          href="/admin/products"
          className="text-amber-700 hover:text-amber-900"
        >
          {t("backToProductList")}
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("productName")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("price")} (¥) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="1"
                required
                onInvalid={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.validity.valueMissing) {
                    target.setCustomValidity("请输入价格");
                  } else if (target.validity.rangeUnderflow) {
                    target.setCustomValidity("价格不能为负数");
                  } else if (target.validity.stepMismatch) {
                    target.setCustomValidity("请输入有效的数字");
                  } else {
                    target.setCustomValidity("");
                  }
                }}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.setCustomValidity("");
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                使用上下箭头键或旁边的按钮增减价格，每次增减1元
              </p>
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("category")} *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">{t("selectCategory")}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <ImageUrlHelper
              value={imageUrl}
              onChange={setImageUrl}
              amazonUrl={amazonUrl}
              ebayUrl={ebayUrl}
            />

            {/* 购买链接部分 */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {t("purchaseLinks")} *
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {t("purchaseLinksRequired")}
                </p>
              </div>

              <div>
                <label
                  htmlFor="amazonUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 6.655 3.167 9.058 3.167 2.833 0 5.937-1.017 9.313-3.048.16-.097.28-.095.358.01.077.106.067.21-.031.31-.975.997-2.678 1.995-5.11 2.993-2.433.998-4.677 1.497-6.732 1.497-2.746 0-5.196-.997-7.35-2.993-.22-.203-.16-.412.146-.914z" />
                      <path d="M20.73 15.41c-.15 0-.31-.05-.42-.15l-6.25-5.1c-.31-.25-.36-.7-.11-1.01.25-.31.7-.36 1.01-.11l6.25 5.1c.31.25.36.7.11 1.01-.14.17-.34.26-.59.26z" />
                    </svg>
                    {t("amazonLink")}
                  </div>
                </label>
                <input
                  type="url"
                  id="amazonUrl"
                  name="amazonUrl"
                  value={amazonUrl}
                  onChange={(e) => setAmazonUrl(e.target.value)}
                  placeholder="https://www.amazon.com/product"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t("amazonLinkHelp")}
                </p>
              </div>

              <div>
                <label
                  htmlFor="ebayUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.5 7.8c-1.1 0-2 .5-2.5 1.4V9h1.6v-.2c.2-.4.6-.7 1.1-.7.8 0 1.3.6 1.3 1.5v.4H6.6c-1.6 0-2.6.7-2.6 1.9 0 1.1.8 1.9 2.1 1.9.8 0 1.4-.3 1.8-.9h.1v.8h1.5V9.8c0-1.2-.9-2-2.5-2zm.9 4.5c0 .6-.5 1-1.2 1-.5 0-.8-.3-.8-.7 0-.4.3-.7.9-.7h1.1v.4z" />
                      <path d="M12.5 7.8c-1.7 0-2.8 1.3-2.8 2.9s1.1 2.9 2.8 2.9c1.7 0 2.8-1.3 2.8-2.9s-1.1-2.9-2.8-2.9zm0 4.5c-.8 0-1.3-.7-1.3-1.6s.5-1.6 1.3-1.6 1.3.7 1.3 1.6-.5 1.6-1.3 1.6z" />
                      <path d="M18.1 7.8c-.7 0-1.3.3-1.7.8h-.1V8h-1.6v5.5h1.6v-3.2c0-.9.5-1.4 1.2-1.4.7 0 1.1.5 1.1 1.3v3.3h1.6v-3.6c0-1.4-.8-2.1-2.1-2.1z" />
                    </svg>
                    {t("ebayLink")}
                  </div>
                </label>
                <input
                  type="url"
                  id="ebayUrl"
                  name="ebayUrl"
                  value={ebayUrl}
                  onChange={(e) => setEbayUrl(e.target.value)}
                  placeholder="https://www.ebay.com/product"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t("ebayLinkHelp")}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm text-gray-700"
              >
                {t("setAsFeatured")}
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("description")} *
            </label>
            <textarea
              id="description"
              name="description"
              rows={12}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors mr-2"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("saving") : t("saveProduct")}
          </button>
        </div>
      </form>
    </div>
  );
}
