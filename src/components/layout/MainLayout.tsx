"use client";

import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-6">
        <div className="container mx-auto">{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
