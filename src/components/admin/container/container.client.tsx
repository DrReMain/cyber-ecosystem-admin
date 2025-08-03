'use client';
import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';

import type { IRef as IRefSettingDrawer } from '@/components/admin/container/setting/setting.drawer.client';

import Full from '@/components/admin/container/ctl/full.btn.client';
import Lang from '@/components/admin/container/ctl/lang.btn.client';
import Mode from '@/components/admin/container/ctl/mode.btn.client';
import Notice from '@/components/admin/container/ctl/notice.btn.client';
import Setting from '@/components/admin/container/ctl/setting.btn.client';
import DemoMenu from '@/components/admin/container/demo-menu';
import AsideVertical from '@/components/admin/container/layout/aside-vertical.client';
import Horizontal from '@/components/admin/container/layout/horizontal.client';
import MixedTwoVertical from '@/components/admin/container/layout/mixed-two-vertical.client';
import MixedVertical from '@/components/admin/container/layout/mixed-vertical.client';
import TwoVertical from '@/components/admin/container/layout/two-vertical.client';
import Vertical from '@/components/admin/container/layout/vertical.client';
import LockScreen from '@/components/admin/container/lockscreen.client';
import Header from '@/components/admin/container/sections/header.client';
import Logo from '@/components/admin/container/sections/logo.client';
import Nav from '@/components/admin/container/sections/nav.client';
import SettingDrawer from '@/components/admin/container/setting/setting.drawer.client';
import Shortcuts from '@/components/admin/container/shortcuts.client';
import User from '@/components/admin/container/user.client';
import useRequest from '@/lib/hooks/use-request';
import { accountInfo } from '@/services/clients/accountService/accountInfo';
import { atom_setting } from '@/store/setting/store';

interface IProps {
}

export default function Container({ children }: Readonly<PropsWithChildren<IProps>>) {
  const refSettingDrawer = useRef<IRefSettingDrawer>(null);
  const setting = useAtomValue(atom_setting);
  const { queryHOF } = useRequest();
  const { isPending, data } = useQuery({
    queryKey: [accountInfo.name],
    queryFn: ctx => queryHOF(accountInfo)({ signal: ctx.signal }),
  });

  const render = () => {
    if (setting.layout === 'vertical') {
      return (
        <Vertical
          asideTop={<Logo />}
          asideMiddle={<DemoMenu mode="inline" />}
          header={(
            <Header widgets={(
              <>
                <Setting onClick={() => refSettingDrawer.current?.open()} />
                <Mode />
                <Lang />
                <Full />
                <Notice />
                <User
                  isPending={isPending}
                  avatar={data?.data.result.avatar}
                  name={data?.data.result.name}
                  email={data?.data.result.email}
                />
              </>
            )}
            />
          )}
          nav={<Nav />}
        >
          {children}
        </Vertical>
      );
    }
    if (setting.layout === 'two-vertical')
      return <TwoVertical>{children}</TwoVertical>;
    if (setting.layout === 'horizontal')
      return <Horizontal>{children}</Horizontal>;
    if (setting.layout === 'aside-vertical')
      return <AsideVertical>{children}</AsideVertical>;
    if (setting.layout === 'mixed-vertical')
      return <MixedVertical>{children}</MixedVertical>;
    if (setting.layout === 'mixed-two-vertical')
      return <MixedTwoVertical>{children}</MixedTwoVertical>;
    return null;
  };
  return (
    <Shortcuts>
      {render()}
      <SettingDrawer ref={refSettingDrawer} />
      <LockScreen />
    </Shortcuts>
  );
}
