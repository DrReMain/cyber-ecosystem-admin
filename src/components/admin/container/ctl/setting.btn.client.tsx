'use client';

import type { PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { Settings } from 'lucide-react';

import Ctl from '@/components/admin/container/ctl/ctl.client';
import { atom_global } from '@/store/global/store';

interface IProps {
}

export default function Setting(_props: Readonly<PropsWithChildren<IProps>>) {
  const [,setGlobal] = useAtom(atom_global);
  return (
    <Ctl onClick={() => setGlobal((g) => { g.openSetting = true; })}>
      <Settings size={16} />
    </Ctl>
  );
}
