import type { PropsWithChildren } from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function NUQSProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  );
}
