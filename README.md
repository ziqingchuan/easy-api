# Easy API - 简洁高效的API测试工具

<div align="center">

![Easy API Logo](https://img.shields.io/badge/Easy%20API-v1.0.0-blue?style=for-the-badge&logo=api)

一个现代化的API测试工具，专注于提供简洁、高效、可靠的接口测试体验。

[在线体验](https://easyapi.top) | [功能特性](#功能特性) | [快速开始](#快速开始) | [使用指南](#使用指南)

</div>

## 🚀 功能特性

### 核心功能
- ✅ **多种HTTP方法** - 支持GET、POST、PUT、DELETE、PATCH
- ✅ **可视化JSON编辑器** - 语法高亮、格式化、错误检测
- ✅ **智能响应处理** - 自动识别JSON、XML、HTML等格式
- ✅ **灵活请求头管理** - 动态添加、删除请求头
- ✅ **实时响应分析** - 状态码、响应时间、内容类型展示

### 优化特性
- 🔒 **安全可靠** - URL验证、数据大小限制、错误边界处理
- ⚡ **性能优化** - 30秒超时控制、智能错误重试
- 🎯 **用户体验** - 键盘快捷键、自动格式化、一键清空
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🤖 **AI助手** - 内置智能助手，提供API使用建议

## 🛠️ 技术栈

- **前端**: Vue 3 + TypeScript + Composition API
- **构建**: Vite + 热重载
- **编辑器**: JSONEditor (语法高亮 + 树形视图)
- **样式**: 原生CSS + 响应式布局
- **部署**: Vercel + 静态托管

## 📦 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 本地运行
```bash
# 克隆项目
git clone https://github.com/your-username/easy-api.git
cd easy-api

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📖 使用指南

### 基础操作

#### 1. 发送GET请求
1. 选择 `GET` 方法
2. 输入API地址：`https://jsonplaceholder.typicode.com/users`
3. 点击"发送请求"
4. 查看响应结果

#### 2. 发送POST请求
1. 选择 `POST` 方法
2. 输入API地址
3. 点击"请求体"展开JSON编辑器
4. 输入JSON数据：
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com"
   }
   ```
5. 发送请求

#### 3. 配置请求头
1. 点击"请求头"展开
2. 添加认证头：
   - Key: `Authorization`
   - Value: `Bearer your-token-here`
3. 添加内容类型：
   - Key: `Content-Type`
   - Value: `application/json`

### 快捷键操作
- `Ctrl/Cmd + Enter` - 发送请求
- `Ctrl/Cmd + K` - 清空响应
- `Ctrl/Cmd + Shift + F` - 格式化JSON

### 错误处理
工具会自动处理以下情况：
- **网络超时** - 30秒超时保护
- **URL格式错误** - 自动验证URL格式
- **JSON语法错误** - 实时语法检查
- **CORS跨域** - 提供代理解决方案
- **大文件限制** - 10MB请求体限制

## 🔧 高级配置

### 代理设置
解决跨域问题，在 `vite.config.ts` 中配置：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://your-api-server.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 环境变量
创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
VITE_DEFAULT_TIMEOUT=30000
```

## 🚨 最佳实践

### 安全建议
- ✅ 使用HTTPS协议的API
- ✅ 避免在URL中包含敏感信息
- ✅ 定期清理浏览器存储数据
- ❌ 不要测试生产环境的破坏性操作

### 性能建议
- ✅ 合理设置请求超时时间
- ✅ 避免发送过大的请求体
- ✅ 使用适当的请求方法
- ✅ 检查响应数据大小

### 测试建议
- ✅ 先测试简单的GET请求
- ✅ 逐步增加请求复杂度
- ✅ 验证响应状态码和数据格式
- ✅ 测试错误场景和边界情况

## 🐛 常见问题

### Q: 请求超时怎么办？
A: 检查网络连接，确认API服务可用，或增加超时时间。

### Q: CORS跨域错误？
A: 使用代理功能或联系API提供方添加CORS支持。

### Q: JSON格式错误？
A: 使用内置的JSON编辑器，它会自动检测语法错误。

### Q: 响应数据显示异常？
A: 检查Content-Type头，确保服务器返回正确的内容类型。

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发规范
- 使用TypeScript编写代码
- 遵循Vue 3 Composition API规范
- 保持代码简洁和注释完整
- 测试新功能的兼容性

### 提交流程
1. Fork项目到你的GitHub
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交代码：`git commit -m 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目：
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [JSONEditor](https://github.com/josdejong/jsoneditor) - 强大的JSON编辑器

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ 支持一下！**

Made with ❤️ by Easy API Team

</div>