'use client';

import { useFullscreen } from 'ahooks';
import { Maximize, Minimize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Ctl from '@/components/admin/container/ctl/ctl.client';

export default function Full() {
  const bodyRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    bodyRef.current = document.body;
    setReady(true); // eslint-disable-line react-hooks-extra/no-direct-set-state-in-use-effect
  }, []);

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(bodyRef);
  return (
    <Ctl onClick={() => ready && toggleFullscreen()}>
      {isFullscreen
        ? <Minimize size={16} />
        : <Maximize size={16} />}
    </Ctl>
  );
}
