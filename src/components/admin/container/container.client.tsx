'use client';
import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import DemoMenu from '@/components/admin/container/demo-menu';
import AsideVertical from '@/components/admin/container/layout/aside-vertical.client';
import Horizontal from '@/components/admin/container/layout/horizontal.client';
import MixedTwoVertical from '@/components/admin/container/layout/mixed-two-vertical.client';
import MixedVertical from '@/components/admin/container/layout/mixed-vertical.client';
import TwoVertical from '@/components/admin/container/layout/two-vertical.client';
import Vertical from '@/components/admin/container/layout/vertical.client';
import LockScreen from '@/components/admin/container/lockscreen.client';
import Logo from '@/components/admin/container/sections/logo.client';
import SettingDrawer from '@/components/admin/container/setting/setting.drawer.client';
import Shortcuts from '@/components/admin/container/shortcuts.client';
import Widget from '@/components/admin/container/widget.client';
import useRequest from '@/lib/hooks/use-request';
import { accountInfo } from '@/services/clients/accountService/accountInfo';
import { atom_setting } from '@/store/setting/store';

interface IProps {
}

export default function Container({ children }: Readonly<PropsWithChildren<IProps>>) {
  const setting = useAtomValue(atom_setting);
  const { queryHOF } = useRequest();
  const { isPending, data } = useQuery({
    queryKey: [accountInfo.name],
    queryFn: ctx => queryHOF(accountInfo)({ signal: ctx.signal }),
  });

  // ------------------------------------------------------------------------------------------

  children = (
    <>
      <Widget
        isPending={isPending}
        avatar={data?.data.result.avatar}
        name={data?.data.result.name}
        email={data?.data.result.email}
      />
      {children}
    </>
  );
  const render = () => {
    if (setting.layout === 'vertical') {
      return (
        <Vertical
          asideTop={<Logo />}
          asideMiddle={<DemoMenu mode="inline" />}
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
      <SettingDrawer />
      <LockScreen />
    </Shortcuts>
  );
}
