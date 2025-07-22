'use client';

import { Maximize, Minimize } from 'lucide-react';

import Ctl from '@/components/admin/container/ctl/ctl.client';
import useFull from '@/hooks/use-full';

export default function Full() {
  const { isFull, toggle } = useFull();
  return (
    <Ctl onClick={() => toggle()}>
      {isFull
        ? <Minimize width={16} height={16} />
        : <Maximize width={16} height={16} />}
    </Ctl>
  );
}
