'use client';

import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import type { IRef as IRefSettingDrawer } from '@/components/admin/container/setting/setting.drawer.client';

import Full from '@/components/admin/container/ctl/full.btn.client';
import Lang from '@/components/admin/container/ctl/lang.btn.client';
import Mode from '@/components/admin/container/ctl/mode.btn.client';
import Setting from '@/components/admin/container/ctl/setting.btn.client';
import SettingDrawer from '@/components/admin/container/setting/setting.drawer.client';
import useRequest from '@/hooks/use-request';
import { accountInfo } from '@/services/clients/accountService/accountInfo';

interface IProps {
}

export default function Container({ children }: Readonly<PropsWithChildren<IProps>>) {
  const ref = useRef<IRefSettingDrawer>(null);
  const { queryHOF } = useRequest();
  const _queryInfo = useQuery({
    enabled: false,
    queryKey: [accountInfo.name],
    queryFn: ctx => queryHOF(accountInfo)({ signal: ctx.signal }),
  });

  return (
    <>
      <header className="h-12 flex items-center justify-center gap-1">
        <Setting onClick={() => ref.current?.open()} />
        <Mode />
        <Lang />
        <Full />
        <span>{process.env.NEXT_PUBLIC_APP_URL}</span>
      </header>

      {children}

      <SettingDrawer ref={ref} />
    </>
  );
}
