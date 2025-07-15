'use client';

import type { PropsWithChildren } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider } from 'antd';
import { use, useLayoutEffect } from 'react';

export default function HolderRender({ children }: Readonly<PropsWithChildren>) {
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
