"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { Product, addProduct, updateProduct } from "@/lib/firebase/db";

interface ProductFormProps {
  initialValues?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (isEditing && initialValues?.id) {
        await updateProduct(initialValues.id, values);
        message.success(t("admin.editProduct") + " " + t("common.success"));
      } else {
        await addProduct(values as Product);
        message.success(t("admin.addProduct") + " " + t("common.success"));
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
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
      initialValues={initialValues || { price: 0 }}
    >
      <Form.Item
        name="nameZh"
        label={t("form.nameZhLabel")}
        rules={[{ required: true, message: t("form.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="nameEn"
        label={t("form.nameEnLabel")}
        rules={[{ required: true, message: t("form.required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="meaningZh"
        label={t("form.meaningZhLabel")}
        rules={[{ required: true, message: t("form.required") }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="meaningEn"
        label={t("form.meaningEnLabel")}
        rules={[{ required: true, message: t("form.required") }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="price"
        label={t("form.priceLabel")}
        rules={[
          { required: true, message: t("form.required") },
          {
            type: "number",
            min: 0,
            message: t("form.invalidPrice"),
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>

      <Form.Item
        name="amazonLink"
        label={t("form.amazonLinkLabel")}
        rules={[
          { required: true, message: t("form.required") },
          {
            type: "url",
            message: t("form.invalidUrl"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button onClick={onCancel} className="mr-2">
          {t("common.cancel")}
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEditing ? t("common.save") : t("common.add")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
