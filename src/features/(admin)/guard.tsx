import type { PropsWithChildren } from 'react';

import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import userFromCookie from '@/store/user/from-cookie';

interface IProps {
  auth: boolean;
}

export default async function Guard({ children, auth }: Readonly<PropsWithChildren<IProps>>) {
  const locale = await getLocale();
  const { token } = await userFromCookie();

  if (
    auth
    && (!token?.access_token || token.access_expire <= Date.now())
  ) {
    redirect({ href: '/login', locale });
  }

  if (
    !auth
    && (token?.access_token && token.access_expire > Date.now())
  ) {
    redirect({ href: '/', locale });
  }

  return children;
}
