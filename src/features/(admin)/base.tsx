import type { PropsWithChildren } from 'react';

import { getLocale } from 'next-intl/server';

import AntdProvider from '@/providers/antd.provider';
import JotaiProvider from '@/providers/jotai.provider';
import NUQSProvider from '@/providers/nuqs.provider';
import ReactQueryProvider from '@/providers/query.provider';
import { getCookieAction } from '@/server-actions/cookie.actions';
import settingFromCookie from '@/store/setting/from-cookie';
import userFromCookie from '@/store/user/from-cookie';

interface IProps {
}

export default async function Base({ children }: Readonly<PropsWithChildren<IProps>>) {
  const locale = await getLocale();
  const theme = await getCookieAction('theme');
  const [setting, user] = await Promise.all([
    settingFromCookie(),
    userFromCookie(),
  ]);
  return (
    <ReactQueryProvider>
      <NUQSProvider>
        <JotaiProvider initialData={{ setting, user }}>
          <AntdProvider locale={locale} theme={theme.success ? theme.data : undefined}>
            {children}
          </AntdProvider>
        </JotaiProvider>
      </NUQSProvider>
    </ReactQueryProvider>
  );
}
