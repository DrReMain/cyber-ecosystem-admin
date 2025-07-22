'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import clsx from 'clsx';
import { useAtomValue } from 'jotai';

import { setting_colorAtom } from '@/store/setting/store';

interface IProps {
  logo: ReactElement;
  setting: ReactElement;
  left: ReactElement;
  right: ReactElement;
}

export default function Container({ logo, setting, left, right }: Readonly<PropsWithChildren<IProps>>) {
  const color = useAtomValue(setting_colorAtom);
  return (
    <main className="h-screen min-h-[720px] flex" style={{ background: color }}>
      <section className={clsx(
        'flex-1 w-0 relative hidden lg:flex items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-20% via-48% to-75%',
        'from-white via-white/90 to-white',
        'dark:from-black dark:via-black/90 dark:to-black',
      )}
      >
        <header className="absolute start-4 top-4 flex items-center gap-2">
          {logo}
        </header>

        {left}
      </section>

      <section className="flex-none w-full lg:w-[35%] bg-white/95 dark:bg-black/95 relative overflow-hidden">
        <header className="absolute start-4 top-4 flex items-center gap-2 scale-[66%] origin-top-left rtl:origin-top-right lg:hidden">
          {logo}
        </header>
        {setting}
        {right}
      </section>
    </main>
  );
}
