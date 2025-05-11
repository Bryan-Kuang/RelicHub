# 古玩电商网站

这是一个双语（中文/英文）古玩电商网站，包含用户端和管理端界面。

## 如何运行网站

要运行此网站，请按照以下步骤操作：

### 1. 设置 Firebase

首先，您需要创建一个 Firebase 项目并获取配置信息：

1. 访问 [Firebase 控制台](https://console.firebase.google.com/)
2. 点击"添加项目"并创建一个新项目
3. 在项目设置中，添加一个 Web 应用
4. 复制 Firebase 配置信息
5. 启用 Firebase Authentication 中的电话验证功能
6. 创建 Firestore 数据库

### 2. 配置环境变量

1. 复制 `.env.example` 文件并重命名为 `.env.local`
2. 用您的 Firebase 配置信息填充 `.env.local` 文件：

```
NEXT_PUBLIC_FIREBASE_API_KEY=您的API密钥
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=您的项目ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=您的项目ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=您的项目ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=您的消息发送者ID
NEXT_PUBLIC_FIREBASE_APP_ID=您的应用ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=您的测量ID
```

### 3. 安装依赖

在项目根目录中运行：

```bash
npm install
```

### 4. 初始化数据库

运行以下命令创建超级管理员账户和示例产品：

```bash
npm run init-firebase +您的手机号码
```

请将 `+您的手机号码` 替换为您的实际手机号码（例如 +8613800138000）。

### 5. 运行开发服务器

```bash
npm run dev
```

### 6. 访问网站

打开浏览器并访问 [http://localhost:3000](http://localhost:3000)

## 网站功能

### 用户端

- 双语支持（中文/英文）
- 搜索商品功能
- 随机推荐商品
- 商品详情页面，包含寓意描述
- 亚马逊购买链接

### 管理端

- 通过手机短信验证登录
- 管理控制台
- 商品管理（添加/编辑/删除）
- 管理员用户管理
- 基于角色的权限（超级管理员/普通管理员）

## 部署到 Vercel

要部署到 Vercel，请运行：

```bash
npm run vercel-deploy
```

确保在 Vercel 控制台中设置环境变量。
