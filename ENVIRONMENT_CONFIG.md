# 🌍 RelicHub 环境配置指南

## 📋 环境配置总览

| 环境            | 数据库类型 | DEMO_MODE | DATABASE_URL       | 说明        |
| --------------- | ---------- | --------- | ------------------ | ----------- |
| **本地开发**    | SQLite     | `true`    | `file:./dev.db`    | 自动配置    |
| **Vercel 演示** | 内存数据   | `true`    | -                  | 快速部署    |
| **Vercel 生产** | PostgreSQL | `false`   | `postgresql://...` | 需要真实 DB |

## 🏠 本地开发环境

### 自动配置

```bash
npm run dev
```

### 环境变量（.env.local）

```bash
DEMO_MODE=true
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 工作原理

1. `scripts/setup-db.js` 检测到开发环境
2. 自动将 `prisma/schema.prisma` 中的 provider 改为 "sqlite"
3. 使用文件数据库 `dev.db`

## 🌐 Vercel 演示模式

### 环境变量配置

```bash
DEMO_MODE=true
NEXTAUTH_SECRET="Ad/ZgSMWZw2ThcT2yMDWGYqQTFMf8uLHlzBfN0vMeiY="
NEXTAUTH_URL="https://your-project.vercel.app"
```

### 特性

- ✅ 无需数据库连接
- ✅ 内存中的演示数据
- ✅ 快速部署
- ✅ 完整功能展示

## 🏭 Vercel 生产模式

### 环境变量配置

```bash
DEMO_MODE=false
DATABASE_URL="postgresql://user:pass@host:port/db"
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### 推荐数据库服务

#### Neon PostgreSQL（免费）

```bash
# 1. 注册 https://neon.tech
# 2. 创建项目
# 3. 获取连接字符串
DATABASE_URL="postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/main"
```

#### Supabase PostgreSQL（免费）

```bash
# 1. 注册 https://supabase.com
# 2. 创建项目
# 3. Settings → Database → Connection String
DATABASE_URL="postgresql://postgres:pass@db.xyz.supabase.co:5432/postgres"
```

#### Vercel Postgres

```bash
# 1. Vercel项目 → Storage → Create Database
# 2. 选择 Postgres
# 3. 自动添加环境变量
```

## 🔧 构建脚本逻辑

### 本地开发 (`npm run dev`)

```javascript
// scripts/setup-db.js
if (isDevelopment) {
  // 配置为SQLite
  schema = schema.replace('provider = "postgresql"', 'provider = "sqlite"');
}
```

### Vercel 部署 (`npm run vercel-build`)

```javascript
// scripts/vercel-build.js
if (!isDemoMode && !hasValidDatabaseUrl) {
  console.error("❌ 生产环境需要有效的PostgreSQL数据库URL");
  process.exit(1);
}
```

## 🚨 常见错误及解决方案

### Error: URL must start with protocol `file:`

**原因**：Prisma schema 配置为 SQLite 但环境是 PostgreSQL
**解决**：确保环境变量配置正确

### PrismaClientInitializationError

**原因**：数据库连接失败
**解决**：检查 DATABASE_URL 格式和数据库可用性

### Build failing on Vercel

**原因**：环境变量未配置或不正确
**解决**：按照上述配置添加环境变量

## 📝 快速检查清单

### 本地开发

- [ ] 运行 `npm run dev`
- [ ] 检查 `dev.db` 文件是否生成
- [ ] 验证 SQLite 数据库正常工作

### Vercel 演示部署

- [ ] 设置 `DEMO_MODE=true`
- [ ] 设置 `NEXTAUTH_SECRET`
- [ ] 设置 `NEXTAUTH_URL`
- [ ] 重新部署

### Vercel 生产部署

- [ ] 创建 PostgreSQL 数据库
- [ ] 设置 `DEMO_MODE=false`
- [ ] 设置正确的 `DATABASE_URL`
- [ ] 设置 `NEXTAUTH_SECRET`
- [ ] 设置 `NEXTAUTH_URL`
- [ ] 重新部署

## 🔄 环境切换

### 从演示模式切换到生产模式

1. 创建 PostgreSQL 数据库
2. 更新 `DEMO_MODE=false`
3. 添加 `DATABASE_URL`
4. 重新部署

### 从生产模式回到演示模式

1. 更新 `DEMO_MODE=true`
2. 删除 `DATABASE_URL`（可选）
3. 重新部署

---

遵循此配置指南，可确保 RelicHub 在所有环境中正常运行！
