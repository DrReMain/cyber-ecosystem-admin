'use client';

import type { DevToolsProps } from 'jotai-devtools';
import type { ComponentType, PropsWithChildren } from 'react';

import { Provider } from 'jotai';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

import { createMainStore } from '@/store/createStore';

declare global {
  interface Window {
    TOGGLE_DEVTOOL_JOTAI: () => void;
  }
}

const DevTools: ComponentType<DevToolsProps> | null
    = process.env.NODE_ENV === 'development'
      ? dynamic(() => import('@/store/devtool').then(mod => ({ default: mod.DevTools })), { ssr: false })
      : null;

export default function JotaiProvider({ children, initialData }: Readonly<PropsWithChildren<{
  initialData?: Parameters<typeof createMainStore>[0];
}>>) {
  const { store } = useMemo(() => createMainStore(initialData), [initialData]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.TOGGLE_DEVTOOL_JOTAI = () => setShow(_ => !_);
  }, []);
  return (
    <Provider store={store}>
      {children}
      {show && DevTools && (
        <React.Suspense fallback={null}>
          <DevTools
            store={store}
            // nonce={}
            theme="dark"
            position="bottom-right"
            options={{
              shouldShowPrivateAtoms: false,
              shouldExpandJsonTreeViewInitially: true,
              timeTravelPlaybackInterval: 750,
              snapshotHistoryLimit: Infinity,
            }}
          />
        </React.Suspense>
      )}
    </Provider>
  );
}
