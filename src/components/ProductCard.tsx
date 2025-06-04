"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    amazonUrl?: string | null;
    ebayUrl?: string | null;
    featured: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const locale = useLocale();

  const hasPurchaseLinks = product.amazonUrl || product.ebayUrl;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">
              {locale === "zh" ? "无图片" : "No Image"}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            {locale === "zh" ? "精选" : "Featured"}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-amber-900">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-amber-700">
            ¥{product.price.toLocaleString()}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="bg-amber-700 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-800 transition-colors"
          >
            {t("viewDetails")}
          </Link>
        </div>

        {/* 购买链接指示器 */}
        {hasPurchaseLinks && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              {locale === "zh" ? "可购买于:" : "Available on:"}
            </p>
            <div className="flex space-x-2">
              {product.amazonUrl && (
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 6.655 3.167 9.058 3.167 2.833 0 5.937-1.017 9.313-3.048.16-.097.28-.095.358.01.077.106.067.21-.031.31-.975.997-2.678 1.995-5.11 2.993-2.433.998-4.677 1.497-6.732 1.497-2.746 0-5.196-.997-7.35-2.993-.22-.203-.16-.412.146-.914z" />
                    <path d="M20.73 15.41c-.15 0-.31-.05-.42-.15l-6.25-5.1c-.31-.25-.36-.7-.11-1.01.25-.31.7-.36 1.01-.11l6.25 5.1c.31.25.36.7.11 1.01-.14.17-.34.26-.59.26z" />
                  </svg>
                  Amazon
                </div>
              )}
              {product.ebayUrl && (
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="#E53238"
                  >
                    <path d="M6.5 7.8c-1.1 0-2 .5-2.5 1.4V9h1.6v-.2c.2-.4.6-.7 1.1-.7.8 0 1.3.6 1.3 1.5v.4H6.6c-1.6 0-2.6.7-2.6 1.9 0 1.1.8 1.9 2.1 1.9.8 0 1.4-.3 1.8-.9h.1v.8h1.5V9.8c0-1.2-.9-2-2.5-2zm.9 4.5c0 .6-.5 1-1.2 1-.5 0-.8-.3-.8-.7 0-.4.3-.7.9-.7h1.1v.4z" />
                    <path d="M12.5 7.8c-1.7 0-2.8 1.3-2.8 2.9s1.1 2.9 2.8 2.9c1.7 0 2.8-1.3 2.8-2.9s-1.1-2.9-2.8-2.9zm0 4.5c-.8 0-1.3-.7-1.3-1.6s.5-1.6 1.3-1.6 1.3.7 1.3 1.6-.5 1.6-1.3 1.6z" />
                    <path d="M18.1 7.8c-.7 0-1.3.3-1.7.8h-.1V8h-1.6v5.5h1.6v-3.2c0-.9.5-1.4 1.2-1.4.7 0 1.1.5 1.1 1.3v3.3h1.6v-3.6c0-1.4-.8-2.1-2.1-2.1z" />
                  </svg>
                  eBay
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
