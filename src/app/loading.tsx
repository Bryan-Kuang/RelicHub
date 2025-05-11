import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Spin size="large" />
    </div>
  );
}
