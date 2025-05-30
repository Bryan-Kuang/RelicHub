#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const isDevelopment =
  process.env.NODE_ENV !== "production" &&
  !process.env.DATABASE_URL?.includes("mysql") &&
  !process.env.DATABASE_URL?.includes("postgres");

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
let schema = fs.readFileSync(schemaPath, "utf8");

if (isDevelopment) {
  // 在开发环境使用 SQLite
  schema = schema.replace('provider = "mysql"', 'provider = "sqlite"');
  console.log("✅ 配置开发环境数据库 (SQLite)");
} else {
  // 在生产环境使用 MySQL
  schema = schema.replace('provider = "sqlite"', 'provider = "mysql"');
  console.log("✅ 配置生产环境数据库 (MySQL)");
}

fs.writeFileSync(schemaPath, schema);
console.log("数据库配置完成");
