# 🚀 RelicHub 快速演示部署

## ⚡ 立即修复 Vercel 部署问题

**您遇到的错误**：

```
Error validating datasource `db`: the URL must start with the protocol `file:`.
```

**解决方案**：在 Vercel 项目设置中添加环境变量

### 1️⃣ 登录 Vercel 控制台

- 进入您的 RelicHub 项目
- 点击 "Settings" 标签
- 选择 "Environment Variables"

### 2️⃣ 添加以下环境变量

**方案 A：演示模式（推荐快速部署）**

```
DEMO_MODE=true
NEXTAUTH_SECRET=Ad/ZgSMWZw2ThcT2yMDWGYqQTFMf8uLHlzBfN0vMeiY=
NEXTAUTH_URL=https://your-project-name.vercel.app
```

**方案 B：生产模式（需要 PostgreSQL 数据库）**

```
DEMO_MODE=false
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=Ad/ZgSMWZw2ThcT2yMDWGYqQTFMf8uLHlzBfN0vMeiY=
NEXTAUTH_URL=https://your-project-name.vercel.app
```

**重要**：将 `your-project-name` 替换为您的实际 Vercel 项目域名

### 3️⃣ 重新部署

- 点击 "Deployments" 标签
- 点击最新部署右侧的 "..." 菜单
- 选择 "Redeploy"

## 🎯 为什么需要这些环境变量？

### `DEMO_MODE=true`

- 启用演示模式，使用内存数据
- 无需真实数据库连接
- 完美适合展示和测试

### `NEXTAUTH_SECRET`

- Next.js 身份验证密钥
- 确保会话安全
- 可以使用提供的默认值或生成新的

### `NEXTAUTH_URL`

- 应用的完整 URL
- 用于身份验证回调
- 必须匹配您的 Vercel 域名

## 🔧 构建脚本智能特性

新的构建脚本会自动：

- ✅ 检测是否有有效的 PostgreSQL 数据库 URL
- ✅ 如果没有，自动启用演示模式
- ✅ 跳过数据库迁移（演示模式）
- ✅ 正常构建 Next.js 应用

## 📊 部署后功能

演示模式包含：

- 📱 完整的用户界面
- 🏺 15 个演示古玩产品
- 📂 4 个产品分类
- 🎨 中英文双语支持
- ⚡ 所有性能优化
- 🔐 管理员功能（演示数据）

## 🚀 生产模式升级

如果后续需要真实数据库：

1. **创建 PostgreSQL 数据库**

   - Neon: https://neon.tech （免费）
   - Supabase: https://supabase.com （免费）
   - PlanetScale: https://planetscale.com

2. **更新环境变量**

   ```
   DEMO_MODE=false
   DATABASE_URL=postgresql://user:pass@host:port/db
   ```

3. **重新部署**

## 🆘 仍有问题？

**常见错误及解决方案**：

### Error: Invalid NEXTAUTH_URL

```
NEXTAUTH_URL=https://your-exact-vercel-domain.vercel.app
```

### Build still failing

1. 清除 Vercel 缓存：Settings → Functions → Clear All Cache
2. 确保所有环境变量已保存
3. 重新部署

### 404 错误

- 检查 Vercel 项目配置
- 确认 Next.js 框架检测正确
- 查看构建日志中的错误信息

---

**部署完成后，您将拥有一个完全功能的古玩交易平台演示！** 🎉
