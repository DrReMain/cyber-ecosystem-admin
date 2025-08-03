import type { PropsWithChildren } from 'react';

import { getLocale } from 'next-intl/server';

import { P } from '@/lib/constant/pages';
import { redirect } from '@/lib/i18n/navigation';
import tokenFromCookie from '@/store/token/from-cookie';

interface IProps {
  needToken: boolean;
}

export default async function TokenGuard({ children, needToken }: Readonly<PropsWithChildren<IProps>>) {
  const locale = await getLocale();
  const { access_token, access_expire } = await tokenFromCookie();

  if (needToken
    && (!access_token || !access_expire || access_expire <= Date.now())
  ) {
    redirect({ href: P.LOGIN.path, locale });
  }

  if (!needToken
    && (access_token && access_expire && access_expire > Date.now())
  ) {
    redirect({ href: P.HOME.path, locale });
  }

  return children;
}
