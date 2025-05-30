# 🚀 RelicHub Vercel 部署检查清单

## ✅ 部署前检查

### 代码准备

- [ ] 所有功能测试通过
- [ ] 语言切换功能正常
- [ ] 登录/注册功能正常
- [ ] 管理员页面访问正常
- [ ] 产品浏览功能正常

### 文件和配置

- [ ] `vercel.json` 配置正确
- [ ] `next.config.ts` 优化完成
- [ ] `prisma/schema.prisma` 使用 MySQL
- [ ] `DEPLOYMENT.md` 指南准备完成
- [ ] `.env.example` 文件存在

### Git 仓库

- [ ] 代码已推送到 GitHub
- [ ] 仓库是公开的（或 Vercel 有访问权限）
- [ ] README.md 更新

## 🌐 Vercel 配置

### 数据库准备

- [ ] 选择数据库服务商（PlanetScale/Railway/Vercel Postgres）
- [ ] 创建生产数据库
- [ ] 获取 DATABASE_URL

### 环境变量设置

- [ ] `DATABASE_URL` - 生产数据库连接字符串
- [ ] `NEXTAUTH_SECRET` - 生成的随机密钥
- [ ] `NEXTAUTH_URL` - 生产域名（如：https://yoursite.vercel.app）

### Vercel 项目配置

- [ ] 项目从 GitHub 导入
- [ ] Framework Preset 设置为 "Next.js"
- [ ] Root Directory 设置为 "/"
- [ ] Build Command: `npm run vercel-build`
- [ ] Output Directory: `.next`

## 🔧 部署后验证

### 基本功能

- [ ] 网站可以访问
- [ ] 首页加载正常
- [ ] 语言切换工作正常（EN/中文）

### 用户功能

- [ ] 用户注册功能
- [ ] 用户登录功能
- [ ] 产品浏览功能
- [ ] 分类浏览功能

### 管理员功能

- [ ] 管理员登录（admin@example.com / password123）
- [ ] 管理员仪表板访问
- [ ] 产品管理功能
- [ ] 分类管理功能

### 性能检查

- [ ] 页面加载速度 < 3 秒
- [ ] 图片正常加载
- [ ] 移动端响应式正常

## 🐛 常见问题处理

### 构建失败

- [ ] 检查 TypeScript 错误
- [ ] 确认所有依赖正确安装
- [ ] 验证环境变量格式

### 数据库连接错误

- [ ] 验证 DATABASE_URL 格式
- [ ] 确认数据库服务正在运行
- [ ] 检查网络连接权限

### NextAuth 错误

- [ ] 确认 NEXTAUTH_URL 与域名匹配
- [ ] 验证 NEXTAUTH_SECRET 已设置
- [ ] 检查回调 URL 配置

## 📝 部署命令参考

```bash
# 生成 NextAuth 密钥
openssl rand -base64 32

# 本地测试构建
npm run build

# 手动部署（如果需要）
npx vercel --prod

# 查看部署日志
npx vercel logs
```

## 🔄 更新部署流程

1. 修改代码
2. 测试本地功能
3. 提交并推送到 GitHub

```bash
git add .
git commit -m "描述更改"
git push origin main
```

4. Vercel 自动重新部署
5. 验证部署成功

## 📊 性能监控

部署后定期检查：

- [ ] Vercel Analytics 数据
- [ ] 错误率监控
- [ ] 响应时间监控
- [ ] 数据库性能

## 🔐 安全检查

- [ ] 所有敏感信息使用环境变量
- [ ] 生产环境使用 HTTPS
- [ ] 数据库连接加密
- [ ] 用户密码正确哈希

---

完成所有检查项后，你的 RelicHub 项目就可以成功部署到 Vercel 了！🎉
