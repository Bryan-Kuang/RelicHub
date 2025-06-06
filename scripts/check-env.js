#!/usr/bin/env node

/**
 * RelicHub 环境配置检查脚本
 * 用于验证当前环境配置是否正确
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 RelicHub 环境配置检查\n");

// 检查环境变量
const isDemoMode = process.env.DEMO_MODE === "true";
const hasDatabase = !!process.env.DATABASE_URL;
const databaseType =
  process.env.DATABASE_URL?.includes("postgresql") ||
  process.env.DATABASE_URL?.includes("postgres")
    ? "PostgreSQL"
    : process.env.DATABASE_URL?.includes("file:")
    ? "SQLite"
    : "未知";

console.log("📋 环境变量状态:");
console.log(`   DEMO_MODE: ${isDemoMode ? "✅ true" : "❌ false"}`);
console.log(
  `   DATABASE_URL: ${hasDatabase ? `✅ ${databaseType}` : "❌ 未设置"}`
);
console.log(
  `   NEXTAUTH_SECRET: ${
    process.env.NEXTAUTH_SECRET ? "✅ 已设置" : "❌ 未设置"
  }`
);
console.log(
  `   NEXTAUTH_URL: ${
    process.env.NEXTAUTH_URL ? "✅ " + process.env.NEXTAUTH_URL : "❌ 未设置"
  }`
);

// 检查Prisma Schema
const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, "utf8");
  const provider = schema.match(/provider\s*=\s*"([^"]+)"/)?.[1];
  console.log(`\n🗄️ Prisma Schema状态:`);
  console.log(`   Provider: ${provider}`);

  // 环境一致性检查
  const isLocal = process.env.NODE_ENV !== "production";

  if (isLocal && provider === "sqlite") {
    console.log("   ✅ 本地开发环境配置正确 (SQLite)");
  } else if (!isLocal && provider === "postgresql" && hasDatabase) {
    console.log("   ✅ 生产环境配置正确 (PostgreSQL)");
  } else if (!isLocal && isDemoMode) {
    console.log("   ✅ 演示模式配置正确");
  } else {
    console.log("   ⚠️ 环境配置可能不匹配");
  }
}

// 环境建议
console.log("\n💡 环境建议:");

if (process.env.VERCEL) {
  // Vercel环境
  console.log("   🌐 检测到Vercel环境");
  if (isDemoMode) {
    console.log("   ✅ 推荐配置: 演示模式，无需数据库");
  } else if (hasDatabase && databaseType === "PostgreSQL") {
    console.log("   ✅ 推荐配置: 生产模式，使用PostgreSQL");
  } else {
    console.log("   ❌ 配置错误: 生产模式需要PostgreSQL数据库URL");
    console.log("   💡 解决方案:");
    console.log("      - 设置 DEMO_MODE=true（演示模式）");
    console.log("      - 或添加 DATABASE_URL=postgresql://...（生产模式）");
  }
} else {
  // 本地环境
  console.log("   🏠 检测到本地开发环境");
  console.log("   ✅ 推荐配置: DEMO_MODE=true，自动使用SQLite");
}

console.log("\n📚 更多信息请查看:");
console.log("   - ENVIRONMENT_CONFIG.md - 详细环境配置指南");
console.log("   - QUICK_DEPLOY_DEMO.md - Vercel快速部署指南");

console.log("\n🎯 环境检查完成!\n");
