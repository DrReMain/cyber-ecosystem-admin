import type { PropsWithChildren } from 'react';

import Guard from '@/components/admin/container/guard.client';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Guard>
      {children}
    </Guard>
  );
}
