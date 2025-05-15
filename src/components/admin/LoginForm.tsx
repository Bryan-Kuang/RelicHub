"use client";

import React, { useState, useRef } from "react";
import { Form, Input, Button, message, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import {
  initRecaptchaVerifier,
  sendVerificationCode,
  verifyCodeAndSignIn,
} from "@/lib/firebase/auth";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // Initialize reCAPTCHA when component mounts
  React.useEffect(() => {
    if (recaptchaContainerRef.current) {
      initRecaptchaVerifier("recaptcha-container");
    }
  }, []);

  const handleSendCode = async () => {
    try {
      const phone = form.getFieldValue("phoneNumber");
      if (!phone) {
        message.error(t("form.required"));
        return;
      }

      setLoading(true);
      const verificationId = await sendVerificationCode(phone);
      setVerificationId(verificationId);
      setPhoneNumber(phone);
      message.success(t("admin.sendCode") + " " + t("common.success"));
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      if (error.message === "Unauthorized phone number") {
        message.error(t("admin.unauthorized"));
      } else {
        message.error(t("errors.general"));
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    if (!verificationId) {
      message.error(t("admin.sendCode") + " " + t("errors.required"));
      return;
    }

    try {
      setLoading(true);
      await verifyCodeAndSignIn(verificationId, values.verificationCode);
      message.success(t("common.login") + " " + t("common.success"));
      router.push("/admin");
    } catch (error) {
      console.error("Error verifying code:", error);
      message.error(t("errors.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("common.login")}
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="phoneNumber"
          label={t("admin.phoneNumber")}
          rules={[
            { required: true, message: t("form.required") },
            {
              pattern: /^\+?[1-9]\d{1,14}$/,
              message: t("form.invalidPhone"),
            },
          ]}
        >
          <Input
            placeholder="+1234567890"
            disabled={!!verificationId}
            suffix={
              !verificationId && (
                <Button
                  type="link"
                  onClick={handleSendCode}
                  loading={loading && !verificationId}
                >
                  {t("admin.sendCode")}
                </Button>
              )
            }
          />
        </Form.Item>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container" ref={recaptchaContainerRef}></div>

        {verificationId && (
          <>
            <Divider />
            <Form.Item
              name="verificationCode"
              label={t("admin.verificationCode")}
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {t("admin.verify")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
