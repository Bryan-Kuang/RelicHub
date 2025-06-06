# RelicHub - 古玩珍藏

一个优雅的古玩展示网站，用于展示和推广古董收藏品。

## 项目状态

✅ **项目结构已修复** - 所有文件现在都在根目录下
✅ **数据库已配置** - 支持 SQLite (开发) / MySQL (生产)
✅ **开发服务器正在运行** - http://localhost:3000
✅ **初始数据已创建** - 包含管理员用户和示例产品
✅ **链接问题已修复** - 修复了双重 locale 前缀导致的 `/en/en/` 错误
✅ **语言切换功能正常** - 英文/中文切换已优化
✅ **Vercel 部署就绪** - 所有配置文件已准备完成

## 🚀 Vercel 部署

项目已准备好部署到 Vercel！查看详细指南：

- 📋 [部署检查清单](./DEPLOYMENT_CHECKLIST.md) - 逐步检查清单
- 📖 [详细部署指南](./DEPLOYMENT.md) - 完整部署文档

### 快速部署

1. **推送到 GitHub**:

```bash
git add .
git commit -m "准备 Vercel 部署"
git push origin main
```

2. **在 Vercel 导入项目**:

   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project" 并导入你的仓库

3. **设置环境变量**:

```bash
DATABASE_URL="mysql://user:pass@host:3306/db"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://yoursite.vercel.app"
```

4. **部署完成**! 🎉

## 最近修复的问题

### 1. 登录后跳转到 `en/en` 问题 ✅

**问题描述**: 管理员登录后会跳转到不存在的 `/en/en/` 页面

**修复内容**:

- 修复了 `ProductCard.tsx` 中的链接构建，移除手动添加的 locale 前缀
- 修复了登录页面的重定向逻辑
- 修复了所有页面中手动添加 locale 的链接问题

**涉及文件**:

- `src/components/ProductCard.tsx`
- `src/app/[locale]/login/page.tsx`
- `src/app/[locale]/register/page.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/categories/page.tsx`
- `src/app/[locale]/products/[id]/page.tsx`

### 2. 语言切换功能不起作用 ✅

**问题描述**: 语言切换按钮点击后无响应

**修复内容**:

- 优化了 `Navbar.tsx` 中的语言切换逻辑
- 改为使用原生 HTML select 下拉菜单
- 使用可靠的 `window.location.href` 方法进行页面跳转

**涉及文件**:

- `src/components/Navbar.tsx`

### 3. Admin 页面无法访问 ✅

**问题描述**: `/admin` 路径返回 404 错误

**修复内容**:

- 将 admin 相关文件移动到正确的国际化路由位置
- 修复了 admin layout 的国际化支持
- 优化了重定向逻辑

**涉及文件**:

- `src/app/[locale]/admin/layout.tsx`
- `src/app/[locale]/admin/page.tsx`

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（自动配置 SQLite）
npm run dev
```

## 管理员登录

- 邮箱: admin@example.com
- 密码: password123

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Prisma ORM + SQLite (开发) / MySQL (生产)
- **认证**: NextAuth.js
- **国际化**: next-intl
- **部署**: Vercel

## 项目特性

### ✨ 功能特性

- 🌍 双语支持 (中文/英文)
- 🔐 用户认证系统
- 👨‍💼 管理员后台
- 📱 响应式设计
- 🖼️ 图片优化
- 🔍 产品分类浏览

### 🛠️ 技术特性

- 🚀 Server-Side Rendering (SSR)
- 📱 移动端优化
- 🔒 类型安全 (TypeScript)
- 🎨 现代化 UI 设计
- ⚡ 性能优化

## 项目结构

```
RelicHub/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/        # 国际化路由
│   │   └── api/             # API 路由
│   ├── components/          # React 组件
│   ├── lib/                 # 工具库
│   ├── i18n/                # 国际化配置
│   └── messages/            # 翻译文件
├── prisma/                  # 数据库 Schema
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
├── vercel.json              # Vercel 配置
├── DEPLOYMENT.md            # 部署指南
└── DEPLOYMENT_CHECKLIST.md # 部署清单
```

## 开发指南

### 本地开发

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run lint         # 代码检查
```

### 数据库操作

```bash
npx prisma studio           # 打开数据库管理界面
npx prisma migrate dev       # 创建新迁移
npx prisma db seed          # 运行种子数据
```

## 生产环境配置

### 数据库选择

项目支持多种数据库，推荐用于生产环境：

1. **PlanetScale** (推荐) - 免费 MySQL 数据库
2. **Railway** - 简单易用的云数据库
3. **Vercel Postgres** - 与 Vercel 深度集成

### 环境变量

开发环境自动使用 SQLite，生产环境需要配置：

```bash
DATABASE_URL="mysql://user:pass@host:3306/db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://yourdomain.com"
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -am '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**准备部署？** 查看 [部署检查清单](./DEPLOYMENT_CHECKLIST.md) 开始你的 Vercel 部署之旅！🚀

## 功能特点

- 展示精美的古玩藏品，包括详细描述和图片
- 按类别浏览藏品
- 每件藏品都有链接到亚马逊的购买链接
- 管理员可以登录管理后台
- 管理员可以添加、编辑和删除藏品和类别
- 搜索功能，方便用户快速找到感兴趣的藏品
- 响应式设计，适配不同设备

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

注意：系统仅支持管理员登录，不提供用户注册功能。

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
