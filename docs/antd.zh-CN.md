# Antd 使用指南

## 概述

本项目使用 Ant Design (antd) 作为 UI 组件库，结合 Next.js 和国际化支持。本文档介绍了项目中 Antd 的配置和使用方法。

## 核心架构

### 1. AntdProvider 结构

```
AntdProvider
├── AntdConfig (配置层)
│   ├── AntdRegistry (Next.js 集成)
│   ├── StyleProvider (CSS-in-JS)
│   ├── ConfigProvider (Antd 配置)
│   └── App (Antd App 组件)
└── HolderRender (静态方法支持)
```

### 2. 主要功能

- **主题切换**: 支持 light/dark 主题自动切换
- **国际化**: 支持多语言 (中文、英文、日文、阿拉伯文)
- **服务端渲染**: 完整的 SSR 支持
- **自定义主题**: 支持自定义主色调
- **防闪烁**: 系统主题判断时的遮罩处理

## 配置详解

### 3. 主题配置

```typescript jsx
// 主题算法选择
const algorithm = useMemo(() => {
  const target = resolvedTheme || theme;
  const result = [];
  switch (target?.toLowerCase()) {
    case 'dark':
      result.push(antdTheme.darkAlgorithm);
      break;
    case 'light':
      result.push(antdTheme.defaultAlgorithm);
      break;
  }
  return result;
}, [theme, resolvedTheme]);

// 主题配置
theme={{
  hashed: false,
  algorithm,
  token: {
    wireframe: true,
    borderRadius: 12,
    ...(color ? { colorPrimary: color, colorLink: color } : {}),
  },
  components: {
    Button: {
      defaultShadow: '',
      primaryShadow: '',
      dangerShadow: '',
      motionDurationFast: '',
      motionDurationMid: '',
      motionDurationSlow: '',
    },
  },
}}
```

### 4. 国际化配置

支持的语言:
- `zh-CN`: 中文简体 (默认)
- `en-US`: 英文
- `ja-JP`: 日文
- `ar-EG`: 阿拉伯文

语言切换会自动更新:
- Antd 组件的语言包
- dayjs 的语言设置

### 5. 全局配置

```typescript jsx
<ConfigProvider
  wave={{ showEffect: showInsetEffect }}
  form={{ requiredMark: 'optional' }}
  input={{ autoComplete: 'off', allowClear: true }}
  locale={antdLocale}
  theme={themeConfig}
>
```

## 使用方法

### 6. 基本使用

```typescript jsx
import { DatePicker } from 'antd';
import { getLocale } from 'next-intl/server';
import AntdProvider from '@/providers/antd.provider';
import { getCookieAction } from '@/server-actions/cookie.actions';

export default async function RootPage() {
  const locale = await getLocale();
  const theme = await getCookieAction('theme');
  
  return (
    <AntdProvider locale={locale} theme={theme.success ? theme.data : undefined}>
      <DatePicker />
    </AntdProvider>
  );
}
```

### 7. 静态方法支持

项目配置了 `holderRender` 以支持 Antd 的静态方法调用 (如 `message.success()`, `notification.open()` 等)。

### 8. 自定义主色调

通过 Jotai 状态管理设置自定义主色调:

```typescript jsx
const { color } = useAtomValue(atom_setting);
```

## 特殊处理

### 9. 防闪烁机制

当主题设置为 `system` 或 `undefined` 时，系统会显示全屏遮罩直到客户端判断出系统主题，防止主题切换时的闪烁。

```typescript jsx
const [needMask, setNeedMask] = useState(theme === undefined || theme === 'system');
useLayoutEffect(() => {
  if (resolvedTheme)
    setNeedMask(false);
}, [resolvedTheme]);
```

### 10. React 19 兼容性

项目引入了 `@ant-design/v5-patch-for-react-19` 以确保与 React 19 的兼容性。

## 注意事项

1. **服务端渲染**: 确保主题相关的状态在服务端和客户端保持一致
2. **语言包加载**: 使用动态导入避免打包体积过大
3. **CSS 层级**: 使用 `StyleProvider` 的 `layer` 属性管理样式优先级
4. **自定义配置**: 可以通过修改 `AntdConfig` 组件来调整全局配置

## 文件结构

```
antd.provider/
├── index.tsx          # 主入口文件
├── config.tsx         # 核心配置组件
├── i18n.hook.ts       # 国际化 Hook
├── holder-render.tsx  # 静态方法支持
└── showInsetEffect.ts # 自定义波纹效果
```

## 扩展

如需添加新的语言支持或自定义配置，可以修改相应的配置文件。所有配置都是模块化的，便于维护和扩展。
