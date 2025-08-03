'use client';

import type { ReactNode } from 'react';

import { Button } from 'antd';
import { useAtom } from 'jotai';
import { Menu } from 'lucide-react';

import { atom_setting } from '@/store/setting/store';

interface IProps {
  widgets?: ReactNode;
}

export default function Header({ widgets }: Readonly<IProps>) {
  const [,setSetting] = useAtom(atom_setting);
  return (
    <div className="px-4 gap-4 flex justify-between h-12 border-b border-[#0505050f] dark:border-[#fdfdfd1f]">
      <section className="flex items-center gap-2">
        <Button
          size="small"
          color="default"
          variant="text"
          icon={<Menu size={14} />}
          onClick={() => setSetting((s) => { s.showAside = !s.showAside; })}
        />
      </section>
      <section className="w-0 flex-1" />
      <section className="flex items-center gap-2">
        {widgets}
      </section>
    </div>
  );
}
