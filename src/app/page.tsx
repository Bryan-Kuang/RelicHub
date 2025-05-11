"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SearchBar from "@/components/user/SearchBar";
import ProductCard from "@/components/user/ProductCard";
import { Row, Col, Typography, Spin, Empty } from "antd";
import { useTranslation } from "react-i18next";
import { Product, searchProducts, getRandomProducts } from "@/lib/firebase/db";

const { Title } = Typography;

export default function Home() {
  const { t, i18n } = useTranslation();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        const products = await getRandomProducts(6);
        setRandomProducts(products);
      } catch (error) {
        console.error("Error fetching random products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  const handleSearch = async (searchTerm: string, language: "zh" | "en") => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setSearching(true);
      setHasSearched(true);
      const results = await searchProducts(searchTerm, language);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {hasSearched ? (
        <div className="mb-12">
          <Title level={2}>
            {t("common.search")} {t("common.results")}
          </Title>
          {searching ? (
            <div className="flex justify-center py-8">
              <Spin size="large" />
            </div>
          ) : searchResults.length > 0 ? (
            <Row gutter={[24, 24]}>
              {searchResults.map((product) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description={t("user.noResults")} />
          )}
        </div>
      ) : null}

      <div>
        <Title level={2}>{t("common.randomRecommendations")}</Title>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : randomProducts.length > 0 ? (
          <Row gutter={[24, 24]}>
            {randomProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={8} xl={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description={t("user.noResults")} />
        )}
      </div>
    </MainLayout>
  );
}
