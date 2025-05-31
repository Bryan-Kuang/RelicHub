#!/usr/bin/env node

const { execSync } = require("child_process");

// 检查是否为演示模式
const isDemoMode = process.env.DEMO_MODE === "true";

console.log(`🚀 Vercel 构建开始`);
console.log(`🎭 演示模式: ${isDemoMode ? "开启" : "关闭"}`);

try {
  // 总是生成 Prisma 客户端
  console.log("📦 生成 Prisma 客户端...");
  execSync("npx prisma generate", { stdio: "inherit" });

  if (!isDemoMode && process.env.DATABASE_URL) {
    // 生产模式且有数据库URL时运行迁移
    console.log("🗄️ 运行数据库迁移...");
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
  } else {
    console.log("⚠️ 跳过数据库迁移 (演示模式或无数据库URL)");
  }

  // 构建 Next.js 应用
  console.log("🏗️ 构建 Next.js 应用...");
  execSync("npx next build", { stdio: "inherit" });

  console.log("✅ 构建完成!");
} catch (error) {
  console.error("❌ 构建失败:", error.message);
  process.exit(1);
}
