# 古玩珍藏 (RelicHub)

一个优雅的古玩展示网站，用于展示和推广古董收藏品，并通过亚马逊链接进行销售。

## 功能特点

- 展示精美的古玩藏品，包括详细描述和图片
- 按类别浏览藏品
- 每件藏品都有链接到亚马逊的购买链接
- 管理员可以登录管理后台
- 管理员可以添加、编辑和删除藏品和类别

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

1. Fork 这个仓库到你的 GitHub 账户
2. 在 Vercel 中导入该项目
3. 设置环境变量
4. 部署

## 许可证

MIT
