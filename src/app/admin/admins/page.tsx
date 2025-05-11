"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Space, Typography, Modal, message, Tag } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminForm from "@/components/admin/AdminForm";
import { Admin, getAllAdmins, deleteAdmin } from "@/lib/firebase/db";
import { auth } from "@/lib/firebase/config";

const { Title } = Typography;
const { confirm } = Modal;

export default function AdminManagement() {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      message.error(t("errors.databaseError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAdmin(id);
      message.success(t("admin.deleteAdmin") + " " + t("common.success"));
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
      message.error(t("errors.databaseError"));
    }
  };

  const showDeleteConfirm = (admin: Admin) => {
    confirm({
      title: t("admin.deleteAdminConfirm"),
      icon: <ExclamationCircleOutlined />,
      content: admin.phoneNumber,
      okText: t("common.delete"),
      okType: "danger",
      cancelText: t("common.cancel"),
      onOk() {
        if (admin.id) {
          handleDelete(admin.id);
        }
      },
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleFormSuccess = () => {
    setIsModalVisible(false);
    fetchAdmins();
  };

  const columns = [
    {
      title: t("admin.phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("admin.role"),
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "superadmin" ? "red" : "blue"}>
          {role === "superadmin"
            ? t("admin.superAdmin")
            : t("admin.regularAdmin")}
        </Tag>
      ),
    },
    {
      title: t("common.actions"),
      key: "actions",
      render: (_: any, record: Admin) => {
        // Check if current user is a superadmin
        const isSuperAdmin =
          currentUser &&
          admins.some(
            (admin) =>
              admin.phoneNumber === currentUser.phoneNumber &&
              admin.role === "superadmin"
          );

        // Don't allow deleting yourself
        const isSelf =
          currentUser && record.phoneNumber === currentUser.phoneNumber;

        return (
          <Space size="middle">
            {isSuperAdmin && !isSelf && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(record)}
              >
                {t("common.delete")}
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>{t("admin.adminManagement")}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("admin.addAdmin")}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={admins}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={t("admin.addAdmin")}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <AdminForm onSuccess={handleFormSuccess} onCancel={handleModalClose} />
      </Modal>
    </AdminLayout>
  );
}
