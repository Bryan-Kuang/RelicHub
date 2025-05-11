"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Modal,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/layout/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import { Product, getAllProducts, deleteProduct } from "@/lib/firebase/db";

const { Title } = Typography;
const { confirm } = Modal;

export default function AdminProducts() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );

  const currentLanguage = i18n.language as "zh" | "en";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error(t("errors.databaseError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success(t("admin.deleteProduct") + " " + t("common.success"));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error(t("errors.databaseError"));
    }
  };

  const showDeleteConfirm = (product: Product) => {
    confirm({
      title: t("admin.deleteConfirm"),
      icon: <ExclamationCircleOutlined />,
      content: currentLanguage === "zh" ? product.nameZh : product.nameEn,
      okText: t("common.delete"),
      okType: "danger",
      cancelText: t("common.cancel"),
      onOk() {
        if (product.id) {
          handleDelete(product.id);
        }
      },
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleFormSuccess = () => {
    setIsModalVisible(false);
    fetchProducts();
  };

  const columns = [
    {
      title:
        t("common.name") +
        " (" +
        (currentLanguage === "zh" ? "中文" : "English") +
        ")",
      dataIndex: currentLanguage === "zh" ? "nameZh" : "nameEn",
      key: "name",
      render: (text: string, record: Product) =>
        currentLanguage === "zh" ? record.nameZh : record.nameEn,
    },
    {
      title: t("common.price"),
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: t("common.amazonLink"),
      dataIndex: "amazonLink",
      key: "amazonLink",
      render: (link: string) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link.length > 30 ? link.substring(0, 30) + "..." : link}
        </a>
      ),
    },
    {
      title: t("common.actions"),
      key: "actions",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t("common.edit")}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          >
            {t("common.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>{t("admin.products")}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("admin.addProduct")}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? t("admin.editProduct") : t("admin.addProduct")}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <ProductForm
          initialValues={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </AdminLayout>
  );
}
