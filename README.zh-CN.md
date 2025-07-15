# Cyber Ecosystem Admin

![Logo](docs/assets/cyber-system.png)

Cyber Ecosystem Admin 是一个现代化、可扩展的管理后台模板，基于 Next.js、TypeScript 和 Ant Design 构建。它为企业级管理面板、管理系统和内部工具提供了强大的基础。

## 概览

本项目旨在帮助开发者快速构建现代化的管理界面，主要特点包括：

- 🚀 采用 Next.js 15+ 和 TypeScript 的现代技术栈
- 📦 内置 OpenAPI 代码生成支持
- 🎯 使用 MSW 进行开发时的 API 模拟
- 🔐 内置身份认证和权限控制
- 🌓 支持亮色/暗色主题切换
- 📱 响应式设计，适配各种屏幕尺寸

## 功能特性

- ⚡ 基于 [Next.js](https://nextjs.org/) 和 [TypeScript](https://www.typescriptlang.org/)
- 🎨 使用 [Ant Design](https://ant.design/) 作为 UI 框架
- 🌍 内置国际化（i18n）支持
- 🧩 模块化架构，内置主题、状态、数据等多种 Provider
- 🧪 集成 [Vitest](https://vitest.dev/) 和 [Playwright](https://playwright.dev/) 测试
- 🛡️ 支持 API Mock 和 OpenAPI 集成
- 🏗️ 易于定制和扩展

## 快速开始

### 环境要求
- [Node.js](https://nodejs.org/) >= 18.x
- 推荐使用 [pnpm](https://pnpm.io/)

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 代码检查与格式化

```bash
pnpm lint
```

### 运行测试

```bash
pnpm test
```

## 项目结构

```
cyber-ecosystem-admin/
├── src/                    # 主应用源代码
│   ├── app/               # Next.js 应用目录
│   │   ├── [locale]/      # 国际化路由
│   │   └── layout.tsx     # 根布局
│   ├── components/        # 可复用 UI 组件
│   ├── providers/         # 上下文提供者
│   │   ├── antd.provider/ # Ant Design 配置
│   │   ├── themes.provider# 主题管理
│   │   └── ...           # 其他 provider
│   ├── services/         # API 集成
│   │   ├── clients/      # API 客户端
│   │   ├── mocks/        # MSW mock 处理器
│   │   └── models/       # 数据模型
│   ├── store/           # 状态管理
│   └── styles/          # 全局样式
├── openapi/             # OpenAPI 规范文件
├── messages/            # 国际化翻译文件
├── docs/               # 项目文档
├── public/             # 静态资源
└── scripts/            # 工具脚本
```

### 核心目录说明

- `src/app/`: Next.js 13+ 应用目录结构，包含布局和页面
- `src/components/`: 可重用的 UI 组件，注重模块化设计
- `src/providers/`: 各类上下文提供者，用于主题、状态和配置管理
- `src/services/`: API 集成层，包含 OpenAPI 生成的客户端和模拟数据
- `src/store/`: 使用 Jotai 进行原子化状态管理

## 国际化

本项目支持多语言，翻译文件位于 `messages/` 目录。

## 许可证

[MIT](LICENSE)
