'use client';

import type { PropsWithChildren } from 'react';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    TOGGLE_DEVTOOL_QUERY: () => void;
  }
}

const ReactQueryDevtoolsProduction = dynamic(() => import('@tanstack/react-query-devtools/production').then(mod => mod.ReactQueryDevtools), { ssr: false });

function queryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}

export default function ReactQueryProvider({ children }: Readonly<PropsWithChildren>) {
  const refClient = useRef<QueryClient>(null);
  const get = () => {
    if (isServer)
      return queryClient();
    if (!refClient.current)
      refClient.current = queryClient();
    return refClient.current;
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    window.TOGGLE_DEVTOOL_QUERY = () => setShow(_ => !_);
  }, []);
  return (
    <QueryClientProvider client={get()}>
      <ReactQueryStreamedHydration>
        {children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />
      {show && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
