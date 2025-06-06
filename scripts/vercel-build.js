#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Vercel生产环境配置
const isDemoMode = process.env.DEMO_MODE === "true";
const hasValidDatabaseUrl =
  process.env.DATABASE_URL &&
  (process.env.DATABASE_URL.startsWith("postgresql://") ||
    process.env.DATABASE_URL.startsWith("postgres://"));

console.log(`🚀 Vercel 构建开始 (生产环境)`);
console.log(`🎭 演示模式: ${isDemoMode ? "开启" : "关闭"}`);
console.log(
  `🗄️ 数据库URL: ${
    hasValidDatabaseUrl ? "✅ PostgreSQL已配置" : "❌ 需要PostgreSQL数据库"
  }`
);

// 生产环境必须有PostgreSQL数据库
if (!isDemoMode && !hasValidDatabaseUrl) {
  console.error("❌ 生产环境需要有效的PostgreSQL数据库URL");
  console.error("请在Vercel环境变量中配置DATABASE_URL或设置DEMO_MODE=true");
  process.exit(1);
}

// 配置数据库 schema (Vercel环境始终使用PostgreSQL)
console.log("🔧 配置数据库 schema...");
const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
let schema = fs.readFileSync(schemaPath, "utf8");

// 在Vercel环境中，始终使用PostgreSQL
schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
schema = schema.replace('provider = "mysql"', 'provider = "postgresql"');
fs.writeFileSync(schemaPath, schema);
console.log("✅ 数据库 schema 配置为 PostgreSQL");

try {
  // 总是生成 Prisma 客户端
  console.log("📦 生成 Prisma 客户端...");
  execSync("npx prisma generate", { stdio: "inherit" });

  if (!isDemoMode && hasValidDatabaseUrl) {
    // 生产模式且有有效数据库URL时同步数据库
    console.log("🗄️ 同步数据库结构...");
    try {
      execSync("npx prisma migrate deploy", { stdio: "inherit" });
    } catch (error) {
      console.log("⚠️ 迁移失败，尝试使用 db push...");
      execSync("npx prisma db push", { stdio: "inherit" });
    }
  } else {
    console.log(`⚠️ 跳过数据库迁移 (演示模式)`);
  }

  // 构建 Next.js 应用
  console.log("🏗️ 构建 Next.js 应用...");
  execSync("npx next build", { stdio: "inherit" });

  console.log("✅ 构建完成!");
} catch (error) {
  console.error("❌ 构建失败:", error.message);
  process.exit(1);
}
