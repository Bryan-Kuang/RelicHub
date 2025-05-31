# 🔄 从演示模式切换到生产环境指南

## 当前状态

✅ **演示模式已部署** - 网站使用模拟数据运行  
✅ **完整功能展示** - 所有页面和功能正常工作  
✅ **零数据库依赖** - 无需配置即可运行

## 切换到生产环境

当你准备好连接真实数据库并启用数据持久化时，按照以下步骤操作：

### 第一步：准备生产数据库

选择并配置云数据库服务：

#### 选项 A: PlanetScale (推荐)

```bash
# 1. 访问 https://planetscale.com
# 2. 创建免费账户
# 3. 创建新数据库
# 4. 获取连接字符串（格式如下）
mysql://username:password@hostname.us-east-2.psdb.cloud/database?ssl={"rejectUnauthorized":true}
```

#### 选项 B: Railway

```bash
# 1. 访问 https://railway.app
# 2. 创建 MySQL 数据库
# 3. 获取连接字符串
mysql://username:password@hostname:port/database
```

#### 选项 C: Vercel Postgres

```bash
# 1. 在 Vercel 项目中添加 Postgres 存储
# 2. 获取连接字符串
postgres://username:password@hostname:port/database
```

### 第二步：更新 Vercel 环境变量

在 Vercel 项目设置中修改环境变量：

```bash
# 关闭演示模式
DEMO_MODE=false

# 添加真实数据库连接
DATABASE_URL="your-real-database-url-here"

# 保持现有的认证配置
NEXTAUTH_SECRET="your-existing-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### 第三步：更新数据库配置

如果使用 PostgreSQL，需要更新 Prisma schema：

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // 如果使用 Postgres
  // provider = "mysql"    // 如果使用 MySQL
  url      = env("DATABASE_URL")
}
```

### 第四步：运行数据库迁移

使用 Vercel CLI 运行迁移：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 进入项目目录
cd your-project

# 拉取生产环境变量
vercel env pull .env.production

# 运行数据库迁移
npx prisma migrate deploy

# 生成 Prisma 客户端
npx prisma generate

# 创建初始数据（可选）
npx prisma db seed
```

### 第五步：触发重新部署

```bash
# 方式1: 推送代码变更
git add .
git commit -m "切换到生产数据库"
git push origin main

# 方式2: 在 Vercel 仪表板手动重新部署
```

### 第六步：验证生产部署

部署完成后验证以下功能：

- [ ] 网站正常访问
- [ ] 用户注册功能（数据会被保存）
- [ ] 用户登录功能
- [ ] 管理员后台访问
- [ ] 产品和分类管理功能
- [ ] 数据持久化正常

## 回滚到演示模式

如果遇到问题，可以快速回滚到演示模式：

```bash
# 在 Vercel 环境变量中设置
DEMO_MODE=true

# 移除数据库连接（可选）
# DATABASE_URL=""

# 重新部署即可回到演示模式
```

## 数据迁移（如果需要）

如果你想将演示数据导入到真实数据库：

### 方法 1: 使用种子脚本

```bash
# 修改 prisma/seed.ts 包含演示数据
# 然后运行
npx prisma db seed
```

### 方法 2: 手动导入

1. 在管理员后台逐个添加产品和分类
2. 使用批量导入工具（如果有的话）

## 环境对比

| 功能     | 演示模式  | 生产模式    |
| -------- | --------- | ----------- |
| 数据浏览 | ✅        | ✅          |
| 用户注册 | ⚠️ 仅展示 | ✅ 完整功能 |
| 数据修改 | ⚠️ 临时   | ✅ 永久保存 |
| 管理后台 | ✅ 展示   | ✅ 完整功能 |
| 性能     | 🚀 极快   | ✅ 正常     |
| 成本     | 💰 $0     | 💰 $5-20/月 |

## 常见问题解决

### 1. 数据库连接错误

```bash
# 检查连接字符串格式
# 确保数据库服务正在运行
# 验证网络访问权限
```

### 2. 迁移失败

```bash
# 重置迁移（谨慎使用）
npx prisma migrate reset --force

# 重新运行迁移
npx prisma migrate deploy
```

### 3. 性能问题

```bash
# 检查数据库查询优化
# 考虑添加索引
# 监控数据库性能指标
```

## 技术支持

如果在切换过程中遇到问题：

1. 检查 Vercel 部署日志
2. 查看数据库服务状态
3. 验证环境变量配置
4. 参考 [主要部署文档](./DEPLOYMENT.md)

---

## 🎯 快速切换命令

```bash
# === 切换到生产模式 ===
# 1. 设置 Vercel 环境变量
DEMO_MODE=false
DATABASE_URL="your-database-url"

# 2. 运行迁移
vercel env pull .env.production
npx prisma migrate deploy
npx prisma generate

# 3. 重新部署
git push origin main

# === 回滚到演示模式 ===
# 1. 设置 Vercel 环境变量
DEMO_MODE=true

# 2. 重新部署
git push origin main
```

**记住**：演示模式是展示项目的完美方式，生产模式是实际运营的必需配置。根据你的需求选择合适的模式！🚀
