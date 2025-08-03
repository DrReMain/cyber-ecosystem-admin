'use client';

import '@ant-design/v5-patch-for-react-19';

import type { Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { getLangDir } from 'rtl-detect';

import Loader from '@/components/base/loader';
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

  const [needMask, setNeedMask] = useState(theme === undefined || theme === 'system');
  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    resolvedTheme && setNeedMask(false);
  }, [resolvedTheme]);

  const algorithm = useMemo(() => {
    const target = (resolvedTheme || theme)?.toLowerCase();
    if (target === 'dark')
      return [antdTheme.darkAlgorithm];
    return [antdTheme.defaultAlgorithm];
  }, [theme, resolvedTheme]);

  return (
    <>
      <AntdRegistry layer hashPriority="high">
        <ConfigProvider
          // csp={{ nonce: '' }}
          locale={antdLocale}
          direction={getLangDir(locale)}
          variant="filled"
          theme={{
            hashed: false,
            algorithm,
            token: {
              // Compatible with Tailwind
              screenXSMin: 640,
              screenXS: 640,
              screenXSMax: 767,

              screenSMMin: 768,
              screenSM: 768,
              screenSMMax: 1023,

              screenMDMin: 1024,
              screenMD: 1024,
              screenMDMax: 1279,

              screenLGMin: 1280,
              screenLG: 1280,
              screenLGMax: 1535,

              screenXLMin: 1536,
              screenXL: 1536,
              screenXLMax: 1919,

              screenXXLMin: 1920,
              screenXXL: 1920,

              wireframe: true,
              ...(
                color
                  ? { colorPrimary: color, colorLink: color }
                  : {}
              ),
            },
            components,
          }}
          form={{ requiredMark: 'optional' }}
          input={{ autoComplete: 'off', allowClear: true }}
          wave={{ showEffect: showInsetEffect }}
        >
          <App component={false}>
            {children}
          </App>
        </ConfigProvider>
      </AntdRegistry>

      {/* Must detect system theme on the client */}
      {/* Ant Design light/dark mode requires switching logic inside React components and can’t be set before client render via custom scripts */}
      {/* To prevent Ant Design flash and preserve full HTML from server, use a full-screen overlay until the client determines the system theme, then remove the overlay */}
      <AnimatePresence>
        {needMask && (
          <motion.div
            key="mask"
            className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: 1, duration: 0.2, ease: 'easeOut' },
            }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
