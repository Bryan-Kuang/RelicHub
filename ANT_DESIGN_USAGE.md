# Ant Design 使用指南

## 项目配置

本项目已集成 Ant Design (antd) 作为主要的 UI 组件库。

### 已安装的包

- `antd` - Ant Design 组件库
- `@ant-design/icons` - Ant Design 图标库
- `@ant-design/nextjs-registry` - Next.js 集成

### 主题配置

项目使用自定义主题(`src/lib/antd-theme.ts`)，与网站的琥珀色调保持一致：

- 主色调：`#d97706` (amber-600)
- 成功色：`#059669` (emerald-600)
- 错误色：`#dc2626` (red-600)
- 背景色：`#fffbeb` (amber-50)

## 使用规范

### 1. 优先使用 Ant Design 组件

在开发新功能时，优先考虑使用 Ant Design 的组件：

```tsx
// ✅ 推荐 - 使用 Ant Design 组件
import { Button, Input, Form, Table, Modal } from "antd";

// ❌ 避免 - 自定义HTML元素（除非必要）
<button className="...">Click me</button>;
```

### 2. 常用组件示例

#### 按钮

```tsx
import { Button } from 'antd';

<Button type="primary">主要按钮</Button>
<Button>默认按钮</Button>
<Button type="link">链接按钮</Button>
```

#### 表单

```tsx
import { Form, Input, Select, Button } from "antd";

<Form layout="vertical">
  <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
  <Form.Item label="角色" name="role">
    <Select>
      <Select.Option value="admin">管理员</Select.Option>
      <Select.Option value="user">用户</Select.Option>
    </Select>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">
      提交
    </Button>
  </Form.Item>
</Form>;
```

#### 表格

```tsx
import { Table } from "antd";

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "年龄", dataIndex: "age", key: "age" },
  {
    title: "操作",
    key: "action",
    render: (_, record) => <Button type="link">编辑</Button>,
  },
];

<Table dataSource={data} columns={columns} />;
```

#### 图标

```tsx
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

<Button type="primary" icon={<PlusOutlined />}>
  添加
</Button>;
```

### 3. 国际化支持

Ant Design 组件会自动使用项目的国际化配置。对于中文界面，确保导入中文语言包：

```tsx
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

<ConfigProvider locale={zhCN}>{/* 组件内容 */}</ConfigProvider>;
```

### 4. 响应式设计

使用 Ant Design 的响应式工具：

```tsx
import { Row, Col } from "antd";

<Row gutter={16}>
  <Col xs={24} sm={12} md={8} lg={6}>
    <div>响应式内容</div>
  </Col>
</Row>;
```

### 5. 与 Tailwind CSS 混合使用

虽然主要使用 Ant Design，但可以结合 Tailwind CSS 进行细节调整：

```tsx
<Button
  type="primary"
  className="mb-4" // Tailwind CSS 类
>
  按钮
</Button>
```

## 迁移现有代码

### 优先级

1. **管理页面** - 优先使用 Ant Design 的 Table, Form, Button 等组件
2. **表单页面** - 使用 Form, Input, Select 等组件
3. **列表页面** - 使用 Table, List, Pagination 等组件
4. **公共组件** - 逐步迁移到 Ant Design 组件

### 示例迁移

#### 迁移表格

```tsx
// 旧代码
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th>名称</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    {/* ... */}
  </tbody>
</table>

// 新代码
<Table
  dataSource={data}
  columns={[
    { title: '名称', dataIndex: 'name' },
    { title: '操作', render: (_, record) => <Button>编辑</Button> }
  ]}
/>
```

## 最佳实践

1. **一致性** - 整个项目使用相同的 Ant Design 组件和样式
2. **性能** - 按需导入组件，避免全量导入
3. **可访问性** - Ant Design 组件自带良好的可访问性支持
4. **主题** - 使用项目统一的主题配置，避免内联样式
5. **文档** - 参考 [Ant Design 官方文档](https://ant.design/) 获取最新用法

## 注意事项

- Ant Design 组件可能会覆盖一些 Tailwind CSS 样式，需要注意样式优先级
- 某些复杂的自定义样式可能仍需要 Tailwind CSS 或自定义 CSS
- 保持 Ant Design 版本更新，关注破坏性变更
