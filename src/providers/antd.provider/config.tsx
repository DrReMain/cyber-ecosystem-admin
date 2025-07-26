'use client';

import '@ant-design/v5-patch-for-react-19';

import type { Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { getLangDir } from 'rtl-detect';

import Loading from '@/components/base/loading';
import { atom_setting } from '@/store/setting/store';

import { components } from './components.style';
import useI18n from './i18n.hook';
import showInsetEffect from './showInsetEffect';

import('dayjs/locale/zh-cn');
import('dayjs/locale/en');
import('dayjs/locale/ja');
import('dayjs/locale/ar');

export default function AntdConfig({ children, locale, theme }: Readonly<PropsWithChildren<{
  locale: Locale;
  theme?: string;
}>>) {
  const antdLocale = useI18n(locale);
  const { color } = useAtomValue(atom_setting);
  const { resolvedTheme } = useTheme();
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

  const [needMask, setNeedMask] = useState(theme === undefined || theme === 'system');
  useEffect(() => {
    resolvedTheme && setNeedMask(false); // eslint-disable-line react-hooks-extra/no-direct-set-state-in-use-effect
  }, [resolvedTheme]);

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
            direction={getLangDir(locale)}
            theme={{
              hashed: false,
              algorithm,
              token: {
                wireframe: true,
                ...(
                  color
                    ? { colorPrimary: color, colorLink: color }
                    : {}
                ),
              },
              components,
            }}
          >
            <App component={false}>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      </AntdRegistry>

      {/* Must detect system theme on the client */}
      {/* Ant Design light/dark mode requires switching logic inside React components and can’t be set before client render via custom scripts */}
      {/* To prevent Ant Design flash and preserve full HTML from server, use a full-screen overlay until the client determines the system theme, then remove the overlay */}
      <AnimatePresence>
        {needMask && (
          <motion.div
            key="mask"
            className="fixed left-0 top-0 right-0 bottom-0 z-50 bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: 1, duration: 0.2, ease: 'easeOut' },
            }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
