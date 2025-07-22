'use client';

import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRef } from 'react';

import type { IRef as IRefSettingDrawer } from '@/components/admin/container/setting/setting.drawer.client';

import Full from '@/components/admin/container/ctl/full.btn.client';
import Lang from '@/components/admin/container/ctl/lang.btn.client';
import Mode from '@/components/admin/container/ctl/mode.btn.client';
import Notice from '@/components/admin/container/ctl/notice.btn.client';
import Setting from '@/components/admin/container/ctl/setting.btn.client';
import SettingDrawer from '@/components/admin/container/setting/setting.drawer.client';
import User from '@/components/admin/container/user.client';
import useRequest from '@/hooks/use-request';
import { accountInfo } from '@/services/clients/accountService/accountInfo';

interface IProps {
}

export default function Container({ children }: Readonly<PropsWithChildren<IProps>>) {
  const ref = useRef<IRefSettingDrawer>(null);
  const { queryHOF } = useRequest();
  const { data, isPending } = useQuery({
    queryKey: [accountInfo.name],
    queryFn: ctx => queryHOF(accountInfo)({ signal: ctx.signal }),
  });

  return (
    <>
      <header className="h-12 flex items-center justify-end gap-1">
        <span>{process.env.NEXT_PUBLIC_APP_URL}</span>
        <Setting onClick={() => ref.current?.open()} />
        <Mode />
        <Lang />
        <Full />
        <Notice />
        <Spin spinning={isPending}>
          <User
            avatar={data?.data.result.avatar}
            name={data?.data.result.name}
            email={data?.data.result.email}
          />
        </Spin>
      </header>

      {children}

      <SettingDrawer ref={ref} />
    </>
  );
}
