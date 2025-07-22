import type { PropsWithChildren } from 'react';

import Guard from '@/components/admin/guard';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Guard auth={false}>
      {children}
    </Guard>
  );
}
