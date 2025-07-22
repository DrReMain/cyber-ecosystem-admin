# Antd Usage Guide

## Overview

This project uses Ant Design (antd) as the UI component library, integrated with Next.js and internationalization support. This document covers the configuration and usage of Antd in the project.

## Core Architecture

### 1. AntdProvider Structure

```
AntdProvider
├── AntdConfig (Configuration Layer)
│   ├── AntdRegistry (Next.js Integration)
│   ├── StyleProvider (CSS-in-JS)
│   ├── ConfigProvider (Antd Configuration)
│   └── App (Antd App Component)
└── HolderRender (Static Method Support)
```

### 2. Key Features

- **Theme Switching**: Automatic light/dark theme switching
- **Internationalization**: Multi-language support (Chinese, English, Japanese, Arabic)
- **Server-Side Rendering**: Complete SSR support
- **Custom Theming**: Support for custom primary colors
- **Anti-Flicker**: Mask handling during system theme detection

## Configuration Details

### 3. Theme Configuration

```typescript jsx
// Theme algorithm selection
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

// Theme configuration
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

### 4. Internationalization Configuration

Supported languages:
- `zh-CN`: Simplified Chinese (default)
- `en-US`: English
- `ja-JP`: Japanese
- `ar-EG`: Arabic

Language switching automatically updates:
- Antd component locale packages
- dayjs locale settings

### 5. Global Configuration

```typescript jsx
<ConfigProvider
  wave={{ showEffect: showInsetEffect }}
  form={{ requiredMark: 'optional' }}
  input={{ autoComplete: 'off', allowClear: true }}
  locale={antdLocale}
  theme={themeConfig}
>
```

## Usage

### 6. Basic Usage

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

### 7. Static Method Support

The project configures `holderRender` to support Antd's static method calls (such as `message.success()`, `notification.open()`, etc.).

### 8. Custom Primary Color

Set custom primary color through Jotai state management:

```typescript jsx
const { color } = useAtomValue(setting_Atom);
```

## Special Handling

### 9. Anti-Flicker Mechanism

When theme is set to `system` or `undefined`, the system displays a fullscreen mask until the client determines the system theme, preventing flicker during theme switching.

```typescript jsx
const [needMask, setNeedMask] = useState(theme === undefined || theme === 'system');
useLayoutEffect(() => {
  if (resolvedTheme)
    setNeedMask(false);
}, [resolvedTheme]);
```

### 10. React 19 Compatibility

The project includes `@ant-design/v5-patch-for-react-19` to ensure compatibility with React 19.

## Important Notes

1. **Server-Side Rendering**: Ensure theme-related state consistency between server and client
2. **Locale Package Loading**: Use dynamic imports to avoid large bundle sizes
3. **CSS Layering**: Use `StyleProvider`'s `layer` attribute to manage style priority
4. **Custom Configuration**: Modify the `AntdConfig` component to adjust global settings

## File Structure

```
antd.provider/
├── index.tsx          # Main entry file
├── config.tsx         # Core configuration component
├── i18n.hook.ts       # Internationalization Hook
├── holder-render.tsx  # Static method support
└── showInsetEffect.ts # Custom ripple effect
```

## Extension

To add new language support or custom configurations, modify the corresponding configuration files. All configurations are modular for easy maintenance and extension.
