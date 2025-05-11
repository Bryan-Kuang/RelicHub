import React from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Product } from "@/lib/firebase/db";

const { Meta } = Card;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Use the appropriate language for display
  const productName =
    currentLanguage === "zh" ? product.nameZh : product.nameEn;
  const productMeaning =
    currentLanguage === "zh" ? product.meaningZh : product.meaningEn;

  return (
    <Card
      hoverable
      className="h-full flex flex-col"
      cover={
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {/* Placeholder for product image */}
          <span className="text-gray-400 text-4xl">🏺</span>
        </div>
      }
      actions={[
        <Link href={`/product/${product.id}`} key="details">
          <Button type="link" icon={<EyeOutlined />}>
            {t("common.viewDetails")}
          </Button>
        </Link>,
        <Button
          type="link"
          icon={<ShoppingCartOutlined />}
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          key="buy"
        >
          {t("common.buyOnAmazon")}
        </Button>,
      ]}
    >
      <Meta
        title={productName}
        description={
          <div>
            <p className="text-primary font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="line-clamp-2 text-sm text-gray-500">
              {productMeaning}
            </p>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
