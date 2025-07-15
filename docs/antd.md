# ant-design

本项目可选的使用`antd`作为组件库，如需使用，请配置`Provider`。

## antd.provider/index.tsx

```typescript jsx
'use client';

import '@ant-design/v5-patch-for-react-19';

import type { Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import arEG from 'antd/es/locale/ar_EG';
import enUS from 'antd/es/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useMemo, useState } from 'react';

import { demo_colorAtom } from '@/app/[locale]/(internal)/_store/demo/store';

import showInsetEffect from './showInsetEffect';

import('dayjs/locale/zh-cn');
import('dayjs/locale/en');
import('dayjs/locale/ja');
import('dayjs/locale/ar');

export default function AntdProvider({ children, locale, theme }: Readonly<PropsWithChildren<{
  locale: Locale;
  theme?: string;
}>>) {
  const antdLocale = useMemo(() => {
    switch (locale) {
      case 'en-US':
        dayjs.locale('en');
        return enUS;
      case 'ja-JP':
        dayjs.locale('ja');
        return jaJP;
      case 'ar-EG':
        dayjs.locale('ar');
        return arEG;
      case 'zh-CN':
      default:
        dayjs.locale('zh-cn');
        return zhCN;
    }
  }, [locale]);

  const { resolvedTheme } = useTheme();
  const algorithm = useMemo(() => {
    const target = resolvedTheme || theme;
    const result = [];
    switch (target) {
      case 'dark':
        result.push(antdTheme.darkAlgorithm);
        break;
      case 'light':
        result.push(antdTheme.defaultAlgorithm);
        break;
    }
    return result;
  }, [theme, resolvedTheme]);

  const [needMask, setNeedMask] = useState(theme === undefined || theme === 'system');
  useLayoutEffect(() => {
    if (resolvedTheme)
      setNeedMask(false);
  }, [resolvedTheme]);

  const color = useAtomValue(demo_colorAtom);

  return (
    <>
      <AntdRegistry>
        <StyleProvider layer>
          <ConfigProvider
            // csp={{ nonce: '' }}
            wave={{ showEffect: showInsetEffect }}
            form={{ requiredMark: 'optional' }}
            input={{ autoComplete: 'off', allowClear: true }}
            locale={antdLocale}
            theme={{
              hashed: false,
              algorithm,
              token: {
                wireframe: true,
                borderRadius: 12,
                ...(
                  color
                    ? { colorPrimary: color, colorLink: color }
                    : {}
                ),
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
          >
            <App component={false}>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      </AntdRegistry>
      {/* 随系统主题必须在客户端判断 */}
      {/* antd的light和dark需要在react组件内切换算法，无法在客户端渲染前通过自定义脚本设置 */}
      {/* 这种情况通过全屏遮罩挡住antd，直到客户端判断出系统主题后，去除遮罩来防止antd闪烁，并且保持服务端输出完整html */}
      {needMask ? <div className="fixed left-0 top-0 right-0 bottom-0 z-50 bg-slate-700" /> : null}
    </>
  );
}
```

## antd.provider/antd-holder-render.tsx

```typescript jsx
'use client';

import type { PropsWithChildren } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider } from 'antd';
import { use, useLayoutEffect } from 'react';

export default function AntdHolderRender({ children }: Readonly<PropsWithChildren>) {
  const { locale, theme } = use(ConfigProvider.ConfigContext);
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: children => (
        <StyleProvider layer>
          <ConfigProvider prefixCls="static" iconPrefixCls="icon" locale={locale} theme={theme}>
            <App>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      ),
    });
  }, [locale, theme]);
  return children;
}

```

## antd.provider/showInsetEffect.ts

```typescript
import type { ConfigProviderProps, GetProp } from 'antd';

type WaveConfig = GetProp<ConfigProviderProps, 'wave'>;

function createHolder(node: HTMLElement) {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.appendChild(div);

  return div;
}

function createDot(holder: HTMLElement, color: string, left: number, top: number, size = 0) {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate(-50%, -50%)';
  dot.style.transition = 'all 1s ease-out';
  holder.appendChild(dot);

  return dot;
}

const showInsetEffect: WaveConfig['showEffect'] = (
  node,
  { event, component },
) => {
  if (component !== 'Button') {
    return;
  }

  const holder = createHolder(node);

  const rect = holder.getBoundingClientRect();

  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

  // Motion
  requestAnimationFrame(() => {
    dot.ontransitionend = () => {
      holder.remove();
    };

    dot.style.width = '200px';
    dot.style.height = '200px';
    dot.style.opacity = '0';
  });
};

export default showInsetEffect;
```
