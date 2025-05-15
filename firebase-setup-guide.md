# Firebase 设置指南

## 解决权限错误问题

您遇到的 `PERMISSION_DENIED: Missing or insufficient permissions` 错误是因为 Firebase Firestore 的安全规则默认不允许读写操作。要解决这个问题，请按照以下步骤操作：

### 1. 配置 Firestore 安全规则

1. 登录 [Firebase 控制台](https://console.firebase.google.com/)
2. 选择您的项目 "relichub-51d56"
3. 在左侧菜单中，点击 "Firestore Database"
4. 点击顶部的 "规则" 选项卡
5. 将规则修改为以下内容（仅用于开发环境）：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // 警告：这允许所有人读写，仅用于开发
    }
  }
}
```

6. 点击 "发布" 按钮保存规则

### 2. 为生产环境设置更安全的规则

在实际部署到生产环境之前，您应该设置更严格的安全规则。以下是一个更安全的示例：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允许所有用户读取产品
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // 仅允许管理员访问管理员集合
    match /admins/{adminId} {
      allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      allow write: if request.auth != null &&
                   exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
                   get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "superadmin";
    }
  }
}
```

### 3. 初始化第一个管理员用户

由于我们的安全规则要求用户必须已经是管理员才能添加新管理员，我们需要手动添加第一个超级管理员：

1. 在 Firebase 控制台中，点击 "Firestore Database"
2. 点击 "开始收集" 或 "添加集合"
3. 集合 ID 输入 `admins`
4. 添加一个文档，文档 ID 可以自动生成
5. 添加以下字段：

   - `phoneNumber`: 字符串类型，值为您的手机号码（例如 "+12368385058"）
   - `role`: 字符串类型，值为 "superadmin"
   - `createdAt`: 时间戳类型，选择 "当前时间"

6. 点击 "保存" 按钮

### 4. 再次运行初始化脚本

现在您已经配置了安全规则并手动添加了第一个管理员，您可以再次运行初始化脚本来添加示例产品：

```bash
npm run init-firebase +12368385058
```

## 其他可能的问题

如果您仍然遇到问题，请检查以下几点：

1. 确保您的 Firebase 项目已启用 Firestore 数据库
2. 确保您的 Firebase 项目已启用电话验证功能
3. 确保您的 Firebase 配置信息正确
4. 检查您的网络连接是否正常

## 生产环境注意事项

在部署到生产环境之前，请务必：

1. 设置更严格的安全规则
2. 启用 Firebase Authentication 的电话验证功能
3. 配置 Firebase 项目的付费计划，以确保电话验证和数据库功能正常工作
