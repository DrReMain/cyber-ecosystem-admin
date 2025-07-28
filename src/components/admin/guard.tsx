import type { PropsWithChildren } from 'react';

import { getLocale } from 'next-intl/server';

import { redirect } from '@/lib/i18n/navigation';
import tokenFromCookie from '@/store/token/from-cookie';

interface IProps {
  auth: boolean;
}

export default async function Guard({ children, auth }: Readonly<PropsWithChildren<IProps>>) {
  const locale = await getLocale();
  const { access_token, access_expire } = await tokenFromCookie();

  if (
    auth
    && (!access_token || !access_expire || access_expire <= Date.now())
  ) {
    redirect({ href: '/login', locale });
  }

  if (
    !auth
    && (access_token && access_expire && access_expire > Date.now())
  ) {
    redirect({ href: '/', locale });
  }

  return children;
}
