"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/layout/AdminLayout";
import { getAllProducts, getAllAdmins } from "@/lib/firebase/db";

const { Title } = Typography;

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [productCount, setProductCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        const admins = await getAllAdmins();

        setProductCount(products.length);
        setAdminCount(admins.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <Title level={2}>{t("admin.dashboard")}</Title>

      <Row gutter={[24, 24]} className="mt-8">
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card loading={loading}>
            <Statistic
              title={t("admin.products")}
              value={productCount}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={8}>
          <Card loading={loading}>
            <Statistic
              title={t("admin.adminManagement")}
              value={adminCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}
