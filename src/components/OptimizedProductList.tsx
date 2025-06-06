"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Pagination, Spin, Empty, Row, Col } from "antd";
import { ProductCardSkeleton } from "./LazyWrapper";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  amazonUrl?: string | null;
  ebayUrl?: string | null;
  featured: boolean;
  category?: {
    id: string;
    name: string;
  };
}

interface ProductListProps {
  categoryId?: string;
  featured?: boolean;
  searchQuery?: string;
  pageSize?: number;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const OptimizedProductList = ({
  categoryId,
  featured,
  searchQuery,
  pageSize = 12,
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // 构建 API URL
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", pageSize.toString());

    if (categoryId) params.set("categoryId", categoryId);
    if (featured) params.set("featured", "true");
    if (searchQuery) params.set("search", searchQuery);

    return `/api/products?${params.toString()}`;
  }, [currentPage, pageSize, categoryId, featured, searchQuery]);

  // 获取产品数据
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("获取产品失败");
      }

      const data: ApiResponse = await response.json();
      setProducts(data.products);
      setPagination({
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
        hasNext: data.pagination.hasNext,
        hasPrev: data.pagination.hasPrev,
      });
    } catch (error) {
      console.error("获取产品失败:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // 页面变化处理
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 监听依赖变化
  useEffect(() => {
    setCurrentPage(1); // 重置页码
  }, [categoryId, featured, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 渲染加载状态
  if (loading) {
    return (
      <div className="space-y-6">
        <Row gutter={[16, 16]}>
          {Array.from({ length: pageSize }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <ProductCardSkeleton />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  // 渲染空状态
  if (!loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Empty
          description={
            searchQuery ? `未找到包含 "${searchQuery}" 的产品` : "暂无产品"
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 产品网格 */}
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* 分页器 */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={pagination.total}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) =>
              `第 ${range[0]}-${range[1]} 项，共 ${total} 项`
            }
            responsive
          />
        </div>
      )}
    </div>
  );
};

export default OptimizedProductList;
