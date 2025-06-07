# 环境变量配置指南

这个文件帮助您正确配置工艺坊网站所需的所有环境变量。

## 🔧 环境变量列表

### 必需变量

```bash
DATABASE_URL="postgresql://用户名:密码@主机地址:5432/数据库名"
NEXTAUTH_SECRET="your-32-character-secret-key"
NEXTAUTH_URL="https://your-website-domain.vercel.app"
ADMIN_EMAIL="your-email@example.com"
```

### 可选变量

```bash
DEMO_MODE="false"  # 生产环境设为false，开发环境可设为true
```

## 📝 详细说明

### 1. DATABASE_URL

- **作用**: 数据库连接字符串
- **获取方式**:
  1. 登录 [Neon.tech](https://neon.tech)
  2. 创建项目后在 Dashboard 找到"Connection Details"
  3. 复制完整的连接字符串
- **格式**: `postgresql://用户名:密码@主机地址:5432/数据库名`
- **示例**: `postgresql://user123:abc123@ep-cool-lab-123456.us-east-1.aws.neon.tech:5432/crafthub`

### 2. NEXTAUTH_SECRET

- **作用**: JWT 令牌加密密钥
- **获取方式**:
  1. 访问 [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
  2. 复制生成的 32 位字符串
- **格式**: 32 位随机字符串
- **示例**: `aB3xY9mK2pQ7wE5tR8uI1oP4sD6fG9hJ`

### 3. NEXTAUTH_URL

- **作用**: 网站的完整 URL 地址
- **获取方式**:
  1. 在 Vercel 部署完成后获得
  2. 格式通常为 `https://项目名-随机字符.vercel.app`
- **格式**: 完整的 https URL
- **示例**: `https://crafthub-abc123.vercel.app`

### 4. ADMIN_EMAIL

- **作用**: 管理员邮箱，用于自动获得管理员权限
- **获取方式**: 使用您自己的邮箱地址
- **格式**: 有效的邮箱地址
- **示例**: `admin@yourstore.com`

### 5. DEMO_MODE (可选)

- **作用**: 控制是否启用演示模式
- **设置**:
  - `false` - 生产环境（推荐）
  - `true` - 演示模式，会创建示例数据
- **格式**: 字符串 "true" 或 "false"
- **示例**: `false`

## 🚀 在 Vercel 中设置环境变量

### 步骤 1: 进入项目设置

1. 登录 Vercel dashboard
2. 选择您的项目
3. 点击 "Settings" 标签
4. 选择 "Environment Variables"

### 步骤 2: 添加变量

1. 点击 "Add New" 按钮
2. 输入变量名（如：DATABASE_URL）
3. 输入变量值
4. 选择环境：Production, Preview, Development（建议全选）
5. 点击 "Save"

### 步骤 3: 重新部署

添加完所有环境变量后：

1. 前往 "Deployments" 页面
2. 找到最新的部署
3. 点击右侧的三个点菜单
4. 选择 "Redeploy"

## ⚠️ 安全注意事项

### 保护您的环境变量

- ❌ **永远不要**将环境变量提交到 Git 仓库
- ❌ **永远不要**在代码中硬编码敏感信息
- ✅ **只在**Vercel dashboard 中设置环境变量
- ✅ **定期更换**NEXTAUTH_SECRET 密钥

### 最佳实践

1. **备份重要信息**: 将 DATABASE_URL 和 NEXTAUTH_SECRET 保存在安全的地方
2. **使用强密码**: 数据库密码应该包含字母、数字和特殊字符
3. **限制访问权限**: 只有必要的人员才能访问 Vercel 项目设置

## 🔍 验证配置

### 检查环境变量是否正确设置：

1. **数据库连接测试**:

   - 网站能正常加载
   - 可以注册新用户
   - 管理员功能正常

2. **认证功能测试**:

   - 用户注册/登录正常
   - 会话状态保持
   - 登出功能正常

3. **管理员权限测试**:
   - 使用 ADMIN_EMAIL 注册的用户自动获得管理员权限
   - 可以访问管理后台
   - 可以添加/编辑产品

## 🆘 常见问题

### Q: 网站显示数据库连接错误

**A**: 检查 DATABASE_URL 是否正确，确保：

- 连接字符串格式正确
- 数据库服务正常运行
- 网络连接正常

### Q: 登录后立即退出

**A**: 检查 NEXTAUTH_SECRET 和 NEXTAUTH_URL：

- NEXTAUTH_SECRET 不能为空
- NEXTAUTH_URL 必须与实际网站地址完全一致

### Q: 注册用户没有管理员权限

**A**: 检查 ADMIN_EMAIL：

- 确保邮箱地址正确
- 使用该邮箱注册新账号
- 退出重新登录

### Q: 环境变量修改后不生效

**A**: 需要重新部署：

1. 在 Vercel 的 Deployments 页面
2. 选择"Redeploy"
3. 等待部署完成

---

**💡 提示**: 如果遇到问题，可以在 Vercel 的 Functions 日志中查看详细错误信息，帮助诊断问题。

**📞 需要帮助**: 如有疑问，请联系技术支持人员。
