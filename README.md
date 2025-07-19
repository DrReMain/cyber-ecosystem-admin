# Cyber Ecosystem Admin

![Logo](docs/assets/cyber-system.png)

Cyber Ecosystem Admin is a modern, extensible admin dashboard template built with Next.js, TypeScript, and Ant Design. It provides a robust foundation for building enterprise-level admin panels, management systems, and internal tools.

## Cyber Ecosystem Stack

1. [ ] [CyberEcosystem Server](https://github.com/DrReMain/cyber-ecosystem-server) ------- Backend services (Microservices based on go-zero + tonic)
2. [ ] [CyberEcosystem Admin](https://github.com/DrReMain/cyber-ecosystem-admin) -------- Admin dashboard (Web app built with Next.js)

[//]: # (3. [ ] [CyberEcosystem Android]&#40;https://github.com/DrReMain/cyber-ecosystem-android&#41; -- --- Large-scale Android app &#40;Primary: Kotlin + Jetpack Compose, Secondary: Flutter&#41;)

[//]: # (4. [ ] [CyberEcosystem iOS]&#40;https://github.com/DrReMain/cyber-ecosystem-iOS&#41; --------- - Large-scale iOS app &#40;Primary: Swift + UIKit or SwiftUI, Secondary: Flutter&#41;)

[//]: # (5. [ ] [CyberEcosystem RN]&#40;https://github.com/DrReMain/cyber-ecosystem-rn&#41; ----------- Small to medium-sized app &#40;Primary: React Native, Secondary: Native modules&#41;)

[//]: # (6. [ ] [CyberEcosystem Mini]&#40;https://github.com/DrReMain/cyber-ecosystem-mini&#41; ---------- Mini programs &#40;WeChat, Alipay, etc.&#41;)

[//]: # (7. [ ] [CyberEcosystem SaaS]&#40;https://github.com/DrReMain/cyber-ecosystem-saas&#41; -------- Multi-tenant SaaS web application)

[//]: # (8. [ ] [CyberEcosystem Tauri]&#40;https://github.com/DrReMain/cyber-ecosystem-tauri&#41; ---------- Cross-platform desktop app &#40;based on Tauri&#41;)

[//]: # (9. [ ] [CyberEcosystem UAV]&#40;https://github.com/DrReMain/cyber-ecosystem-uav&#41; ---------- Embedded systems & IoT for drones)

[//]: # ()

## Preview

|       | light                                  | dark                                  |
|-------|----------------------------------------|---------------------------------------|
| zh-CN | ![](docs/assets/login-zh-CN_light.png) | ![](docs/assets/login-zh-CN_dark.png) |
| ar-EG | ![](docs/assets/login-ar-EG_light.png) | ![](docs/assets/login-ar-EG_dark.png) |

## Overview

This project is designed to help developers quickly build modern admin interfaces with the following highlights:

- 🚀 Modern tech stack with Next.js 15+ and TypeScript
- 📦 Out-of-the-box support for OpenAPI code generation
- 🎯 MSW for API mocking during development
- 🔐 Built-in authentication and authorization
- 🌓 Light/Dark theme support
- 📱 Responsive design for various screen sizes

## Features

- ⚡ Built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- 🎨 UI powered by [Ant Design](https://ant.design/)
- 🌍 Internationalization (i18n) support
- 🧩 Modular architecture with providers for themes, state, and data fetching
- 🧪 Integrated testing with [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/)
- 🛡️ API mocking and OpenAPI integration
- 🏗️ Easy customization and extension

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint & Format

```bash
pnpm lint
```

### Test

```bash
pnpm test
```

## Project Structure

```
cyber-ecosystem-admin/
├── src/                    # Main application source code
│   ├── app/               # Next.js app directory
│   │   ├── [locale]/      # Internationalized routes
│   │   └── layout.tsx     # Root layout
│   ├── components/        # Reusable UI components
│   ├── providers/         # Context providers
│   │   ├── antd.provider/ # Ant Design configuration
│   │   ├── themes.provider# Theme management
│   │   └── ...           # Other providers
│   ├── services/         # API integration
│   │   ├── clients/      # API clients
│   │   ├── mocks/        # MSW mock handlers
│   │   └── models/       # Data models
│   ├── store/           # State management
│   └── styles/          # Global styles
├── openapi/             # OpenAPI specifications
├── messages/            # i18n translation files
├── docs/               # Documentation
├── public/             # Static assets
└── scripts/            # Utility scripts
```

### Key Directories

- `src/app/`: Next.js 13+ app directory structure with layouts and pages
- `src/components/`: Reusable UI components with a focus on modularity
- `src/providers/`: Various context providers for theming, state, and configuration
- `src/services/`: API integration layer with OpenAPI-generated clients and mocks
- `src/store/`: State management using Jotai for atomic state

## Internationalization

This project supports multiple languages. Translation files are located in the `messages/` directory.

## License

[MIT](LICENSE)
