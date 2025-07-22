'use client';

import { Maximize, Minimize } from 'lucide-react';

import Ctl from '@/components/admin/container/ctl/ctl.client';
import useFull from '@/hooks/use-full';

export default function Full() {
  const { isFull, toggle } = useFull();
  return (
    <Ctl onClick={() => toggle()}>
      {isFull
        ? <Minimize size={16} />
        : <Maximize size={16} />}
    </Ctl>
  );
}
