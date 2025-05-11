"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Typography, Button, Spin, Row, Col, Divider, Card } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Product, getProduct, getRandomProducts } from "@/lib/firebase/db";
import ProductCard from "@/components/user/ProductCard";

const { Title, Paragraph } = Typography;

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const currentLanguage = i18n.language as "zh" | "en";
  const productId = params?.id as string;

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await getProduct(productId);
        setProduct(productData);

        // Get related products (random products for now)
        const related = await getRandomProducts(4);
        // Filter out the current product if it's in the random selection
        setRelatedProducts(related.filter((item) => item.id !== productId));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <Title level={3}>{t("errors.notFound")}</Title>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/")}
          >
            {t("common.back")}
          </Button>
        </div>
      </MainLayout>
    );
  }

  const productName =
    currentLanguage === "zh" ? product.nameZh : product.nameEn;
  const productMeaning =
    currentLanguage === "zh" ? product.meaningZh : product.meaningEn;

  return (
    <MainLayout>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-6"
      >
        {t("common.back")}
      </Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <div className="bg-gray-200 rounded-lg flex items-center justify-center h-80">
            {/* Placeholder for product image */}
            <span className="text-gray-400 text-8xl">🏺</span>
          </div>
        </Col>
        <Col xs={24} md={14}>
          <Title level={2}>{productName}</Title>
          <Title level={3} type="danger">
            ${product.price.toFixed(2)}
          </Title>
          <Divider />
          <Title level={4}>{t("common.meaning")}</Title>
          <Paragraph className="text-lg">{productMeaning}</Paragraph>
          <Divider />
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("common.buyOnAmazon")}
          </Button>
        </Col>
      </Row>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <Title level={3}>{t("user.relatedProducts")}</Title>
          <Row gutter={[24, 24]}>
            {relatedProducts.map((relatedProduct) => (
              <Col xs={24} sm={12} md={8} lg={6} key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </MainLayout>
  );
}
