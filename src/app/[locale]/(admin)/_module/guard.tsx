import type { PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import jtUserHydrate from '@/store/user/hydrate';

interface IProps {
  auth: boolean;
}

export default async function Guard({ children, auth }: Readonly<PropsWithChildren<IProps>>) {
  const login_page = process.env.NEXT_PUBLIC_PAGE_LOGIN;
  const home_page = process.env.NEXT_PUBLIC_PAGE_HOME;

  if (!login_page?.startsWith('/') || !home_page?.startsWith('/')) {
    throw new Error('Please config "NEXT_PUBLIC_PAGE_LOGIN" and "NEXT_PUBLIC_PAGE_HOME" in ".env"');
  }

  const { token } = await jtUserHydrate();
  if (
    auth
    && (!token?.access_token || token?.access_expire < Date.now())
  ) {
    redirect(login_page);
  }

  if (
    !auth
    && (token?.access_token && token?.access_expire > Date.now())
  ) {
    redirect(home_page);
  }

  return children;
}
