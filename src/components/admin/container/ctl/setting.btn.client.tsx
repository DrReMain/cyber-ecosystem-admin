'use client';

import type { MouseEventHandler, PropsWithChildren } from 'react';

import { Settings } from 'lucide-react';

import Ctl from '@/components/admin/container/ctl/ctl.client';

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Setting({ onClick }: Readonly<PropsWithChildren<IProps>>) {
  return (
    <Ctl onClick={onClick}>
      <Settings size={16} />
    </Ctl>
  );
}
