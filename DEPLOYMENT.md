# RelicHub Vercel 部署指南

## 🌍 Vercel 快速部署

### 第一步：环境变量配置

在 Vercel 项目设置中添加以下环境变量：

#### 演示模式部署（推荐）

```
DEMO_MODE=true
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

#### 生产模式部署（需要 PostgreSQL 数据库）

```
DEMO_MODE=false
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 第二步：部署命令

项目已配置自动部署脚本：

- `npm run vercel-build` - Vercel 构建命令
- 自动检测演示模式
- 自动生成 Prisma 客户端
- 条件性数据库迁移

### 🚨 重要说明

1. **演示模式**：使用内存数据，无需数据库，适合快速演示
2. **生产模式**：需要 PostgreSQL 数据库（推荐 Neon、Supabase、PlanetScale）
3. **不要在生产环境使用 SQLite**：Vercel 无服务器环境不支持文件数据库

### 🎯 推荐的生产数据库服务

#### Neon PostgreSQL（免费额度）

```bash
# 1. 注册 https://neon.tech
# 2. 创建数据库
# 3. 复制连接字符串到 DATABASE_URL
```

#### Supabase PostgreSQL（免费额度）

```bash
# 1. 注册 https://supabase.com
# 2. 创建项目
# 3. 获取数据库URL
```

### 📋 部署检查清单

- [ ] Vercel 环境变量已配置
- [ ] `DEMO_MODE=true`（演示）或有效的`DATABASE_URL`（生产）
- [ ] `NEXTAUTH_SECRET`已设置
- [ ] `NEXTAUTH_URL`已设置为正确域名
- [ ] 如果使用生产数据库，确保网络访问权限

### 🐛 常见问题

#### 问题：Prisma validation error "URL must start with protocol file:"

**解决方案**：

- 演示模式：设置`DEMO_MODE=true`
- 生产模式：确保`DATABASE_URL`以`postgresql://`开头

#### 问题：Database connection failed

**解决方案**：

1. 检查数据库 URL 格式
2. 确认数据库服务器在线
3. 检查网络访问权限
4. 验证用户名/密码

### 🚀 一键部署按钮

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/RelicHub&env=DEMO_MODE,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=RelicHub部署环境变量&envLink=https://github.com/你的用户名/RelicHub/blob/main/DEPLOYMENT.md)

---

## 🔧 高级配置

### 性能优化

- 已启用 ISR（增量静态再生）
- 多层缓存策略
- 图片优化支持 WebP/AVIF
- 代码分割和预加载

### 安全设置

- CSP 头配置
- CSRF 保护
- XSS 防护
- 安全身份验证

### 监控和分析

- 内置性能监控
- 错误追踪
- 用户分析
- 缓存命中率统计

## 部署前准备

### 1. 准备数据库（生产环境）

由于 Vercel 不支持 SQLite，你需要设置一个云数据库。推荐选项：

**选项 A: PlanetScale (推荐)**

1. 访问 [planetscale.com](https://planetscale.com)
2. 创建免费账户
3. 创建新数据库
4. 获取连接字符串

**选项 B: Railway**

1. 访问 [railway.app](https://railway.app)
2. 创建 MySQL 数据库
3. 获取连接字符串

**选项 C: Vercel Postgres**

1. 在 Vercel 仪表板中添加 Postgres 存储

### 2. 生成 NextAuth 密钥

```bash
openssl rand -base64 32
```

保存输出的密钥，稍后在环境变量中使用。

## Vercel 部署步骤

### 1. 连接 GitHub 仓库

1. 推送代码到 GitHub：

```bash
git add .
git commit -m "准备 Vercel 部署"
git push origin main
```

2. 访问 [vercel.com](https://vercel.com)
3. 登录并点击 "New Project"
4. 导入你的 GitHub 仓库

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 必需的环境变量：

```
DATABASE_URL=mysql://username:password@hostname:port/database
NEXTAUTH_SECRET=你生成的密钥
NEXTAUTH_URL=https://你的域名.vercel.app
```

#### 设置步骤：

1. 在 Vercel 仪表板中，进入项目设置
2. 点击 "Environment Variables" 标签
3. 添加上述变量

### 3. 数据库迁移

部署后，你需要运行数据库迁移：

1. 在 Vercel 仪表板中，进入 "Functions" 标签
2. 找到并运行数据库迁移（或使用 Vercel CLI）

或者使用 Vercel CLI：

```bash
npm i -g vercel
vercel login
vercel env pull .env.production
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

### 4. 域名配置

1. 在 Vercel 项目设置中，进入 "Domains" 标签
2. 添加自定义域名（可选）
3. 更新 `NEXTAUTH_URL` 环境变量为新域名

## 部署后验证

1. 访问部署的网站
2. 测试用户注册和登录
3. 测试管理员功能（使用种子数据中的管理员账户）
4. 测试语言切换功能
5. 测试产品浏览和分类功能

## 环境变量示例

```bash
# 生产环境
DATABASE_URL="mysql://user:pass@host:3306/relichub_prod"
NEXTAUTH_SECRET="超长随机字符串"
NEXTAUTH_URL="https://relichub.vercel.app"
```

## 故障排除

### 常见问题：

1. **数据库连接错误**

   - 确保 DATABASE_URL 正确
   - 检查数据库服务器是否允许 Vercel IP

2. **NextAuth 错误**

   - 确保 NEXTAUTH_URL 与实际域名匹配
   - 检查 NEXTAUTH_SECRET 是否设置

3. **图片加载问题**

   - 检查 next.config.ts 中的 remotePatterns 配置

4. **构建错误**
   - 检查所有依赖是否正确安装
   - 确保 TypeScript 类型错误已解决

## 性能优化

- Vercel 自动启用 CDN
- 图片通过 Next.js Image 组件自动优化
- 静态资源自动缓存

## 监控和分析

1. 在 Vercel 仪表板查看：

   - 函数执行时间
   - 错误日志
   - 访问统计

2. 可选：集成 Vercel Analytics

## 更新部署

只需推送到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "更新内容"
git push origin main
```

## 备份

定期备份生产数据库，大多数云数据库提供商都有自动备份功能。
