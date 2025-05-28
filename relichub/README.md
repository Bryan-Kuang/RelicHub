# 古玩珍藏 (RelicHub)

一个优雅的古玩展示网站，用于展示和推广古董收藏品，并通过亚马逊链接进行销售。

## 功能特点

- 展示精美的古玩藏品，包括详细描述和图片
- 按类别浏览藏品
- 每件藏品都有链接到亚马逊的购买链接
- 管理员可以登录管理后台
- 管理员可以添加、编辑和删除藏品和类别
- 搜索功能，方便用户快速找到感兴趣的藏品
- 响应式设计，适配不同设备

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite 数据库
- NextAuth.js 认证

## 开始使用

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/relichub.git
cd relichub
```

2. 安装依赖

```bash
npm install
```

3. 创建环境变量文件

```bash
# .env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. 初始化数据库

```bash
npx prisma generate
npx prisma db push
```

5. 初始化种子数据
   访问 http://localhost:3000/api/seed 创建初始管理员用户和示例数据

6. 启动开发服务器

```bash
npm run dev
```

7. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 管理员登录信息

- 邮箱: admin@example.com
- 密码: password123

## 部署到 Vercel

### 准备工作

1. 确保你有一个 [Vercel 账户](https://vercel.com/signup)
2. Fork 这个仓库到你的 GitHub 账户

### 部署步骤

1. 在 Vercel 控制台中点击 "New Project"
2. 导入你的 GitHub 仓库 (RelicHub)
3. 配置项目：

   - **框架预设**: 选择 "Next.js"
   - **根目录**: 输入 "relichub"（如果你的项目结构不同，请相应调整）
   - **环境变量**: 添加以下环境变量
     - `DATABASE_URL`: 使用 Vercel Postgres 或其他数据库服务的连接 URL
     - `NEXTAUTH_SECRET`: 一个随机生成的密钥，用于 NextAuth.js 加密
     - `NEXTAUTH_URL`: 你的 Vercel 部署 URL (例如 https://your-project.vercel.app)

4. 点击 "Deploy" 按钮

### 初始化数据库

部署完成后，你需要初始化数据库并创建管理员用户：

1. 访问 `https://your-project.vercel.app/api/seed`
2. 这将创建初始管理员用户和示例数据
3. 现在你可以使用管理员凭据登录

### 自定义域名（可选）

1. 在 Vercel 项目设置中，转到 "Domains" 选项卡
2. 添加你的自定义域名并按照说明进行配置

## 项目结构

```
relichub/
├── prisma/              # 数据库模型和迁移
├── public/              # 静态资源
├── src/
│   ├── app/             # Next.js 应用页面
│   │   ├── admin/       # 管理员控制面板
│   │   ├── api/         # API 路由
│   │   ├── products/    # 产品页面
│   │   ├── categories/  # 分类页面
│   │   └── ...
│   ├── components/      # 共享组件
│   ├── lib/             # 工具函数和库
│   └── types/           # TypeScript 类型定义
└── ...
```

## 许可证

MIT

## MySQL 数据库迁移指南

项目已从 SQLite 迁移到 MySQL，以便更好地在 Vercel 上部署。请按照以下步骤完成迁移：

1. 创建 MySQL 数据库（可以使用 PlanetScale、Amazon RDS、Google Cloud SQL 等）

2. 创建 `.env` 文件并设置数据库连接：

```
DATABASE_URL="mysql://用户名:密码@主机:端口/数据库名"
NEXTAUTH_SECRET="你的-nextauth-密钥"
NEXTAUTH_URL="http://localhost:3000"
```

3. 执行 Prisma 迁移命令：

```bash
# 生成迁移脚本
npx prisma migrate dev --name mysql-migration

# 部署迁移
npx prisma migrate deploy
```

4. 执行种子数据（可选）：

```bash
# 启动开发服务器
npm run dev

# 在另一个终端中请求种子 API
curl http://localhost:3000/api/seed
```

## Vercel 部署指南

1. 安装 Vercel CLI：

```bash
npm i -g vercel
```

2. 登录 Vercel：

```bash
vercel login
```

3. 部署项目：

```bash
vercel
```

4. 在 Vercel 控制台中设置环境变量：

   - 添加 `DATABASE_URL` 环境变量，指向您的 MySQL 数据库
   - 添加 `NEXTAUTH_SECRET` 环境变量，设置一个安全的密钥
   - 添加 `NEXTAUTH_URL` 环境变量，设置为您的 Vercel 部署 URL

5. 手动触发重新部署或推送新的代码变更来部署应用
