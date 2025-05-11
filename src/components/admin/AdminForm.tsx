import React, { useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useTranslation } from "react-i18next";
import { Admin, addAdmin } from "@/lib/firebase/db";

interface AdminFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onSuccess, onCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const admin: Admin = {
        phoneNumber: values.phoneNumber,
        role: values.role,
      };
      await addAdmin(admin);
      message.success(t("admin.addAdmin") + " " + t("common.success"));
      onSuccess();
    } catch (error) {
      console.error("Error adding admin:", error);
      message.error(t("errors.databaseError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ role: "admin" }}
    >
      <Form.Item
        name="phoneNumber"
        label={t("form.phoneLabel")}
        rules={[
          { required: true, message: t("form.required") },
          {
            pattern: /^\+?[1-9]\d{1,14}$/,
            message: t("form.invalidPhone"),
          },
        ]}
      >
        <Input placeholder="+1234567890" />
      </Form.Item>

      <Form.Item
        name="role"
        label={t("form.roleLabel")}
        rules={[{ required: true, message: t("form.required") }]}
      >
        <Radio.Group>
          <Radio value="admin">{t("admin.regularAdmin")}</Radio>
          <Radio value="superadmin">{t("admin.superAdmin")}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button onClick={onCancel} className="mr-2">
          {t("common.cancel")}
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t("common.add")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;
