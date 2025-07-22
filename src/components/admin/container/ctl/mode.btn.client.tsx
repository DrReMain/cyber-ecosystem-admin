'use client';

import type { MouseEventHandler } from 'react';

import { Moon, Sun } from 'lucide-react';

import Ctl from '@/components/admin/container/ctl/ctl.client';
import useMode from '@/hooks/use-mode';

export default function Mode() {
  const { resolvedTheme, toggle, isReady } = useMode();
  const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isReady) {
      if (resolvedTheme === 'dark')
        toggle(e, 'light');

      if (resolvedTheme === 'light')
        toggle(e, 'dark');
    }
  };
  return (
    isReady && (
      <Ctl onClick={handleToggle}>
        { resolvedTheme === 'dark'
          ? (
              <Sun size={16} />
            )
          : (
              <Moon size={16} />
            )}
      </Ctl>
    )
  );
}
