import type { PropsWithChildren } from 'react';

import { getLocale } from 'next-intl/server';

import { getCookieAction } from '@/lib/server-actions/cookie.actions';
import AntdProvider from '@/providers/antd.provider';
import JotaiProvider from '@/providers/jotai.provider';
import NUQSProvider from '@/providers/nuqs.provider';
import ReactQueryProvider from '@/providers/query.provider';
import settingFromCookie from '@/store/setting/from-cookie';
import tokenFromCookie from '@/store/token/from-cookie';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  const locale = await getLocale();
  const theme = await getCookieAction('theme');
  const [setting, token] = await Promise.all([
    settingFromCookie(),
    tokenFromCookie(),
  ]);
  return (
    <ReactQueryProvider>
      <NUQSProvider>
        <JotaiProvider initialData={{ setting, token }}>
          <AntdProvider locale={locale} theme={theme.success ? theme.data : undefined}>
            {children}
          </AntdProvider>
        </JotaiProvider>
      </NUQSProvider>
    </ReactQueryProvider>
  );
}

export const dynamic = 'force-dynamic';
